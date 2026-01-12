import { Protocol } from "@/lib/models/protocols";

/* =======================
   TYPES
======================= */

type ComparisonTableProps = {
  protocolA: Protocol;
  protocolB: Protocol;
};

type MetricValue = {
  value: number;
  display?: number;
  summary?: string;
};

type MetricRowProps = {
  label: string;
  icon: string;
  unit?: string;
  a: MetricValue;
  b: MetricValue;
  color?: string;
};

/* =======================
   UI COMPONENTS
======================= */

function ProgressBar({
  value,
  color = "bg-primary",
}: {
  value: number;
  color?: string;
}) {
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
      <div
        className={`${color} h-1.5 rounded-full transition-all duration-300`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}

function MetricCell({
  metric,
  unit,
  color,
}: {
  metric: MetricValue;
  unit: string;
  color?: string;
}) {
  return (
    <div className="col-span-4 border-l border-gray-200 dark:border-gray-700 pl-4">
      <div className="flex flex-col gap-1">
        <span className="text-slate-900 dark:text-white font-bold text-sm">
          {metric.display ?? metric.value}
          {unit}
        </span>

        <ProgressBar value={metric.value} color={color} />

        {metric.summary && (
          <span className="text-xs text-text-secondary">{metric.summary}</span>
        )}
      </div>
    </div>
  );
}

function MetricRow({ label, icon, unit = "%", a, b, color }: MetricRowProps) {
  const diff = Math.abs(a.value - b.value).toFixed(1);

  return (
    <div className="group border-b border-gray-200 dark:border-border-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
      <div className="grid grid-cols-12 gap-4 p-4 items-start">
        {/* Metric name */}
        <div className="col-span-4 md:col-span-3 flex items-center gap-2">
          <span className="material-symbols-outlined text-text-secondary">
            {icon}
          </span>
          <span className="text-slate-900 dark:text-white font-medium text-sm">
            {label}
          </span>
        </div>

        {/* Protocol A */}
        <MetricCell metric={a} unit={unit} color={color} />

        {/* Protocol B */}
        <MetricCell metric={b} unit={unit} color={color} />

        {/* Diff */}
        <div className="hidden md:flex md:col-span-1 items-center justify-center">
          <span className="text-xs font-bold text-text-secondary">{diff}%</span>
        </div>
      </div>
    </div>
  );
}

/* =======================
   MAIN COMPONENT
======================= */

export default function ComparisonTable({
  protocolA,
  protocolB,
}: ComparisonTableProps) {
  return (
    <div className="mt-4 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
      {/* HEADER */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-[#151b26] border-b border-gray-200 dark:border-border-dark text-xs font-bold uppercase tracking-wider sticky top-0 z-10">
        <div className="col-span-4 md:col-span-3">Metric</div>
        <div className="col-span-4 border-l pl-4">{protocolA.name}</div>
        <div className="col-span-4 border-l pl-4">{protocolB.name}</div>
        <div className="hidden md:block md:col-span-1 text-center">Diff</div>
      </div>

      {/* AUDIT SCORE */}
      <MetricRow
        label="Audit Score"
        icon="gavel"
        a={{
          value: protocolA.auditRisk.score,
          summary: protocolA.auditRisk.summary,
        }}
        b={{
          value: protocolB.auditRisk.score,
          summary: protocolB.auditRisk.summary,
        }}
        color="bg-risk-low"
      />

      {/* LIQUIDITY */}
      <MetricRow
        label="Liquidity Utilization"
        icon="water_drop"
        a={{
          value: protocolA.liquidityRisk.score,
          summary: protocolA.liquidityRisk.summary,
        }}
        b={{
          value: protocolB.liquidityRisk.score,
          summary: protocolB.liquidityRisk.summary,
        }}
        color="bg-primary"
      />

      {/* COMPOSABILITY */}
      <MetricRow
        label="Composability Risk"
        icon="show_chart"
        a={{
          value: protocolA.dependencyRisk.score,
          summary: protocolA.dependencyRisk.summary,
        }}
        b={{
          value: protocolB.dependencyRisk.score,
          summary: protocolB.dependencyRisk.summary,
        }}
        color="bg-risk-medium"
      />

      {/* WHALE CONCENTRATION */}
      <MetricRow
        label="Whale Concentration"
        icon="group"
        a={{
          value: protocolA.whaleConcentration.score,
          summary: protocolA.whaleConcentration.summary,
        }}
        b={{
          value: protocolB.whaleConcentration.score,
          summary: protocolB.whaleConcentration.summary,
        }}
        color="bg-risk-high"
      />

      {/* PROTOCOL MATURITY (NO SPECIAL LOGIC) */}
      <MetricRow
        label="Protocol Maturity"
        icon="history"
        a={{
          value: protocolA.protocolMaturity.score,
          display: protocolA.protocolMaturity.score,
          summary: protocolA.protocolMaturity.summary,
        }}
        b={{
          value: protocolB.protocolMaturity.score,
          display: protocolB.protocolMaturity.score,
          summary: protocolB.protocolMaturity.summary,
        }}
        color="bg-emerald-500"
      />
    </div>
  );
}
