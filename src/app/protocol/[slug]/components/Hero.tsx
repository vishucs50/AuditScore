"use client";

import React from "react";
import { motion } from "framer-motion";
import { formatTVL } from "@/lib/risk/tvlStability";
import { Protocol } from "@/lib/models/protocols";
type Props={
    protocol:Protocol;
}
const Hero = ({protocol}:Props) => {
  const scoreCircle=(1 - Number(protocol.finalRiskScore) / 100)*264;
  const score=Number(protocol.finalRiskScore)
  const glow =
    score >= 80
      ? "drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]"
      : score >= 60
      ? "drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
      : "drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]";
;
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
        className="lg:col-span-2 bg-[#111722] rounded-xl p-6 border border-border-dark flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group"
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
              / 100
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
              { icon: "verified_user", text: `${protocol.audits} Audits Completed` },
              { icon: "account_balance", text: `${formatTVL(protocol.tvl)} TVL` },
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
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="lg:col-span-1 bg-card-dark rounded-xl p-6 border border-border-dark flex flex-col justify-center gap-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Current APY</h3>
          <span className="material-symbols-outlined text-text-secondary">
            help
          </span>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-1"
        >
          <span className="text-4xl font-bold text-white">3.52%</span>
          <span className="text-sm text-success flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">
              trending_up
            </span>
            +0.12% (7d avg)
          </span>
        </motion.div>

        {/* APY Bar */}
        <div className="h-4 w-full bg-[#111722] rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "85%" }}
            transition={{ duration: 0.8 }}
            className="h-full bg-primary"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "15%" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="h-full bg-purple-500"
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
