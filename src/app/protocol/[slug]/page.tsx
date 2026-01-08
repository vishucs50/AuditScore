"use client"
import Navbar from "./components/Navbar";
import ContextBar from "./components/ContextBar";
import Hero from "./components/Hero";
import RiskBreakdown from "./components/RiskBreakDown";
import { useState,useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";

 type Protocol = {
   // ── Protocol identity ─────────────────────
   name: string;
   slug: string;
   category: string;
   icon: string;
   description: string;

   // ── Metadata ──────────────────────────────
   chains: string[];
   audits: number;

   // ── Chain context ─────────────────────────
   selectedChain: string | null;

   // ── Chain metrics ─────────────────────────
   tvl: number;
   avgApy: number | null;
   rewardApy: number | null;

   // ── Risk metrics (protocol-level) ─────────
   tvlStability: {
     score: number;
     summary: string;
     level: string;
   };

   auditRisk: {
     score: number;
     summary: string;
     factor: string[];
   };
   finalRiskScore: number | null;
   risk: "Low Risk" | "Moderate Risk" | "High Risk" | "Unknown";
   color: string;
 };

export default function DashboardPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const chain = searchParams.get("chain");
  const [protocol, setProtocol] = useState(null);
  const [protocols, setProtocols] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/protocols/${slug}${chain ? `?chain=${chain}` : ""}`)
      .then((res) => res.json())
      .then((data) => {
        setProtocol(data);
        setLoading(false);
        console.log(data);
      });
      fetch("/api/protocols")
        .then((res) => res.json())
        .then((data) => {
          setProtocols(data);
          setLoading(false);
        });
  }, [slug,chain]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!protocol) return <div className="p-10">Protocol not found</div>;

  return (
    <>
      <Navbar protocols={protocols}/>
      <main className="flex-1 overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-8">
          <ContextBar protocol={protocol}/>
          <Hero protocol={protocol}/>
          <RiskBreakdown protocol={protocol} />
        </div>
      </main>
    </>
  );
}