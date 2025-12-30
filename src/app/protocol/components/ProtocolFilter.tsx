"use client";
import { Protocol } from "@/lib/models/protocols";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function ProtocolFilters({
  protocols,
}: {
  protocols: Protocol[];
}) {
  const [risk, setRisk] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = query.length
    ? protocols.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];
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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-card-dark border border-[#324467] rounded-lg h-12 pl-12 pr-4 text-white placeholder:text-[#92a4c9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            placeholder="Search protocols..."
          />
          {filtered.length > 0 && (
            <div className="absolute z-50 mt-2 w-full bg-card-dark border border-[#324467] rounded-xl shadow-xl max-h-64 overflow-y-auto">
              {filtered.slice(0, 6).map((p) => (
                <Link
                  key={p.slug}
                  href={`/protocol/${p.slug}`}
                  className="flex items-center justify-between px-4 py-3 hover:bg-[#1f2a40] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Protocol Icon */}
                    <Image
                      src={p.icon}
                      alt={`${p.name} icon`}
                      width={24}
                      height={24}
                      className="object-contain shrink-0"
                      style={{
                        filter: `drop-shadow(0 0 4px ${p.color})`,
                      }}
                    />

                    {/* Name + TVL */}
                    <div className="flex flex-col">
                      <p className="text-white font-medium leading-tight">
                        {p.name}
                      </p>
                      <p className="text-xs text-[#92a4c9]">
                        TVL ${(p.tvl / 1e9).toFixed(2)}B
                      </p>
                    </div>
                  </div>

                  {/* Risk Score */}
                  <span className="text-sm font-bold text-primary">
                    {p.finalRiskScore}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Selects */}
        <div className="flex gap-4">
          <Select icon="sort">
            <option>Sort by: TVL</option>
            <option>Sort by: Risk Score</option>
          </Select>
        </div>
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
