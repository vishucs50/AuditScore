export default function ProtocolSelectors() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-6">
      {/* Protocol A */}
      <div className="relative group">
        <label className="block text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          Protocol A
        </label>
        <div className="flex items-center bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-3">
          <div className="size-10 rounded-full bg-indigo-500/10 mr-3" />
          <div className="flex-1">
            <input
              className="w-full bg-transparent border-none p-0 font-bold text-lg"
              value="Aave V3"
              readOnly
            />
            <span className="text-xs text-text-secondary">
              Ethereum Mainnet
            </span>
          </div>
        </div>
      </div>

      {/* Protocol B */}
      <div className="relative group">
        <label className="block text-text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          Protocol B
        </label>
        <div className="flex items-center bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-3">
          <div className="size-10 rounded-full bg-emerald-500/10 mr-3" />
          <div className="flex-1">
            <input
              className="w-full bg-transparent border-none p-0 font-bold text-lg"
              value="Compound V3"
              readOnly
            />
            <span className="text-xs text-text-secondary">
              Ethereum Mainnet
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
