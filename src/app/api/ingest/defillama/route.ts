import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";
import TVLSnapshot from "@/lib/models/TVLSnapshot";
import { calculateAuditRiskWithExplanation } from "@/lib/risk/auditRisk";
import buildTVLStabilityRisk from "@/lib/risk/tvlStability";
import { groupByChain,calculateWeightedApy } from "@/lib/utils/chainLogic";
import ChainMetrics from "@/lib/models/ChainMetrics";
import { calculateLiquidityRiskFromTVLHistory } from "@/lib/risk/LiquidityRisk";
import { calculateProtocolMaturity } from "@/lib/risk/protocolMaturity";
export async function GET(req: Request) {
  // const auth = req.headers.get("authorization");

  // if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return new Response("Unauthorized", { status: 401 });
  // }
  await dbConnect();

  const res = await fetch("https://api.llama.fi/protocols");  
  const protocols = await res.json();
  const yieldRes = await fetch("https://yields.llama.fi/pools");
  const yieldJson = await yieldRes.json();
  const pools = yieldJson.data;

  const now = new Date();

  for (const p of protocols.slice(0, 100)) {
    
    const protocolPools = pools.filter((pool:any) => pool.project === p.slug);
    const poolsByChain = groupByChain(protocolPools);
    for (const [chainKey, chainPools] of Object.entries(poolsByChain)) {
      const apyData = calculateWeightedApy(chainPools);

      await ChainMetrics.updateOne(
        { protocolSlug: p.slug, chain: chainKey },
        {
          protocolSlug: p.slug,
          chain: chainKey,
          avgApy: apyData?.avgApy,
          rewardApy: apyData?.rewardApy,
          tvl: apyData?.tvl,
          updatedAt: new Date(),
        },
        { upsert: true }
      );
    }


    await ProtocolModel.updateOne(
      { slug: p.slug },
      {
        name: p.name,
        slug: p.slug,
        category: p.category,
        icon: p.logo,
        chains: p.chains,
        description: p.description,
        audits: p.audits,
        tvl: p.tvl,
        latestTVLUpdatedAt: now,
        audit_links:p.audit_links,
      },
      { upsert: true }
    );

    // 2️ Store hourly TVL snapshot
    if (typeof p.tvl === "number" && p.tvl > 0) {
      await TVLSnapshot.create({
        protocolSlug: p.slug,
        tvl: p.tvl,
        timestamp: now,
      });
    }

    // 3️ Fetch last 7 days TVL history
    const tvlHistory = await TVLSnapshot.find({
      protocolSlug: p.slug,
      timestamp: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    }).sort({ timestamp: 1 });

    // 4️ Build TVL stability from HISTORY

    const tvlStability =
      tvlHistory.length >= 2
        ? buildTVLStabilityRisk(tvlHistory)
        : {
            score: 50,
            level: "unknown",
            summary: "Insufficient historical TVL data.",
            factors: ["Not enough data points"],
          };
    const liquidityRisk = calculateLiquidityRiskFromTVLHistory(tvlHistory);
    const protocolMaturity = calculateProtocolMaturity(p, tvlHistory);
    // 5️ Update current metrics
    await MetricsCurrent.updateOne(
      { protocolSlug: p.slug },
      {
        
        auditRisk: calculateAuditRiskWithExplanation(p),
        tvlStability,
        liquidityRisk,
        protocolMaturity,
        updatedAt: now,
      },
      { upsert: true }
    );
  }

  return Response.json({ success: true });
}
