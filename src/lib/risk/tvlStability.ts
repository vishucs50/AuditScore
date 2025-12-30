    type TVLHistoryPoint = {
    tvl: number;
    timestamp?: number; // optional, useful later
    };
    export function formatTVL(value?: number | string | null) {
      if (value === null || value === undefined) {
        return "—";
      }

      const num = typeof value === "string" ? Number(value) : value;

      if (isNaN(num)) {
        return "—";
      }

      if (num >= 1e9) {
        return `$${(num / 1e9).toFixed(2)}B`;
      }

      if (num >= 1e6) {
        return `$${(num / 1e6).toFixed(2)}M`;
      }

      return `$${num.toLocaleString()}`;
    }

    function calculateTVLStabilityScore(tvlHistory: TVLHistoryPoint[]) {
    if (tvlHistory.length < 2) return 50;

    const changes = [];

    for (let i = 1; i < tvlHistory.length; i++) {
        const prev = tvlHistory[i - 1].tvl;
        const curr = tvlHistory[i].tvl;

        const pctChange = Math.abs(curr - prev) / prev;
        changes.push(pctChange);
    }

    const avgVolatility = changes.reduce((a, b) => a + b, 0) / changes.length;

    let score;
    if (avgVolatility <= 0.005) score = 95;
    else if (avgVolatility <= 0.01) score = 85;
    else if (avgVolatility <= 0.02) score = 70;
    else if (avgVolatility <= 0.04) score = 45;
    else score = 20;

    return Math.round(score);
    }
    export default function buildTVLStabilityRisk(tvlHistory: TVLHistoryPoint[]) {
    const score = calculateTVLStabilityScore(tvlHistory);
    let level;
    let summary;
    const factors = [];

    if (score >= 80) {
        level = "low";
        summary =
        "TVL remains stable with minimal daily fluctuations, indicating strong user confidence.";
        factors.push(
        "Consistent capital inflows",
        "No significant withdrawal spikes",
        "Low short-term volatility"
        );
    } else if (score >= 50) {
        level = "medium";
        summary =
        "TVL shows moderate fluctuations, suggesting some sensitivity to market conditions.";
        factors.push(
        "Noticeable daily TVL changes",
        "Possible reaction to market events",
        "Moderate volatility observed"
        );
    } else {
        level = "high";
        summary =
        "TVL is highly volatile with sharp capital movements, indicating elevated risk.";
        factors.push(
        "Large withdrawal spikes detected",
        "Potential whale exits",
        "High short-term volatility"
        );
    }

    return {
        score,
        level,
        summary,
        factors,
    };
    }
