
function externalDependencyScore(category?: string) {
  if (!category) return 15;

  const highRisk = ["Yield Aggregator", "Derivatives", "Structured Products"];
  const mediumRisk = ["LSD", "Liquid Staking", "Vault"];

  if (highRisk.includes(category)) return 35;
  if (mediumRisk.includes(category)) return 25;
  return 10;
}
function crossChainDependencyScore(chains: string[] = []) {
  if (chains.length >= 5) return 25;
  if (chains.length >= 3) return 18;
  if (chains.length >= 2) return 12;
  return 5;
}
function oracleDependencyScore(category?: string) {
  if (!category) return 8; // default low oracle risk

  const oracleHeavy = ["Lending", "Derivatives", "Perps"];
  return oracleHeavy.includes(category) ? 20 : 8;
}
function bridgeExposureScore(chains: string[] = []) {
  if (chains.length >= 4) return 15;
  if (chains.length >= 2) return 8;
  return 2;
}
export function calculateDependencyRisk(protocol: any) {
  const ext = externalDependencyScore(protocol.category);
  const cross = crossChainDependencyScore(protocol.chains);
  const oracle = oracleDependencyScore(protocol.category);
  const bridge = bridgeExposureScore(protocol.chains);

  const score = Math.min(100, ext + cross + oracle + bridge);

  let level: "low" | "medium" | "high" = "medium";
  if (score >= 65) level = "high";
  else if (score <= 30) level = "low";

  return {
    score,
    level,
    summary:
      level === "low"
        ? "Low dependency on external protocols."
        : level === "medium"
        ? "Moderate composability risk due to external dependencies."
        : "High dependency on external protocols and cross-chain infrastructure.",
    factors: [
      `External protocol reliance: ${ext}`,
      `Cross-chain exposure: ${cross}`,
      `Oracle dependency: ${oracle}`,
      `Bridge exposure: ${bridge}`,
    ],
  };
}
