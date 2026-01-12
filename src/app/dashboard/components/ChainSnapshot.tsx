"use client";

import { useEffect, useState } from "react";

type ChainRisk = {
  chain: string;
  riskScore: number;
  totalTVL: number;
  protocolCount: number;
};

function riskLabel(score: number) {
  if (score <= 45) return "Low Risk";
  if (score <= 75) return "Medium Risk";
  return "High Risk";
}

const RISK_STYLES = {
  low: {
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  medium: {
    text: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/30",
  },
  high: {
    text: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
};

function riskStyles(score: number) {
  if (score <= 45) return RISK_STYLES.low;
  if (score <= 75) return RISK_STYLES.medium;
  return RISK_STYLES.high;
}

export default function ChainSnapshot() {
  const [chains, setChains] = useState<ChainRisk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChainRisk() {
      try {
        const res = await fetch("/api/chain-risk");
        const data = await res.json();

        // Defensive normalization
        const normalized = data.map((c: ChainRisk) => ({
          ...c,
          riskScore: Math.max(0, Math.min(100, c.riskScore)),
        }));

        setChains(normalized);
      } catch (e) {
        console.error("Failed to load chain risk", e);
      } finally {
        setLoading(false);
      }
    }

    fetchChainRisk();
  }, []);

  if (loading) {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Chain Risk Snapshot</h2>
        <p className="text-sm text-slate-400 animate-pulse">
          Loading chain metrics…
        </p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Chain Risk Snapshot</h2>

      {/* ✅ 5 cards on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {chains.map((c) => {
          const risk = riskStyles(c.riskScore);

          return (
            <div
              key={c.chain}
              className={`
                rounded-xl border p-4
                bg-linear-to-br from-[#0b1220] to-[#020617]
                ${risk.border}
                hover:scale-[1.02] hover:shadow-lg
                transition-all duration-200
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold capitalize tracking-wide">
                  {c.chain}
                </p>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${risk.bg} ${risk.text}`}
                >
                  {riskLabel(c.riskScore)}
                </span>
              </div>

              {/* Score */}
              <p className={`text-3xl font-bold ${risk.text}`}>
                {c.riskScore}
                <span className="text-sm text-slate-400 font-medium">
                  {" "}
                  /100
                </span>
              </p>

              <div className="h-px bg-border-dark my-3 opacity-50" />

              {/* Meta */}
              <div className="text-xs text-slate-400 space-y-1">
                <p>
                  <span className="text-slate-300 font-medium">
                    {c.protocolCount}
                  </span>{" "}
                  protocols
                </p>

                <p>
                  TVL{" "}
                  <span className="text-slate-300 font-medium">
                    ${Math.round(c.totalTVL / 1e9)}B
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
