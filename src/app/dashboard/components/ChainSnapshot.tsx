"use client";

import { useEffect, useState } from "react";

type ChainRisk = {
  chain: string;
  riskScore: number;
  totalTVL: number;
  protocolCount: number;
};

function riskLabel(score: number) {
  if (score <= 30) return "Low";
  if (score <= 60) return "Medium";
  return "High";
}

function riskColor(score: number) {
  if (score <= 30) return "text-[#0bda5e]";
  if (score <= 60) return "text-[#facc15]";
  return "text-[#ef4444]";
}

export default function ChainSnapshot() {
  const [chains, setChains] = useState<ChainRisk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChainRisk() {
      try {
        const res = await fetch("/api/chain-risk");
        const data = await res.json();
        setChains(data);
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
        <h2 className="text-xl font-bold mb-4">Chain Risk Snapshot</h2>
        <p className="text-sm text-[#92a4c9]">Loading…</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Chain Risk Snapshot</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {chains.map((c) => (
          <div
            key={c.chain}
            className="bg-card-dark border border-border-dark rounded-lg p-3"
          >
            <p className="font-medium capitalize">{c.chain}</p>

            <p className={`text-2xl font-bold ${riskColor(c.riskScore)}`}>
              {c.riskScore}/100
            </p>

            <p className="text-xs text-[#92a4c9]">
              {riskLabel(c.riskScore)} Risk
            </p>

            <p className="text-xs text-[#64748b] mt-1">
              {c.protocolCount} protocols
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
