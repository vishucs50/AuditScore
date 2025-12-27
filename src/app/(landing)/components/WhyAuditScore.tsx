"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BarChart3, Scale, Activity } from "lucide-react";

const steps = [
  {
    title: "Audit-first Scoring",
    description:
      "Security audits and verifiable on-chain data form the foundation of every protocol score.",
    icon: ShieldCheck,
  },
  {
    title: "Explainable Metrics",
    description:
      "Each risk signal is visible, weighted, and clearly explained for transparency.",
    icon: BarChart3,
  },
  {
    title: "Risk-Adjusted Yield",
    description:
      "Protocols are compared by safety-adjusted returns, not raw APY.",
    icon: Scale,
  },
  {
    title: "Real-Time On-Chain Signals",
    description:
      "Risk scores update dynamically as liquidity and on-chain behavior change.",
    icon: Activity,
  },
];

export default function WhyAuditScore() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16 text-center"
      >
        <h2 className="text-3xl font-bold text-white">Why AuditScore?</h2>
        <p className="mt-3 text-gray-400">
          A transparent pipeline for evaluating DeFi protocol risk
        </p>
      </motion.div>

      {/* Pipeline */}
      <div className="relative grid gap-12 md:grid-cols-4">
        {/* Horizontal connector (desktop) */}
        <div className="absolute left-0 right-0 top-1/2 hidden h-px bg-linear-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 md:block" />

        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="relative z-10 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            >
              {/* Step number */}
              <div className="absolute -top-4 left-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Icon */}
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <Icon className="h-6 w-6 text-blue-400" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400">{step.description}</p>

              {/* Vertical connector (mobile) */}
              {i !== steps.length - 1 && (
                <div className="absolute left-1/2 top-full mt-6 h-8 w-px bg-linear-to-b from-blue-500/40 to-transparent md:hidden" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
