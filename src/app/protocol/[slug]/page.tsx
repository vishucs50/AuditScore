"use client"
import Navbar from "./components/Navbar";
import ContextBar from "./components/ContextBar";
import Hero from "./components/Hero";
import RiskBreakdown from "./components/RiskBreakDown";
import { useState,useEffect } from "react";
import { useParams } from "next/navigation";
export default function DashboardPage() {
  const { slug } = useParams();
  const [protocol, setProtocol] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(slug);
  useEffect(() => {
    fetch(`/api/protocols/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setProtocol(data);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!protocol) return <div className="p-10">Protocol not found</div>;

  console.log(protocol);

  return (
    <>
      <Navbar />
      <main className="flex-1 overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-8">
          <ContextBar />
          <Hero />
          <RiskBreakdown  />
        </div>
      </main>
    </>
  );
}