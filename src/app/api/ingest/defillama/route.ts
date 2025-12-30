import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";
import TVLSnapshot from "@/lib/models/TVLSnapshot";
import { calculateAuditRiskWithExplanation } from "@/lib/risk/auditRisk";
import buildTVLStabilityRisk from "@/lib/risk/tvlStability";

export async function GET() {
  await dbConnect();

  const res = await fetch("https://api.llama.fi/protocols");
  const protocols = await res.json();

  const now = new Date();

  for (const p of protocols.slice(0, 100)) {
    // 1️ Upsert protocol metadata
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

    // 5️ Update current metrics
    await MetricsCurrent.updateOne(
      { protocolSlug: p.slug },
      {
        auditRisk: calculateAuditRiskWithExplanation(p),
        tvlStability,
        updatedAt: now,
      },
      { upsert: true }
    );
  }

  return Response.json({ success: true });
}
