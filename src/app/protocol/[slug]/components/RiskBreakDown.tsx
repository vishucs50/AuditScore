"use client";

import React from "react";
import { motion ,type Variants} from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants:Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const RiskBreakdown = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-1">
        <span className="material-symbols-outlined text-primary text-[24px]">
          analytics
        </span>
        <h2 className="text-xl font-bold text-white">Risk Breakdown</h2>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {[
          {
            title: "Audit Risk",
            icon: "gavel",
            score: 95,
            color: "bg-blue-500",
            iconBg: "bg-blue-500/10 text-blue-400",
            text: "3 major audits completed with 0 critical vulnerabilities unresolved. Audited by Certik & OpenZeppelin.",
          },
          {
            title: "TVL Stability",
            icon: "savings",
            score: 80,
            color: "bg-green-500",
            iconBg: "bg-green-500/10 text-green-400",
            text: "Total Value Locked is $4.2B. Shown consistent growth of +2% over the last 30 days despite market volatility.",
          },
          {
            title: "Liquidity Risk",
            icon: "water_drop",
            score: 75,
            color: "bg-yellow-500",
            iconBg: "bg-yellow-500/10 text-yellow-400",
            text: "Sufficient liquidity depth for swaps under $1M with minimal slippage (<0.1%).",
          },
          {
            title: "Whale Concentration",
            icon: "pie_chart",
            score: 60,
            color: "bg-orange-400",
            iconBg: "bg-orange-500/10 text-orange-400",
            text: "Top 10 holders own 15% of the governance token supply. Moderate risk of governance manipulation.",
          },
          {
            title: "Protocol Maturity",
            icon: "history_edu",
            score: 90,
            color: "bg-purple-500",
            iconBg: "bg-purple-500/10 text-purple-400",
            text: "Deployed for >2 years on Mainnet. Battle-tested code with significant time in production without major exploits.",
          },
          {
            title: "APY Volatility",
            icon: "ssid_chart",
            score: 82,
            color: "bg-teal-500",
            iconBg: "bg-teal-500/10 text-teal-400",
            text: "Low volatility in returns. Standard deviation of APY over the last 90 days is 0.4%.",
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-card-dark rounded-xl p-5 border border-border-dark hover:border-primary/30 transition-colors group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${card.iconBg}`}>
                  <span className="material-symbols-outlined text-[20px]">
                    {card.icon}
                  </span>
                </div>
                <h3 className="font-semibold text-white">{card.title}</h3>
              </div>
              <span className="text-white font-mono font-bold bg-[#111722] px-2 py-1 rounded text-sm">
                {card.score}/100
              </span>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="w-full bg-[#111722] h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${card.score}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`${card.color} h-full rounded-full`}
                />
              </div>
            </div>

            <p className="text-sm text-text-secondary">{card.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default RiskBreakdown;
