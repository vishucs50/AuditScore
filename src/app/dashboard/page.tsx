"use client"
import StatsGrid from "./components/GlobalStats";
import { useState,useEffect } from "react";
import { computeGlobalStats } from "@/lib/utils/computeGlobalStats";
import RiskChart from "./components/RiskChart";
import ChainSnapshot from "./components/ChainSnapshot";
import ProtocolTables from "./components/ProtocolTables";
import ProtocolRiskMatrix from "./components/ProtocolRiskMatrix";
import LiveRiskFeed from "./components/LiveRiskFeed";
import { Protocol } from "@/lib/models/protocols";
import RiskChartSkeleton from "./components/skeletons/RiskChartSkeleton";
import ChainSnapshotSkeleton from "./components/skeletons/ChainSnapshotSkeleton";
import ProtocolTablesSkeleton from "./components/skeletons/ProtocolTablesSkeleton";
import LiveRiskFeedSkeleton from "./components/skeletons/LiveRiskFeedSkeleton";
import StatsGridSkeleton from "./components/skeletons/StatsGridSkeleton";
  export default function DashboardPage() {
      const [protocols, setProtocols] = useState<Protocol[]>([]);
    const [loading,setLoading]= useState(true);
      useEffect(() => {
        
          fetch("/api/protocols")
            .then((res) => res.json())
            .then((data) => {
              setProtocols(data);
              setLoading(false);
            });
      }, []);
      const stats = computeGlobalStats(protocols);
     if (loading) {
       return (
         <div className="min-h-screen bg-background-dark">
           
           <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
             <StatsGridSkeleton />
             <RiskChartSkeleton />
             <ChainSnapshotSkeleton />

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2">
                 <ProtocolTablesSkeleton />
               </div>
               <LiveRiskFeedSkeleton />
             </div>
           </main>
         </div>
       );
     }
  return (
    <div className="min-h-screen bg-background-dark">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <StatsGrid
          totalTVL={stats.totalTVL}
          auditedCount={stats.auditedCount}
          avgRiskScore={stats.avgRiskScore}
          highRiskCount={stats.highRiskCount}
        />
        <RiskChart />
        <ChainSnapshot />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ProtocolTables protocols={protocols} />
            <ProtocolRiskMatrix protocols={protocols} />
          </div>

          <LiveRiskFeed />
        </div>
      </main>
    </div>
  );
}
