"use client"

import { Protocol } from "@/lib/models/protocols";
import ProtocolSelectors from "./components/ProtocolSelectors";
import SummarySection from "./components/SummarySection";
import ComparisonTable from "./components/ComparisonTable";
import { useEffect,useState } from "react";
export default function Page() {
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
        if (loading) return <div className="p-10">Loading...</div>;
  return (
    <>
      {/* <Navbar protocols={protocols} /> */}

      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-12 xl:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w- flex-1">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 px-4 pb-4">
              <a className="text-text-secondary hover:text-white text-sm font-medium leading-normal transition-colors">
                Audits
              </a>
              <span className="text-text-secondary text-sm font-medium leading-normal">
                /
              </span>
              <span className="text-slate-900 dark:text-white text-sm font-medium leading-normal">
                Protocol Comparison
              </span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-4 px-4 pb-8">
              <div className="flex flex-col gap-2">
                <h1 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                  Protocol Comparison
                </h1>
                <p className="text-text-secondary text-base font-normal leading-normal max-w-xl">
                  Compare risk metrics, APY performance, and security audits
                  side-by-side to make informed decisions.
                </p>
              </div>
            </div>

            <ProtocolSelectors />
            <SummarySection />
            <ComparisonTable />
          </div>
        </div>
      </div>
    </>
  );
}
