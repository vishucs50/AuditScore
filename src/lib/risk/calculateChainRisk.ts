import MetricsCurrent from "@/lib/models/MetricsCurrent";
import ChainMetrics from "@/lib/models/ChainMetrics";

export async function calculateChainRisk(chain: string) {
  const chainMetrics = await ChainMetrics.find({ chain }).lean();

  let weightedRisk = 0;
  let totalTVL = 0;
  let protocolCount = 0;

  for (const cm of chainMetrics) {
    if (!cm.tvl || cm.tvl <= 0) continue;

    const metrics = await MetricsCurrent.findOne({
      protocolSlug: cm.protocolSlug,
    }).lean();

    if (!metrics?.finalRiskScore?.score) continue;

    weightedRisk += metrics.finalRiskScore.score * cm.tvl;
    totalTVL += cm.tvl;
    protocolCount++;
  }

  if (totalTVL === 0) return null;

  return {
    chain,
    riskScore: Math.round(weightedRisk / totalTVL),
    totalTVL,
    protocolCount,
  };
}
