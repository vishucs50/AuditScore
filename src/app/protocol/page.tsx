"use client"
import ListProtocol from "./components/ListProtocol";
import Navbar from "../(landing)/components/Navbar";
import StatsGrid from "./components/GlobalStats";
import ProtocolFilters from "./components/ProtocolFilter";
import { useState,useEffect } from "react";
import { Protocol } from "@/lib/models/protocols";
import { computeGlobalStats } from "@/lib/utils/computeGlobalStats";


export default function ProtocolsPage() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [sortBy, setSortBy] = useState<"risk" | "tvl">("risk");
  const [loading,setLoading]= useState(true);
  useEffect(() => {
    fetch("/api/protocols")
    .then((res) => res.json())
    .then((data) => {
      setProtocols(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div>Loading protocols...</div>;
  }
  const stats = computeGlobalStats(protocols);
  console.log(stats);
  return (
    <>
      {/* <Navbar />   */}

      <main className="flex-1 w-full flex justify-center py-8">
        {/* Heading */}
        <div className="w-full max-w-7xl px-6 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-5xl font-black">Protocol Explorer</h1>
              <p className="text-[#92a4c9] max-w-2xl mt-2">
                Browse real-time risk scores, audit history, and security
                breakdowns for the top DeFi protocols across all chains.
              </p>
            </div>
            <StatsGrid
              totalTVL={stats.totalTVL}
              auditedCount={stats.auditedCount}
              avgRiskScore={stats.avgRiskScore}
              highRiskCount={stats.highRiskCount}
            />
          </div>
          <ProtocolFilters
            protocols={protocols}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
          <ListProtocol protocols={protocols} sortBy={sortBy} />
        </div>
      </main>
    </>
  );
}
