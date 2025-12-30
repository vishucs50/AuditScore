import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";
import { calculateAuditRiskWithExplanation } from "@/lib/risk/auditRisk";
import buildTVLStabilityRisk from "@/lib/risk/tvlStability";
export async function GET() {
  await dbConnect();

  const res = await fetch("https://api.llama.fi/protocols");
  const protocols = await res.json();
  for (const p of protocols.slice(0, 100)) {
    await ProtocolModel.updateOne(
      { slug: p.slug },
      {
        name: p.name,
        slug: p.slug,
        category: p.category,
        icon:p.logo,
        chains: p.chains,
        description:p.description,
        audits:p.audits,
        tvl:p.tvl,
      },
      { upsert: true }
    );

    await MetricsCurrent.updateOne(
      { protocolSlug: p.slug },
      {
        auditRisk:calculateAuditRiskWithExplanation(p),
        tvlStability:buildTVLStabilityRisk(p.tvl),
        finalRiskScore: Math.floor(Math.random() * 40) + 60, 
        updatedAt: new Date(),
      },
      { upsert: true }
    );
  }

  return Response.json({ success: true });
}
