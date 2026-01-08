"use client";

type StatsGridProps = {
  totalTVL: number;
  auditedCount: number;
  avgRiskScore: number;
  highRiskCount: number;
};

export default function StatsGrid({
  totalTVL,
  auditedCount,
  avgRiskScore,
  highRiskCount,
}: StatsGridProps) {
  const stats = [
    {
      icon: "lock",
      label: "Total Value Locked",
      value: `$${(totalTVL / 1e9).toFixed(1)}B`,
      trendValue: 5.2,
    },
    {
      icon: "verified_user",
      label: "Protocols Audited",
      value: auditedCount.toString(),
      trendValue: 12,
    },
    {
      icon: "shield",
      label: "Avg Risk Score",
      value: `${avgRiskScore}/100`,
      trendValue: 2.1,
    },
    {
      icon: "warning",
      label: "High Risk Alerts",
      value: highRiskCount.toString(),
      trendValue: -3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => {
        const isPositive = s.trendValue >= 0;
        const trendColor = isPositive ? "text-[#0bda5e]" : "text-[#fa6238]";
        const trendIcon = isPositive ? "trending_up" : "trending_down";

        return (
          <div
            key={s.label}
            className="
              group relative overflow-hidden
              rounded-xl p-5 border border-[#324467]
              bg-linear-to-br from-[#161e2c] to-[#111827]
              transition-all duration-200
              hover:-translate-y-0.5 hover:border-[#3f5aa8]
            "
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-transparent via-[#3f5aa8]/10 to-transparent" />

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#92a4c9] text-xl">
                  {s.icon}
                </span>
                <p className="text-[#92a4c9] text-sm font-medium">{s.label}</p>
              </div>

              {/* Trend */}
              <div className={`flex items-center gap-1 text-xs ${trendColor}`}>
                <span className="material-symbols-outlined text-sm">
                  {trendIcon}
                </span>
                <span>{Math.abs(s.trendValue)}%</span>
              </div>
            </div>

            {/* Value */}
            <p className="text-white text-2xl font-bold tracking-tight">
              {s.value}
            </p>

          </div>
        );
      })}
    </div>
  );
}
