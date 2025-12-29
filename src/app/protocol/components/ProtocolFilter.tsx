"use client";

import { useState } from "react";

export default function ProtocolFilters() {
  const [risk, setRisk] = useState("all");

  return (
    <div className="flex flex-col gap-4">
      {/* Search + Selects Row */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#92a4c9]">
            search
          </span>
          <input
            className="w-full bg-card-dark border border-[#324467] rounded-lg h-12 pl-12 pr-4 text-white placeholder:text-[#92a4c9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search protocols..."
          />
        </div>

        {/* Selects */}
        <div className="flex gap-4">
          <Select icon="expand_more">
            <option>All Chains</option>
            <option>Ethereum</option>
            <option>Solana</option>
            <option>Arbitrum</option>
            <option>Optimism</option>
          </Select>

          <Select icon="sort">
            <option>Sort by: TVL</option>
            <option>Sort by: Risk Score</option>
            <option>Sort by: APY</option>
          </Select>
        </div>
      </div>

      {/* Risk Chips */}
      <div className="flex flex-wrap gap-2">
        {["all", "low", "medium", "high"].map((r) => (
          <button
            key={r}
            onClick={() => setRisk(r)}
            className={`flex items-center h-8 px-4 rounded-full text-sm font-medium transition-colors
              ${
                risk === r
                  ? "bg-primary text-white"
                  : "bg-border-dark text-[#92a4c9] hover:text-white hover:bg-[#324467]"
              }`}
          >
            {r !== "all" && (
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  r === "low"
                    ? "bg-[#0bda5e]"
                    : r === "medium"
                    ? "bg-[#ffc107]"
                    : "bg-[#fa6238]"
                }`}
              />
            )}
            {r === "all"
              ? "All Risks"
              : `${r[0].toUpperCase()}${r.slice(1)} Risk`}
          </button>
        ))}
      </div>
    </div>
  );
}

function Select({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: string;
}) {
  return (
    <div className="relative min-w-45">
      <select className="appearance-none w-full bg-card-dark border border-[#324467] rounded-lg h-12 pl-4 pr-10 text-white focus:outline-none focus:border-primary cursor-pointer">
        {children}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#92a4c9] pointer-events-none">
        {icon}
      </span>
    </div>
  );
}
