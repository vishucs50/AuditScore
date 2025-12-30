import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";
function formatTVL(tvl: number){
  if (!tvl) return "—";
  if (tvl >= 1e9) return `$${(tvl / 1e9).toFixed(1)}B`;
  if (tvl >= 1e6) return `$${(tvl / 1e6).toFixed(1)}M`;
  return `$${tvl.toLocaleString()}`;
}

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

function iconByCategory(category: string) {
  return (
    {
      Lending: "savings",
      DEX: "swap_horiz",
      Yield: "trending_up",
    }[category] || "account_balance"
  );
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
        tvl: "$20B", //dummy
        apy: "4.1% - 22%", //dummy
        tvlStability: metricsMap.get(p.slug)?.tvlStability ?? null, //dummy
        finalRiskScore: metricsMap.get(p.slug)?.finalRiskScore ?? null, //dummy
        risk: riskLabel(metricsMap.get(p.slug)?.finalRiskScore ?? null),
        color: riskColor(metricsMap.get(p.slug)?.finalRiskScore ?? null),
        icon: iconByCategory(p.category),

      }));

      return Response.json(result);
}