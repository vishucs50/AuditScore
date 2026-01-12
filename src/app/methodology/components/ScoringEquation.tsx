import React from "react";

function ScoringEquation() {
  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[22px] font-bold leading-tight tracking-[-0.015em]">
          The Risk Equation
        </h2>
        <span className="text-sm text-text-secondary font-medium">
          Total Score: 100%
        </span>
      </div>

      {/* Progress Bar Visual */}
      <div className="w-full h-12 flex rounded-xl overflow-hidden mb-6 text-xs font-bold text-center text-white/90">
        {/* Audit */}
        <div
          className="h-full bg-primary flex items-center justify-center relative group rounded-l-xl"
          style={{ width: "25%" }}
        >
          <span className="z-10">Audit 25%</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-xl" />
        </div>

        {/* Composability */}
        <div
          className="h-full bg-blue-500 flex items-center justify-center relative group"
          style={{ width: "20%" }}
        >
          <span className="z-10 hidden sm:inline">Composability 20%</span>
          <span className="z-10 sm:hidden">20%</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Liquidity */}
        <div
          className="h-full bg-blue-400 flex items-center justify-center relative group"
          style={{ width: "15%" }}
        >
          <span className="z-10 hidden sm:inline">Liq 15%</span>
          <span className="z-10 sm:hidden">15%</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Whale */}
        <div
          className="h-full bg-indigo-500 flex items-center justify-center relative group"
          style={{ width: "15%" }}
        >
          <span className="z-10 hidden sm:inline">Whale 15%</span>
          <span className="z-10 sm:hidden">15%</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Protocol Age */}
        <div
          className="h-full bg-indigo-400 flex items-center justify-center relative group"
          style={{ width: "15%" }}
        >
          <span className="z-10 hidden sm:inline">Age 15%</span>
          <span className="z-10 sm:hidden">15%</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* TVL Stability */}
        <div
          className="h-full bg-indigo-300 flex items-center justify-center relative group rounded-r-xl"
          style={{ width: "10%" }}
        >
          <span className="z-10 hidden sm:inline">TVL 10%</span>
          <span className="z-10 sm:hidden">10%</span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-r-xl" />
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center text-xs md:text-sm text-text-secondary">
        <div className="flex flex-col gap-1 items-center">
          <div className="size-3 rounded-full bg-primary" />
          <span>Audit Risk</span>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="size-3 rounded-full bg-blue-500" />
          <span>Composability Risk</span>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="size-3 rounded-full bg-blue-400" />
          <span>Liquidity Risk</span>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="size-3 rounded-full bg-indigo-500" />
          <span>Whale Concentration</span>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="size-3 rounded-full bg-indigo-400" />
          <span>Protocol Maturity</span>
        </div>

        <div className="flex flex-col gap-1 items-center">
          <div className="size-3 rounded-full bg-indigo-300" />
          <span>TVL Stability</span>
        </div>
      </div>
    </section>
  );
}

export default ScoringEquation;
