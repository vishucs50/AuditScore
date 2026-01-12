"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { aside } from "framer-motion/client";

/* ---------------- TYPES ---------------- */

type Exposure = {
  slug: string;
  name: string;
  score: number; // 0–100
};

/* ---------------- HELPERS ---------------- */

// Derive level from score (single source of truth)
function getLevel(score: number): "Low" | "Medium" | "High" {
  if (score <= 45) return "Low";
  if (score <= 75) return "Medium";
  return "High";
}

// Badge styling
function levelStyles(level: "Low" | "Medium" | "High") {
  if (level === "Low")
    return "bg-green-500/10 text-green-400 border-green-500/30";
  if (level === "Medium")
    return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
  return "bg-red-500/10 text-red-400 border-red-500/30";
}

// Progress bar color
function scoreBar(score: number) {
  if (score <= 45) return "bg-green-500";
  if (score <= 75) return "bg-yellow-500";
  return "bg-red-500";
}

/* ---------------- COMPONENT ---------------- */

export default function WalletExposure() {
  const { address } = useWallet();
  const [data, setData] = useState<Exposure[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!address) return;

    setLoading(true);

    fetch(`/api/wallet/exposure?address=${address}`)
      .then((res) => res.json())
      .then((d) => {
        // Defensive normalization
        const normalized = d.map((p: Exposure) => ({
          ...p,
          score: Math.max(0, Math.min(100, p.score)),
        }));

        setData(normalized);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [address]);

  if (!address) return null;

  return (
      <section className="bg-card-dark border border-border-dark rounded-xl p-5 space-y-4">
        {/* Header */}
        <div>
          <h3 className="font-bold text-lg">Your Wallet Protocol Exposure</h3>
          <p className="text-xs text-text-secondary">
            Personalized risk analysis based on your connected wallet
          </p>
        </div>

        {loading && (
          <p className="text-xs text-text-secondary animate-pulse">
            Analyzing on-chain exposure…
          </p>
        )}

        {!loading && data.length === 0 && (
          <p className="text-xs text-text-secondary">
            No protocol exposure detected for this wallet
          </p>
        )}

        {/* Exposure Cards */}
        <div className="space-y-3">
          {data.map((p) => {
            const level = getLevel(p.score);

            return (
              <div
                key={p.slug}
                className="rounded-lg border border-border-dark p-4 bg-black/30"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{p.name}</span>

                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border ${levelStyles(
                      level
                    )}`}
                  >
                    {level} Risk
                  </span>
                </div>

                {/* Risk bar */}
                <div className="w-full h-2 bg-border-dark rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${scoreBar(p.score)}`}
                    style={{ width: `${p.score}%` }}
                  />
                </div>

                {/* Footer */}
                <div className="flex justify-between mt-1 text-xs text-text-secondary">
                  <span>Risk Score</span>
                  <span>{p.score}/100</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
  );
}
