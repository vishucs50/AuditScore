function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function whaleScoreFromPercent(percent: number) {
  // Stretch domain artificially
  const stretched = percent * 1.6; // key fix
  const x = Math.max(0, Math.min(100, stretched));

  const x0 = 40; // move center
  const k = 0.12;

  return Math.round(sigmoid(k * (x - x0)) * 100);
}
/**
 * TEMP PROXY until holder API is added
 * Uses TVL size to estimate decentralization
 */
function estimateWhalePercentFromTVL(tvl?: number) {
  if (!tvl) return 30;

  if (tvl > 1_000_000_000) return 15;
  if (tvl > 300_000_000) return 22;
  if (tvl > 100_000_000) return 30;
  if (tvl > 30_000_000) return 38;
  return 50;
}

export function calculateWhaleConcentrationRisk(
  protocol: any,
  whalePercent?: number // REAL DATA (future)
) {
  const estimatedPercent =
    whalePercent ?? estimateWhalePercentFromTVL(protocol.tvl);

  const score = whaleScoreFromPercent(estimatedPercent);

  let level: "low" | "medium" | "high" = "medium";
  if (score >= 70) level = "high";
  else if (score <= 30) level = "low";

  return {
    score,
    level,
    summary:
      whalePercent != null
        ? "Whale concentration derived from on-chain holder distribution."
        : "Whale concentration estimated using protocol TVL proxy.",
    factors: [
      `Top holders control ~${estimatedPercent.toFixed(1)}% of supply`,
      whalePercent == null ? "Estimated (no holder API)" : "On-chain data",
    ],
  };
}
