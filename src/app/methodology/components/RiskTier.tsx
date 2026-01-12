import React from "react";

function RiskCategories() {
  return (
    <section className="w-full">
      <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em] mb-6">
        Risk Categories
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LOW RISK */}
        <div className="relative overflow-hidden rounded-2xl border border-risk-low/30 bg-gradient-to-br from-risk-low/10 to-transparent p-6">
          {/* Glow */}
          <div className="absolute inset-0 bg-risk-low/5 blur-2xl opacity-30" />

          {/* Watermark */}
          <span className="material-symbols-outlined absolute right-4 top-4 text-[120px] text-risk-low opacity-10">
            verified
          </span>

          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="size-11 rounded-full bg-risk-low flex items-center justify-center text-black shadow-lg shadow-risk-low/30">
              <span className="material-symbols-outlined">check_circle</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Low Risk</h3>
              <p className="text-risk-low text-sm font-bold">Score 80 – 100</p>
            </div>
          </div>

          <p className="relative z-10 text-text-secondary text-sm leading-relaxed">
            Protocols with multiple reputable audits, high liquidity,
            decentralized governance, and a long history of safe operations.
          </p>
        </div>

        {/* MEDIUM RISK */}
        <div className="relative overflow-hidden rounded-2xl border border-risk-medium/30 bg-linear-to-br from-risk-medium/10 to-transparent p-6">
          <div className="absolute inset-0 bg-risk-medium/5 blur-2xl opacity-30" />

          <span className="material-symbols-outlined absolute right-4 top-4 text-[120px] text-risk-medium opacity-10">
            warning
          </span>

          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="size-11 rounded-full bg-risk-medium flex items-center justify-center text-black shadow-lg shadow-risk-medium/30">
              <span className="material-symbols-outlined">gpp_maybe</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Medium Risk</h3>
              <p className="text-risk-medium text-sm font-bold">Score 50 – 79</p>
            </div>
          </div>

          <p className="relative z-10 text-text-secondary text-sm leading-relaxed">
            Newer protocols or those with some centralized aspects. May have
            audits but from lesser-known firms, or experience moderate TVL
            fluctuation.
          </p>
        </div>

        {/* HIGH RISK */}
        <div className="relative overflow-hidden rounded-2xl border border-risk-high/30 bg-gradient-to-br from-risk-high/10 to-transparent p-6">
          <div className="absolute inset-0 bg-risk-high/5 blur-2xl opacity-30" />

          <span className="material-symbols-outlined absolute right-4 top-4 text-[120px] text-risk-high opacity-10">
            dangerous
          </span>

          <div className="relative z-10 flex items-center gap-4 mb-4">
            <div className="size-11 rounded-full bg-risk-high flex items-center justify-center text-white shadow-lg shadow-risk-high/30">
              <span className="material-symbols-outlined">error</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">High Risk</h3>
              <p className="text-risk-high text-sm font-bold">Score 0 – 49</p>
            </div>
          </div>

          <p className="relative z-10 text-text-secondary text-sm leading-relaxed">
            Experimental protocols, unaudited contracts, or high whale
            concentration. Significant risk of rug pulls, exploits, or liquidity
            crises.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RiskCategories;
