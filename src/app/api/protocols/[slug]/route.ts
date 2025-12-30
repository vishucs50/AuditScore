import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";

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

  const result = {
    name: protocol.name,
    slug: protocol.slug,
    category: protocol.category,
    chains: protocol.chains,
    audits:protocol.audits,
    tvl: protocol.tvl, // real value if exists
    apy: metrics?.apyRange ?? "—",
    icon: protocol.icon,
    description:protocol.description,
    tvlStability: metrics?.tvlStability ?? null,
    auditRisk: metrics?.auditRisk ?? null,
    finalRiskScore: metrics?.finalRiskScore ?? null,
    risk: riskLabel(metrics?.finalRiskScore),
    color: riskColor(metrics?.finalRiskScore),
  };

  return Response.json(result);
}
