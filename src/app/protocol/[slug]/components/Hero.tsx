"use client";
import { motion } from "framer-motion";
import { formatTVL } from "@/lib/risk/tvlStability";
type ProtocolView = {
  name: string;
  slug: string;
  category: string;
  chains: string[];
  audits: number;
  icon: string;
  description: string;

  selectedChain: string;
  tvl: number;
  avgApy: number | null;
  rewardApy: number | null;

  finalRiskScore: number;
  risk: string;
  color: string;
};

type Props = {
  protocol: ProtocolView;
};
function apyToPercent(apy: number) {
  const MAX_APY = 5; // cap
  return Math.min(100, Math.round((apy / MAX_APY) * 100));
}
const Hero = ({ protocol }: Props) => {
  const avgApy =
    typeof protocol?.avgApy === "number"
      ? Number(protocol.avgApy.toFixed(2))
      : null;
  const hasApy = typeof avgApy === "number" && avgApy > 0;
  const scoreCircle = (1 - Number(protocol.finalRiskScore) / 100) * 264;
  const score = Number(protocol.finalRiskScore);

  const glow =
    score >= 80
      ? "drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
      : score >= 60
      ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
      : "drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]";
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
    >
      {/* Score Card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`${
          hasApy ? "lg:col-span-2" : "lg:col-span-3"
        } bg-[#111722] rounded-xl p-6 border border-border-dark flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group`}
      >
        {/* Background Accent */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute top-0 right-0 w-64 h-64 bg-success/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
        />

        {/* Score Circle */}
        <div className="relative size-48 shrink-0 flex items-center justify-center">
          <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#232f48"
              strokeWidth="8"
            />

            {/* Animated progress ring */}
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={protocol.color}
              strokeWidth="8"
              strokeDasharray="264"
              strokeLinecap="round"
              initial={{ strokeDashoffset: 264 }}
              animate={{ strokeDashoffset: scoreCircle }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className={glow} // ✅ dynamic glow
            />
          </svg>

          {/* Score Text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <span className="text-4xl font-bold text-white tracking-tight">
              {protocol.finalRiskScore}
            </span>
            <span className="text-xs text-text-secondary uppercase tracking-wider font-medium mt-1">
              {protocol.finalRiskScore}/ 100
            </span>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-3 flex-1 text-center md:text-left z-10">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-success/10  border border-success/20"
              style={{
                color: protocol.color,
                borderColor: `${protocol.color}33`,
                backgroundColor: `${protocol.color}1A`,
              }}
            >
              <span
                className="size-2 rounded-full animate-pulse"
                style={{ backgroundColor: protocol.color }}
              />
              {protocol.risk}
            </motion.span>

            <span className="text-text-secondary text-sm">
              Last updated: 2h ago
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white">{protocol.name}</h1>

          <p className="text-text-secondary leading-relaxed max-w-xl">
            {protocol.description}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
            {[
              {
                icon: "verified_user",
                text: `${protocol.audits} Audits Completed`,
              },
              {
                icon: "account_balance",
                text: `${formatTVL(protocol.tvl)} TVL`,
              },
            ].map((item) => (
              <motion.div
                key={item.text}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 text-sm text-white"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">
                  {item.icon}
                </span>
                {item.text}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* APY Insight Panel */}
      {hasApy && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1 bg-card-dark rounded-xl p-6 border border-border-dark flex flex-col justify-center gap-9"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Current APY</h3>

            {/* Help Tooltip */}
            <div className="relative group">
              <span className="material-symbols-outlined text-text-secondary cursor-pointer">
                help
              </span>

              {/* Tooltip */}
              <div
                className="absolute right-0 top-full mt-2 w-64 rounded-lg 
                 bg-black border border-border-dark
                 text-xs text-white p-3
                 opacity-0 group-hover:opacity-100
                 pointer-events-none transition-opacity duration-200
                 shadow-xl z-50"
              >
                <strong>APY (Annual Percentage Yield)</strong>
                <p className="mt-1 text-text-secondary">
                  APY represents the estimated yearly return including
                  compounding, based on current rates. Actual returns may vary
                  depending on liquidity and market conditions.
                </p>

                {/* Arrow */}
                <div
                  className="absolute -top-2 right-3 w-0 h-0
                   border-l-8 border-r-8 border-b-8
                   border-l-transparent border-r-transparent
                   border-b-black"
                />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-1"
          >
            <span className="text-4xl font-bold text-white">
              {avgApy.toFixed(2)}%
            </span>
          </motion.div>

          {/* APY Bar */}
          <div className="h-4 w-full bg-[#111722] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${apyToPercent(avgApy)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-linear-to-r from-primary to-purple-500"
            />
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Hero;
