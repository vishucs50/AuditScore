export default function ProtocolTables() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Safest */}
      <div className="bg-card-dark rounded-xl border border-success/20 overflow-hidden">
        <Header title="Safest Protocols" color="success" icon="verified_user" />
        <div className="divide-y divide-border-dark">
          <Row
            name="Aave V3"
            meta="Audited • Stable TVL"
            score="9.8/10"
            tvl="$4.2B"
          />
          <Row
            name="Compound V3"
            meta="Audited • Low Volatility"
            score="9.6/10"
            tvl="$2.1B"
          />
          <Row
            name="Uniswap V3"
            meta="Battle-tested"
            score="9.5/10"
            tvl="$3.8B"
          />
        </div>
      </div>

      {/* Riskiest */}
      <div className="bg-card-dark rounded-xl border border-danger/20 overflow-hidden">
        <Header title="Riskiest Protocols" color="danger" icon="warning" />
        <div className="divide-y divide-border-dark">
          <Row
            name="X-Yield"
            meta="Whale Concentration"
            score="2.1/10"
            tvl="$12M"
            danger
          />
          <Row
            name="FastSwap"
            meta="Sudden TVL Drop"
            score="3.4/10"
            tvl="$5M"
            danger
          />
          <Row
            name="MoonBase"
            meta="Unaudited Contract"
            score="3.8/10"
            tvl="$1.2M"
            danger
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- helpers ---------- */

function Header({
  title,
  color,
  icon,
}: {
  title: string;
  color: "success" | "danger";
  icon: string;
}) {
  return (
    <div
      className={`bg-${color}/5 px-5 py-3 border-b border-${color}/10 flex justify-between`}
    >
      <h3 className={`font-bold text-${color} flex gap-2`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        {title}
      </h3>
      <span
        className={`text-xs bg-${color}/10 text-${color} px-2 py-1 rounded`}
      >
        Top 5
      </span>
    </div>
  );
}

function Row({
  name,
  meta,
  score,
  tvl,
  danger,
}: {
  name: string;
  meta: string;
  score: string;
  tvl: string;
  danger?: boolean;
}) {
  return (
    <div className="px-5 py-3 flex justify-between hover:bg-border-dark/30 transition-colors">
      <div>
        <p className={`font-bold ${danger ? "text-danger" : "text-white"}`}>
          {name}
        </p>
        <p className="text-xs text-text-secondary">{meta}</p>
      </div>
      <div className="text-right">
        <span
          className={`block font-mono font-bold text-sm ${
            danger ? "text-danger" : "text-success"
          }`}
        >
          {score}
        </span>
        <span className="text-xs text-text-secondary">{tvl}</span>
      </div>
    </div>
  );
}
