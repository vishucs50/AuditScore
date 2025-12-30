import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";


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
    const protocols=await ProtocolModel.find().lean();
    const metrics=await MetricsCurrent.find().lean();
      const metricsMap = new Map(metrics.map((m) => [m.protocolSlug, m]));

      const result = protocols.map((p) => ({
        name: p.name,
        slug: p.slug,
        category: p.category,
        chains: p.chains,
        audits:p.audits,
        tvl: p.tvl,
        tvlStability: metricsMap.get(p.slug)?.tvlStability ?? null, 
        finalRiskScore: metricsMap.get(p.slug)?.finalRiskScore ?? null, 
        risk: riskLabel(metricsMap.get(p.slug)?.finalRiskScore ?? null),
        color: riskColor(metricsMap.get(p.slug)?.finalRiskScore ?? null),
        icon: p.icon,

      }));

      return Response.json(result);
}