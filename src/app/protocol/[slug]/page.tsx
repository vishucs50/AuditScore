"use client"
import Navbar from "./components/Navbar";
import ContextBar from "./components/ContextBar";
import Hero from "./components/Hero";
import RiskBreakdown from "./components/RiskBreakDown";
export default function DashboardPage() {
  return (
    <>
      <Navbar />
      {/* ================= MAIN ================= */}
      <main className="flex-1 overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col max-w-7xl mx-auto px-4 md:px-8 lg:px-10 py-8">
            <ContextBar/>
            <Hero/>
            <RiskBreakdown/>
        </div>
      </main>

     
    </>
  );
}
