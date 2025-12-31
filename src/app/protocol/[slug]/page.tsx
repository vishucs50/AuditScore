"use client"
import Navbar from "./components/Navbar";
import ContextBar from "./components/ContextBar";
import Hero from "./components/Hero";
import RiskBreakdown from "./components/RiskBreakDown";
import { useState,useEffect } from "react";
import { useParams } from "next/navigation";
import { Protocol } from "@/lib/models/protocols";
export default function DashboardPage() {
  const { slug } = useParams();
  const [protocol, setProtocol] = useState(null);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/protocols/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProtocol(data);
        setLoading(false);
      });
      fetch("/api/protocols")
        .then((res) => res.json())
        .then((data) => {
          setProtocols(data);
          setLoading(false);
        });
  }, [slug]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!protocol) return <div className="p-10">Protocol not found</div>;

  console.log(protocol);

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