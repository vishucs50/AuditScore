import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";
import ChainMetrics from "@/lib/models/ChainMetrics";
import { calculateProtocolRisk } from "@/lib/risk/calculateFinalRiskScore";
function riskLabel(score?: number) {
  if (!score) return "Unknown";
  if (score >= 80) return "Low Risk";
  if (score >= 60) return "Moderate Risk";
  return "High Risk";
}

function riskColor(score?: number) {
  if (!score) return "#64748b";
  if (score >= 80) return "#0bda5e";
  if (score >= 60) return "#facc15";
  return "#ef4444";
}


export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  await dbConnect();

  const protocol = await ProtocolModel.findOne({ slug }).lean();
  if (!protocol) {
    return Response.json({ error: "Protocol not found" }, { status: 404 });
  }

  const metrics = await MetricsCurrent.findOne({
    protocolSlug: slug,
  }).lean();
  const finalRiskScore = metrics
    ? calculateProtocolRisk({
        auditRisk: metrics.auditRisk?.score ?? 0,
        liquidityRisk: metrics.liquidityRisk?.score ?? 0,
        whaleRisk: metrics.whaleConcentration?.score ?? 0,
        composabilityRisk: metrics.dependencyRisk?.score ?? 0,
        maturityScore: metrics.protocolMaturity?.score ?? 0,
        tvlStabilityScore: metrics.tvlStability?.score ?? 0,
      })
    : null;

  const {searchParams}=new URL(req.url);
  let chain=searchParams.get("chain");
  if (!chain && protocol.chains?.length) {
    chain = protocol.chains[0];
  }
  const modchain=chain?.trim().toLowerCase();
  let chainMetrics = null;
  if (modchain) {
    chainMetrics = await ChainMetrics.findOne({
      protocolSlug: slug,
      chain:modchain,
    }).lean();
  }
    const result = {
      name: protocol.name,
      slug: protocol.slug,
      category: protocol.category,
      chains: protocol.chains,
      audits: protocol.audits,
      icon: protocol.icon,
      description: protocol.description,

      selectedChain: chain,
      tvl: chainMetrics?.tvl ?? protocol.tvl,
      avgApy: chainMetrics?.avgApy ?? null,
      rewardApy: chainMetrics?.rewardApy ?? null,

      tvlStability: metrics?.tvlStability ?? null,
      liquidityRisk: metrics?.liquidityRisk ?? null,
      protocolMaturity: metrics?.protocolMaturity ?? null,
      dependencyRisk: metrics.dependencyRisk,
      whaleConcentration: metrics.whaleConcentration,
      auditRisk: metrics?.auditRisk ?? null,
      finalRiskScore: finalRiskScore ?? null,
      risk: riskLabel(finalRiskScore?.score),
      color: riskColor(finalRiskScore?.score),
    };

  return Response.json(result);
}
