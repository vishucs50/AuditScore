"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Protocol } from "@/lib/models/protocols";

type NavbarProps = {
  protocols: Protocol[];
};

export default function Navbar({ protocols }: NavbarProps) {
  const [query, setQuery] = useState("");

  const filtered =
    query.length > 0
      ? protocols.filter((p) =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <header className="sticky top-0 z-50 bg-[#111722] border-b border-border-dark px-6 lg:px-10 py-3">
      <div className="flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-4 text-white">
          <div className="size-8 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">
              shield_lock
            </span>
          </div>
          <h2 className="text-xl font-bold tracking-tight">AuditScore</h2>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/methodology" className="text-gray-300 hover:text-white text-sm">
            Methodology
          </Link>
          <Link href="/compare" className="text-gray-300 hover:text-white text-sm">
            Compare
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white text-sm">
            Dashboard
          </Link>
        </nav>

        {/* Search */}
        <div className="relative w-full max-w-xs hidden md:block">
          <div className="flex items-center h-11 rounded-lg bg-card-dark border border-[#324467] focus-within:ring-1 ring-primary/50">
            <span className="material-symbols-outlined text-[#92a4c9] pl-3">
              search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search protocols..."
              className="w-full h-full bg-transparent pl-3 pr-4 text-sm text-white placeholder:text-[#92a4c9] focus:outline-none"
            />
          </div>

          {/* Dropdown */}
          {filtered.length > 0 && (
            <div className="absolute mt-2 w-full bg-card-dark border border-[#324467] rounded-xl shadow-xl max-h-72 overflow-y-auto">
              {filtered.slice(0, 6).map((p) => (
                <Link
                  key={p.slug}
                  href={`/protocol/${p.slug}`}
                  onClick={() => setQuery("")}
                  className="flex items-center justify-between px-4 py-3 hover:bg-[#1f2a40] transition"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={p.icon || "/placeholder.png"}
                      alt={p.name}
                      width={24}
                      height={24}
                      className="shrink-0"
                    />
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-medium">
                        {p.name}
                      </span>
                      <span className="text-xs text-[#92a4c9]">
                        TVL ${(Number(p.tvl) / 1e9).toFixed(2)}B
                      </span>
                    </div>
                  </div>

                  <span className="text-sm font-bold text-primary">
                    {p.finalRiskScore.score}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
