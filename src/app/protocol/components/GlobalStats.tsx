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
      trendLabel: "this week",
    },
    {
      icon: "verified_user",
      label: "Protocols Audited",
      value: auditedCount.toString(),
      trendValue: 12,
      trendLabel: "new listings",
    },
    {
      icon: "shield",
      label: "Avg Risk Score",
      value: `${avgRiskScore}/100`,
      trendValue: 2.1,
      trendLabel: "safety rating",
    },
    {
      icon: "warning",
      label: "High Risk Alerts",
      value: highRiskCount.toString(),
      trendValue: -3,
      trendLabel: "from last month",
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
            className="flex flex-col gap-1 rounded-xl p-5 border border-[#324467] bg-[#161e2c]"
          >
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-[#92a4c9] text-xl">
                {s.icon}
              </span>
              <p className="text-[#92a4c9] text-sm font-medium">{s.label}</p>
            </div>

            {/* Value */}
            <p className="text-white text-2xl font-bold">{s.value}</p>

            {/* Trend */}
            <div
              className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}
            >
              <span className="material-symbols-outlined text-sm">
                {trendIcon}
              </span>
              <span>
                {isPositive ? "+" : ""}
                {s.trendValue} {s.trendLabel}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
