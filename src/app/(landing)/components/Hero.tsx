import React from 'react'

function Hero() {
  return (
    <>
      <section className="relative pt-12 pb-20 lg:pt-24 lg:pb-32 px-4 md:px-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto">
          <div className="absolute top-20 right-0 w-125 h-125 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-100 h-100 bg-purple-500/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-dark border border-surface-border w-fit">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs text-text-secondary">
                Live Beta v1.0
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1]">
              Stop Chasing APY.{" "}
              <span className="text-primary">Start Measuring Risk.</span>
            </h1>

            <p className="text-text-secondary text-lg max-w-xl">
              AuditScore analyzes audits, TVL behavior, and wallet concentration
              to help you avoid rug pulls, exploits, and hidden risks
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="h-12 px-6 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-blue-500/20">
                View Dashboard
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </button>

              <button className="h-12 px-6 bg-surface-dark border border-surface-border hover:bg-surface-border text-white font-bold rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">
                  description
                </span>
                Read Documentation
              </button>
            </div>

            <p className="text-sm text-text-secondary">
              Built for safer{" "}
              <span className="text-white font-semibold">DeFi </span>{" "}
              decision-making
            </p>
          </div>

          {/* Hero Card */}
          <div className="relative w-full max-w-md mx-auto hover:-translate-y-1.5 transition-all duration-300 ease-in-out ">
            <div className="absolute top-0 left-8 right-8 h-64 bg-surface-dark/50 border border-surface-border rounded-xl -rotate-6 translate-y-4" />
            <div className="absolute top-4 left-4 right-4 h-64 bg-surface-dark/80 border border-surface-border rounded-xl -rotate-3 translate-y-2" />

            <div className="relative bg-surface-dark border border-surface-border rounded-xl p-6 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-400 to-primary" />

              <div className="flex justify-between mb-6">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <h3 className="font-bold">Aave V3</h3>
                    <p className="text-xs text-text-secondary">
                      Ethereum Mainnet
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-mono text-green-400">92</div>
                  <div className="text-xs font-bold text-green-400">
                    LOW RISK
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">Audit Quality</span>
                    <span className="text-white">High</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-primary rounded-full w-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">TVL Stability</span>
                    <span className="text-white">Stable</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-green-500 rounded-full w-[95%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">Whale Concentration</span>
                    <span className="text-white">Moderate</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-blue-400 rounded-full w-[75%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400">APY Volatility</span>
                    <span className="text-white">Low</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full">
                    <div className="h-full bg-green-400 rounded-full w-[95%]" />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-border flex justify-between text-xs text-text-secondary">
                <span>Last updated: 2 mins ago</span>
                <button className="text-primary font-bold hover:underline">
                  View Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero