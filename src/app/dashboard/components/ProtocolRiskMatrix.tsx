"use client";
import Link from "next/link";
import { Protocol } from "@/lib/models/protocols";
import { formatTVL } from "@/lib/risk/tvlStability";
import { motion, Variants } from "framer-motion";

/* ------------------ Animations ------------------ */

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/* ------------------ Color Helper ------------------ */

function tvlStabilityColor(score: number) {
  if (score >= 70) {
    return {
      border: "border-[#0bda5e]",
      bg: "bg-[#0bda5e]",
      badge: "bg-[#0bda5e]/10 text-[#0bda5e]",
    };
  }

  if (score >= 40) {
    return {
      border: "border-[#facc15]",
      bg: "bg-[#facc15]",
      badge: "bg-[#facc15]/10 text-[#facc15]",
    };
  }

  return {
    border: "border-[#ef4444]",
    bg: "bg-[#ef4444]",
    badge: "bg-[#ef4444]/10 text-[#ef4444]",
  };
}

/* ------------------ Component ------------------ */

export default function ProtocolRiskMatrix({
  protocols,
}: {
  protocols: Protocol[];
}) {
  const visibleProtocols = protocols.slice(0, 6);

  return (
    <section>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Protocol Risk Matrix</h2>
        <Link href={"/protocol"} className="text-sm text-primary" >View All →</Link>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {visibleProtocols.map((p) => {
          const color = tvlStabilityColor(p.tvlStability.score);

          return (
            <Link href={`/protocol/${p.slug}`} className="block" key={p.slug}>
              <motion.div
                key={p.slug}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                  boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                }}
                className={`bg-card-dark rounded-xl p-4 border-l-4 ${color.border} border-border-dark cursor-pointer`}
              >
                {/* Header */}
                <div className="flex justify-between mb-3">
                  <h4 className="font-bold">{p.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded ${color.badge}`}>
                    {p.risk}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <Stat
                    label="Risk Score"
                    value={`${p.finalRiskScore.score}`}
                  />
                  <Stat label="TVL" value={formatTVL(p.tvl)} />
                </div>

                {/* TVL Stability */}
                <div>
                  <span className="text-[10px] text-text-secondary uppercase">
                    TVL Stability
                  </span>

                  <div className="w-full h-1 bg-[#111722] rounded overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.tvlStability.score}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full ${color.bg}`}
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </section>
  );
}

/* ------------------ Small Stat Component ------------------ */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] text-text-secondary uppercase">{label}</span>
      <p className="font-mono">{value}</p>
    </div>
  );
}
