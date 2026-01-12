export default function SummarySection() {
  return (
    <div className="flex flex-col gap-6 px-4">
      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Protocol A Summary */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-text-secondary text-sm font-medium">
                Overall Risk Score
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-4xl font-black text-slate-900 dark:text-white">
                  92
                  <span className="text-xl text-text-secondary font-normal">
                    /100
                  </span>
                </h3>
                <span className="bg-risk-low/20 text-risk-low text-xs font-bold px-2 py-1 rounded-full border border-risk-low/20">
                  LOW RISK
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-text-secondary text-sm font-medium">
                Current APY
              </p>
              <div className="flex items-center justify-end gap-1 mt-1 text-slate-900 dark:text-white">
                <h3 className="text-3xl font-bold">4.2%</h3>
                <span className="material-symbols-outlined text-risk-low text-sm">
                  trending_up
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">7d avg: 4.1%</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex-1">
              <p className="text-xs text-text-secondary mb-1">TVL</p>
              <p className="text-slate-900 dark:text-white font-semibold">
                $5.24B
              </p>
            </div>
            <div className="flex-1 border-l border-gray-200 dark:border-gray-800 pl-4">
              <p className="text-xs text-text-secondary mb-1">Market Share</p>
              <p className="text-slate-900 dark:text-white font-semibold">
                18.5%
              </p>
            </div>
          </div>
        </div>

        {/* Protocol B Summary */}
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>

          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-text-secondary text-sm font-medium">
                Overall Risk Score
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <h3 className="text-4xl font-black text-slate-900 dark:text-white">
                  88
                  <span className="text-xl text-text-secondary font-normal">
                    /100
                  </span>
                </h3>
                <span className="bg-risk-low/20 text-risk-low text-xs font-bold px-2 py-1 rounded-full border border-risk-low/20">
                  LOW RISK
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-text-secondary text-sm font-medium">
                Current APY
              </p>
              <div className="flex items-center justify-end gap-1 mt-1 text-slate-900 dark:text-white">
                <h3 className="text-3xl font-bold">3.8%</h3>
                <span className="material-symbols-outlined text-risk-medium text-sm">
                  trending_flat
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">7d avg: 3.8%</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex-1">
              <p className="text-xs text-text-secondary mb-1">TVL</p>
              <p className="text-slate-900 dark:text-white font-semibold">
                $1.82B
              </p>
            </div>
            <div className="flex-1 border-l border-gray-200 dark:border-gray-800 pl-4">
              <p className="text-xs text-text-secondary mb-1">Market Share</p>
              <p className="text-slate-900 dark:text-white font-semibold">
                6.2%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
