import { Protocol } from "@/lib/models/protocols";

export function computeGlobalStats(protocols: Protocol[]) {
    function parseTVL(tvl?: string | number): number {
      if (!tvl) return 0;

      // Already a number
      if (typeof tvl === "number") return tvl;

      const clean = tvl.replace(/[$,]/g, "").trim();

      const lastChar = clean.slice(-1).toUpperCase();
      const value = parseFloat(clean);

      if (isNaN(value)) return 0;

      switch (lastChar) {
        case "B":
          return value * 1e9;
        case "M":
          return value * 1e6;
        case "K":
          return value * 1e3;
        default:
          return value;
      }
    }

  const totalTVL = protocols.reduce((sum, p) => sum + parseTVL(p.tvl), 0);

  const auditedCount = protocols.filter((p) => p.audits).length;

  const avgRiskScore =
    protocols.length === 0
      ? 0
      : Math.round(
          protocols.reduce((sum, p) => sum + (p.finalRiskScore ?? 0), 0) /
            protocols.length
        );

  const highRiskCount = protocols.filter(
    (p) => (p.finalRiskScore ?? 100) < 40
  ).length;

  return {
    totalTVL,
    auditedCount,
    avgRiskScore,
    highRiskCount,
  };
}
