import React from "react";
import { motion,Variants } from "framer-motion";
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants:Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function DetailedMetricBreakdown() {
  return (
    <motion.section
      className="mb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
    >
      <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">
        Detailed Metric Breakdown
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
      >
        {/* Card 1: Audit Risk */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-card-dark rounded-xl p-6 border border-white/5 hover:border-primary/50 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="size-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">
                verified_user
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              30% Weight
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">Audit Risk</h3>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            Evaluates the number and quality of security audits performed on the
            protocol&apos;s smart contracts.
          </p>

          <div className="bg-black/20 rounded-lg p-3 text-xs text-text-secondary">
            <span className="text-white font-semibold block mb-1">
              Key Factors:
            </span>
            • Auditor reputation tier
            <br />
            • Number of completed audits
            <br />• % of critical issues resolved
          </div>
        </motion.div>

        {/* Card 2: TVL Stability */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-card-dark rounded-xl p-6 border border-white/5 hover:border-blue-500/50 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="size-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
              <span className="material-symbols-outlined text-2xl">
                monitoring
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold">
              20% Weight
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">TVL Stability</h3>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            Measures the consistency of Total Value Locked over time to detect
            erratic capital flight.
          </p>

          <div className="bg-black/20 rounded-lg p-3 text-xs text-text-secondary">
            <span className="text-white font-semibold block mb-1">
              Key Factors:
            </span>
            • 30-day TVL volatility
            <br />
            • Sudden outflows &gt; 10%
            <br />• Consistent growth trend
          </div>
        </motion.div>

        {/* Card 3: Liquidity Risk */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-card-dark rounded-xl p-6 border border-white/5 hover:border-blue-400/50 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="size-12 rounded-lg bg-blue-400/20 flex items-center justify-center text-blue-400">
              <span className="material-symbols-outlined text-2xl">
                water_drop
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-blue-400/10 text-blue-400 text-xs font-bold">
              15% Weight
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">Liquidity Risk</h3>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            Analyzes the depth of liquidity pools to determine slippage risk and
            exit capability.
          </p>

          <div className="bg-black/20 rounded-lg p-3 text-xs text-text-secondary">
            <span className="text-white font-semibold block mb-1">
              Key Factors:
            </span>
            • Pool depth relative to TVL
            <br />
            • Slippage on $100k trades
            <br />• Liquidity utilization rate
          </div>
        </motion.div>

        {/* Card 4: Whale Concentration */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-card-dark rounded-xl p-6 border border-white/5 hover:border-indigo-500/50 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="size-12 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-500">
              <span className="material-symbols-outlined text-2xl">
                pie_chart
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold">
              15% Weight
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">Whale Concentration</h3>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            Calculates the percentage of governance or LP tokens held by the top
            wallets.
          </p>

          <div className="bg-black/20 rounded-lg p-3 text-xs text-text-secondary">
            <span className="text-white font-semibold block mb-1">
              Key Factors:
            </span>
            • Top 10 holders % ownership
            <br />
            • Top 50 holders Gini coefficient
            <br />• Rug pull probability score
          </div>
        </motion.div>

        {/* Card 5: Protocol Maturity */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-card-dark rounded-xl p-6 border border-white/5 hover:border-indigo-400/50 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="size-12 rounded-lg bg-indigo-400/20 flex items-center justify-center text-indigo-400">
              <span className="material-symbols-outlined text-2xl">
                history
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-400/10 text-indigo-400 text-xs font-bold">
              10% Weight
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">Protocol Maturity</h3>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            Rewards protocols that have been live and battle-tested for longer
            periods.
          </p>

          <div className="bg-black/20 rounded-lg p-3 text-xs text-text-secondary">
            <span className="text-white font-semibold block mb-1">
              Key Factors:
            </span>
            • Days since mainnet launch
            <br />
            • Time since last major exploit
            <br />• Transaction volume history
          </div>
        </motion.div>

        {/* Card 6: APY Volatility */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -4 }}
          className="bg-card-dark rounded-xl p-6 border border-white/5 hover:border-indigo-300/50 transition-colors group"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="size-12 rounded-lg bg-indigo-300/20 flex items-center justify-center text-indigo-300">
              <span className="material-symbols-outlined text-2xl">
                trending_up
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-300/10 text-indigo-300 text-xs font-bold">
              10% Weight
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">APY Volatility</h3>
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            Identifies sustainable yield versus inflationary spikes or
            bait-and-switch rates.
          </p>

          <div className="bg-black/20 rounded-lg p-3 text-xs text-text-secondary">
            <span className="text-white font-semibold block mb-1">
              Key Factors:
            </span>
            • Standard deviation of returns
            <br />
            • Reward token inflation rate
            <br />• Real yield vs. token emissions
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default DetailedMetricBreakdown;
