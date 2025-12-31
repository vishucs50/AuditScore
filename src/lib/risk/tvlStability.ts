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
     if (tvlHistory.length < 12) return 55;

     const changes: number[] = [];
     const MIN_CHANGE = 0.002;

     for (let i = 1; i < tvlHistory.length; i++) {
       const prev = tvlHistory[i - 1].tvl;
       const curr = tvlHistory[i].tvl;
       if (prev <= 0) continue;

       const pct = Math.abs(curr - prev) / prev;
       if (pct >= MIN_CHANGE) changes.push(pct);
     }

     if (changes.length === 0) return 70;

     const maxVolatility = Math.max(...changes);

     if (maxVolatility <= 0.01) return 85;
     if (maxVolatility <= 0.03) return 70;
     if (maxVolatility <= 0.06) return 50;
     return 25;
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
