import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";
import { calculateProtocolRisk } from "@/lib/risk/calculateFinalRiskScore";

function riskLabel(score: number) {
  if (score >= 80) return "Low Risk";
  if (score >= 60) return "Moderate Risk";
  return "High Risk";
}

function riskColor(score: number) {
  if (score >= 80) return "#0bda5e";
  if (score >= 60) return "#facc15";
  return "#ef4444";
}



export async function GET() {
  await dbConnect();

  const protocols = await ProtocolModel.find().lean();
  const metrics = await MetricsCurrent.find().lean();

  const metricsMap = new Map(metrics.map((m) => [m.protocolSlug, m]));

  const result = protocols.map((p) => {
    const m = metricsMap.get(p.slug);

    if (!m) {
      return {
        name: p.name,
        slug: p.slug,
        category: p.category,
        chains: p.chains,
        audits: p.audits,
        tvl: p.tvl,
        tvlStability: null,
        finalRiskScore: null,
        risk: "Unknown",
        color: "#64748b",
        icon: p.icon,
      };
    }


    const finalRiskScore = calculateProtocolRisk({
      auditRisk: m.auditRisk?.score ?? 0,
      liquidityRisk: m.liquidityRisk?.score ?? 0,
      whaleRisk: m.whaleConcentration?.score ?? 0,
      composabilityRisk: m.dependencyRisk?.score ?? 0,
      maturityScore: m.protocolMaturity?.score ?? 0,
      tvlStabilityScore: m.tvlStability?.score ?? 0,
    });


    return {
      name: p.name,
      slug: p.slug,
      category: p.category,
      chains: p.chains,
      audits: p.audits,
      tvl: p.tvl,

      tvlStability: m.tvlStability ?? null,
      liquidityRisk: m?.liquidityRisk ?? null,
      protocolMaturity: m?.protocolMaturity ?? null,
      dependencyRisk: m.dependencyRisk,
      whaleConcentration: m.whaleConcentration,
      auditRisk: m?.auditRisk ?? null,
      finalRiskScore,
      risk: riskLabel(finalRiskScore.score),
      color: riskColor(finalRiskScore.score),

      icon: p.icon,
    };
  });

  return Response.json(result);
}