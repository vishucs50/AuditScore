const stats = [
  {
    icon: "lock",
    label: "Total Value Locked",
    value: "$42.5B",
    trend: "+5.2% this week",
    trendColor: "text-[#0bda5e]",
  },
  {
    icon: "verified_user",
    label: "Protocols Audited",
    value: "156",
    trend: "12 new listings",
    trendColor: "text-[#0bda5e]",
  },
  {
    icon: "shield",
    label: "Avg Risk Score",
    value: "72/100",
    trend: "+2.1% safety rating",
    trendColor: "text-[#0bda5e]",
  },
  {
    icon: "warning",
    label: "High Risk Alerts",
    value: "12",
    trend: "-3 from last month",
    trendColor: "text-[#fa6238]",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex flex-col gap-1 rounded-xl p-5 border border-[#324467] bg-[#161e2c]"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[#92a4c9] text-xl">
              {s.icon}
            </span>
            <p className="text-[#92a4c9] text-sm font-medium">{s.label}</p>
          </div>

          <p className="text-white text-2xl font-bold">{s.value}</p>

          <div
            className={`flex items-center gap-1 text-xs font-medium ${s.trendColor}`}
          >
            <span className="material-symbols-outlined text-sm">
              {s.trend.startsWith("-") ? "arrow_downward" : "trending_up"}
            </span>
            <span>{s.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
