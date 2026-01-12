"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Protocol } from "@/lib/models/protocols";
import ConnectWallet from "./ConnectWallet";
type NavbarProps = {
  protocols: Protocol[];
};

export default function Navbar({ protocols }: NavbarProps) {
  const pathname = usePathname();

  // -------------------------
  // Search State
  // -------------------------
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return [];
    return protocols.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, protocols]);

  // -------------------------
  // Route Guards
  // -------------------------
  const isProtocolDetail =
    pathname.startsWith("/protocol/") && pathname !== "/protocol";

  // -------------------------
  // Active link helper
  // -------------------------
  const navLinkClass = (href: string) =>
    `text-sm transition ${
      pathname === href
        ? "text-white font-semibold"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-background-dark/80 backdrop-blur-md">
      <div className="px-4 md:px-10 py-3 mx-auto max-w-7xl flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-3 text-white shrink-0">
          <div className="size-8 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">
              shield_lock
            </span>
          </div>
          <h2 className="text-lg font-bold tracking-tight">AuditScore</h2>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/methodology" className={navLinkClass("/methodology")}>
            Methodology
          </Link>
          <Link href="/compare" className={navLinkClass("/compare")}>
            Compare
          </Link>
          <Link href="/dashboard" className={navLinkClass("/dashboard")}>
            Dashboard
          </Link>
        </nav>

        {/* CTA Buttons */}
        {pathname === "/" && (
          <Link
            href="/protocol"
            className="bg-primary hover:bg-blue-800 text-white text-sm font-bold h-9 px-5 rounded-lg shadow-lg shadow-blue-900/20 inline-flex items-center justify-center"
          >
            Explore Protocol Risks
          </Link>
        )}
        {pathname === "/dashboard" && (
          <ConnectWallet/>
          
        )}

        {pathname === "/protocol" && (
          <Link
            href="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold h-9 px-5 rounded-lg shadow-lg shadow-green-900/20 inline-flex items-center justify-center"
          >
            Go to Dashboard
          </Link>
        )}
        {pathname === "/compare" && (
          <Link
            href="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold h-9 px-5 rounded-lg shadow-lg shadow-green-900/20 inline-flex items-center justify-center"
          >
            Go to Dashboard
          </Link>
        )}
        {pathname === "/methodology" && (
          <Link
            href="/dashboard"
            className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold h-9 px-5 rounded-lg shadow-lg shadow-green-900/20 inline-flex items-center justify-center"
          >
            Go to Dashboard
          </Link>
        )}

        {/* Search (ONLY on /protocol/[slug]) */}
        {isProtocolDetail && (
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

            {query && filtered.length > 0 && (
              <div className="absolute mt-2 w-full bg-card-dark border border-[#324467] rounded-xl shadow-xl max-h-72 overflow-y-auto z-50">
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
                      />
                      <div>
                        <div className="text-white text-sm font-medium">
                          {p.name}
                        </div>
                        <div className="text-xs text-[#92a4c9]">
                          TVL ${(Number(p.tvl) / 1e9).toFixed(2)}B
                        </div>
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
        )}
      </div>
    </header>
  );
}
