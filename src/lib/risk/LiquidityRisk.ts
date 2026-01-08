type TVLPoint = {
  tvl: number;
  timestamp: Date;
};
type LiquidityRiskResult = {
  score: number;
  summary: string;
  factors: string[];
};
export function calculateLiquidityRiskFromTVLHistory(
  tvlHistory: TVLPoint[]
): LiquidityRiskResult {
  const factors: string[] = [];

  // 🎯 Neutral baseline
  let risk = 50;

  if (!tvlHistory || tvlHistory.length < 2) {
    return {
      score: 50,
      summary: "Insufficient TVL history to assess liquidity risk.",
      factors: ["Not enough historical TVL data"],
    };
  }

  const tvls = tvlHistory.map((p) => p.tvl).filter((v) => v > 0);
  if (tvls.length < 2) {
    return {
      score: 60,
      summary: "Liquidity risk is elevated due to sparse TVL data.",
      factors: ["TVL history contains invalid or zero values"],
    };
  }

  const first = tvls[0];
  const last = tvls[tvls.length - 1];
  const min = Math.min(...tvls);
  const max = Math.max(...tvls);
  const avg = tvls.reduce((a, b) => a + b, 0) / tvls.length;

  /* --------------------
     1. Absolute liquidity depth
  -------------------- */
  if (avg < 1_000_000) {
    risk += 20;
    factors.push("Average TVL below $1M indicates shallow liquidity");
  } else if (avg < 10_000_000) {
    risk += 10;
    factors.push("Average TVL below $10M indicates limited liquidity depth");
  } else if (avg > 100_000_000) {
    risk -= 10;
    factors.push("Strong average liquidity depth over time");
  }

  /* --------------------
     2. Net TVL trend (start → end)
  -------------------- */
  const netChangePct = ((last - first) / first) * 100;

  if (netChangePct <= -30) {
    risk += 20;
    factors.push("Severe net liquidity outflow over the observed period");
  } else if (netChangePct <= -15) {
    risk += 10;
    factors.push("Sustained liquidity decline over time");
  } else if (netChangePct >= 20) {
    risk -= 5;
    factors.push("Strong net liquidity growth over time");
  }

  /* --------------------
     3. Volatility (min/max drawdown)
  -------------------- */
  const drawdownPct = ((max - min) / max) * 100;

  if (drawdownPct >= 50) {
    risk += 15;
    factors.push("Extreme TVL volatility with large drawdowns");
  } else if (drawdownPct >= 30) {
    risk += 8;
    factors.push("High TVL volatility over the period");
  } else if (drawdownPct <= 10) {
    risk -= 5;
    factors.push("TVL remains relatively stable with low drawdowns");
  }

  /* --------------------
     4. Sudden liquidity shocks
  -------------------- */
  let shockCount = 0;

  for (let i = 1; i < tvls.length; i++) {
    const changePct = ((tvls[i] - tvls[i - 1]) / tvls[i - 1]) * 100;
    if (changePct <= -20) shockCount++;
  }

  if (shockCount >= 2) {
    risk += 10;
    factors.push("Multiple sudden liquidity withdrawal events detected");
  } else if (shockCount === 1) {
    risk += 5;
    factors.push("Single significant liquidity shock observed");
  }

  /* --------------------
     Clamp score
  -------------------- */
  const score = Math.max(0, Math.min(100, Math.round(risk)));

  /* --------------------
     Summary
  -------------------- */
  let summary = "Low liquidity-related risk.";

  if (score >= 75) {
    summary =
      "High liquidity-related risk due to instability and capital outflows.";
  } else if (score >= 50) {
    summary =
      "Moderate liquidity-related risk with noticeable volatility or decline.";
  } else if (score >= 25) {
    summary =
      "Relatively low liquidity-related risk supported by stable TVL behavior.";
  }

  return { score, summary, factors };
}
