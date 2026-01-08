function ageScore(createdAt?: number) {
  if (!createdAt) return 10; // unknown age = neutral-low

  const ageMonths =
    (Date.now() - createdAt * 1000) / (1000 * 60 * 60 * 24 * 30);

  if (ageMonths >= 36) return 30;
  if (ageMonths >= 12) return 15 + (ageMonths - 12) * (15 / 24);
  return Math.max(5, ageMonths * 1.2);
}
function tvlMaturityScore(tvlHistory: { tvl: number }[]) {
  if (tvlHistory.length < 7) return 15;

  const tvls = tvlHistory.map((t) => t.tvl);
  const mean = tvls.reduce((a, b) => a + b, 0) / tvls.length;

  const variance =
    tvls.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / tvls.length;

  const volatility = Math.sqrt(variance) / mean;

  if (volatility < 0.1) return 40;
  if (volatility < 0.25) return 30;
  if (volatility < 0.5) return 20;
  return 10;
}
function auditMaturityScore(p: any) {
  if (p.audits >= 2) return 20;
  if (p.audits === 1) return 12;
  if (p.audit_links?.length > 0) return 8;
  return 4;
}
function ecosystemScore(chains: string[]) {
  if (!chains) return 0;
  if (chains.length >= 5) return 10;
  if (chains.length >= 3) return 7;
  if (chains.length >= 2) return 5;
  return 2;
}
export function calculateProtocolMaturity(
  protocol: any,
  tvlHistory: { tvl: number }[]
) {
  const age = ageScore(protocol.createdAt);
  const tvl = tvlMaturityScore(tvlHistory);
  const audit = auditMaturityScore(protocol);
  const ecosystem = ecosystemScore(protocol.chains);

  const score = Math.round(age + tvl + audit + ecosystem);

  let level: "low" | "medium" | "high" = "medium";
  if (score >= 75) level = "low"; // low risk = mature
  else if (score < 45) level = "high"; // high risk = immature

  return {
    score,
    level,
    summary:
      score >= 75
        ? "Protocol is mature and battle-tested."
        : score >= 45
        ? "Protocol is growing but not fully mature."
        : "Protocol is early-stage or experimental.",
    factors: [
      `Age score: ${age}/30`,
      `TVL stability score: ${tvl}/40`,
      `Audit score: ${audit}/20`,
      `Ecosystem score: ${ecosystem}/10`,
    ],
  };
}
