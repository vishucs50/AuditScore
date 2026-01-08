type NormalizedRisks = {
  audit: number;
  liquidity: number;
  whale: number;
  composability: number;
  maturity: number;
  tvl: number;
};

function normalizeToRisk(metrics: {
  auditRisk: number;
  liquidityRisk: number;
  whaleRisk: number;
  composabilityRisk: number;
  maturityScore: number;
  tvlStabilityScore: number;
}): NormalizedRisks {
  return {
    audit: metrics.auditRisk,
    liquidity: metrics.liquidityRisk,
    whale: metrics.whaleRisk,
    composability: metrics.composabilityRisk,

    // strength → risk
    maturity: 100 - metrics.maturityScore,
    tvl: 100 - metrics.tvlStabilityScore,
  };
}

function calculateFinalRiskScore(risk: NormalizedRisks) {
  const score =
    risk.audit * 0.25 +
    risk.composability * 0.2 +
    risk.liquidity * 0.15 +
    risk.whale * 0.15 +
    risk.maturity * 0.15 +
    risk.tvl * 0.1;

  return Math.round(score);
}
function getRiskLevel(score: number): "low" | "medium" | "high" {
  if (score <= 30) return "low";
  if (score <= 60) return "medium";
  return "high";
}
const RISK_WORDS = {
  audit: "Security",
  liquidity: "Liquidity",
  whale: "Centralization",
  composability: "Composability",
  maturity: "Immaturity",
  tvl: "Instability",
} as const;
function getTopTwoRiskWords(risk: NormalizedRisks): string[] {
  const entries = Object.entries(risk) as [keyof typeof RISK_WORDS, number][];

  entries.sort((a, b) => b[1] - a[1]); // highest risk first

  return entries.slice(0, 2).map(([key]) => RISK_WORDS[key]);
}
export function calculateProtocolRisk(metrics: {
  auditRisk: number;
  liquidityRisk: number;
  whaleRisk: number;
  composabilityRisk: number;
  maturityScore: number;
  tvlStabilityScore: number;
}) {
  const normalized = normalizeToRisk(metrics);

  const finalScore = calculateFinalRiskScore(normalized)+35;
  const level = getRiskLevel(finalScore);
  const riskFactors = getTopTwoRiskWords(normalized);

  return {
    score: finalScore,
    level,
    factors: riskFactors, 
  };
}

