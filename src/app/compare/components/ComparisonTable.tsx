export default function ComparisonTable() {
  return (
    <div className="mt-4 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
      {/* Sticky Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-[#151b26] border-b border-gray-200 dark:border-border-dark text-xs font-bold text-text-secondary uppercase tracking-wider sticky top-0 z-10">
        <div className="col-span-4 md:col-span-3">Metric</div>
        <div className="col-span-4 text-left pl-2 border-l border-gray-200 dark:border-gray-700">
          Aave V3
        </div>
        <div className="col-span-4 text-left pl-2 border-l border-gray-200 dark:border-gray-700">
          Compound V3
        </div>
        <div className="hidden md:block md:col-span-1 text-center">Diff</div>
      </div>

      {/* Category: Security & Audits */}
      <div className="group border-b border-gray-200 dark:border-border-dark last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <div className="grid grid-cols-12 gap-4 p-4 items-center">
          <div className="col-span-4 md:col-span-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-text-secondary">
                gavel
              </span>
              <span className="text-slate-900 dark:text-white font-medium text-sm">
                Audit Score
              </span>
              <span
                className="material-symbols-outlined text-text-secondary text-[16px] cursor-help"
                title="Based on number and quality of audits"
              >
                info
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                98/100
              </span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-risk-low h-1.5 rounded-full"
                  style={{ width: "98%" }}
                ></div>
              </div>
              <span className="text-xs text-text-secondary">
                6 Audits (SigmaPrime, OpenZeppelin)
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                95/100
              </span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-risk-low h-1.5 rounded-full"
                  style={{ width: "95%" }}
                ></div>
              </div>
              <span className="text-xs text-text-secondary">
                4 Audits (OpenZeppelin, Trail of Bits)
              </span>
            </div>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <span className="text-risk-low text-xs font-bold bg-risk-low/10 px-2 py-1 rounded">
              +3%
            </span>
          </div>
        </div>
      </div>

      {/* Category: Liquidity */}
      <div className="group border-b border-gray-200 dark:border-border-dark last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <div className="grid grid-cols-12 gap-4 p-4 items-center">
          <div className="col-span-4 md:col-span-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-text-secondary">
                water_drop
              </span>
              <span className="text-slate-900 dark:text-white font-medium text-sm">
                Liquidity Utilization
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                78%
              </span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-primary h-1.5 rounded-full"
                  style={{ width: "78%" }}
                ></div>
              </div>
              <span className="text-xs text-text-secondary">Optimal range</span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                62%
              </span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-primary/60 h-1.5 rounded-full"
                  style={{ width: "62%" }}
                ></div>
              </div>
              <span className="text-xs text-text-secondary">
                Under-utilized
              </span>
            </div>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <span className="text-text-secondary text-xs font-bold">+16%</span>
          </div>
        </div>
      </div>

      {/* Category: Volatility */}
      <div className="group border-b border-gray-200 dark:border-border-dark last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <div className="grid grid-cols-12 gap-4 p-4 items-center">
          <div className="col-span-4 md:col-span-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-text-secondary">
                show_chart
              </span>
              <span className="text-slate-900 dark:text-white font-medium text-sm">
                APY Volatility (30d)
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                Low
              </span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-risk-low h-1.5 rounded-full"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                Medium
              </span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-risk-medium h-1.5 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <span className="text-risk-low material-symbols-outlined text-lg">
              check_circle
            </span>
          </div>
        </div>
      </div>

      {/* Category: Whale Concentration */}
      <div className="group border-b border-gray-200 dark:border-border-dark last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <div className="grid grid-cols-12 gap-4 p-4 items-center">
          <div className="col-span-4 md:col-span-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-text-secondary">
                group
              </span>
              <span className="text-slate-900 dark:text-white font-medium text-sm">
                Whale Concentration
              </span>
              <span
                className="material-symbols-outlined text-text-secondary text-[16px] cursor-help"
                title="% of supply held by top 10 wallets"
              >
                info
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                12%
              </span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-risk-low h-1.5 rounded-full"
                  style={{ width: "12%" }}
                ></div>
              </div>
              <span className="text-xs text-text-secondary">
                Top 10 Wallets
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                35%
              </span>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-risk-medium h-1.5 rounded-full"
                  style={{ width: "35%" }}
                ></div>
              </div>
              <span className="text-xs text-text-secondary">
                Top 10 Wallets
              </span>
            </div>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            <span className="text-risk-low material-symbols-outlined text-lg">
              check_circle
            </span>
          </div>
        </div>
      </div>

      {/* Category: Maturity */}
      <div className="group border-b border-gray-200 dark:border-border-dark last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <div className="grid grid-cols-12 gap-4 p-4 items-center">
          <div className="col-span-4 md:col-span-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-text-secondary">
                history
              </span>
              <span className="text-slate-900 dark:text-white font-medium text-sm">
                Protocol Maturity
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                1150 Days
              </span>
              <span className="text-xs text-text-secondary">
                Since V2 Launch
              </span>
            </div>
          </div>

          <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
            <div className="flex flex-col gap-1">
              <span className="text-slate-900 dark:text-white font-bold text-sm">
                540 Days
              </span>
              <span className="text-xs text-text-secondary">
                Since V3 Launch
              </span>
            </div>
          </div>

          <div className="hidden md:flex md:col-span-1 items-center justify-center">
            {/* No visual indicator needed for purely informational fields */}
          </div>
        </div>
      </div>
    </div>
  );
}
