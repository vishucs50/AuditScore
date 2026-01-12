"use client";

import { Protocol } from "@/lib/models/protocols";
import { useEffect, useState } from "react";

import ProtocolSelectors from "./components/ProtocolSelectors";
import SummarySection from "./components/SummarySection";
import ComparisonTable from "./components/ComparisonTable";

// ✅ Skeletons
import ProtocolSelectorsSkeleton from "./components/skeletons/ProtocolSelectorsSkeleton";
import ComparisonTableSkeleton from "./components/skeletons/ComparsionTableSkeleton";
import SummarySectionSkeleton from "./components/skeletons/SummarySectionSkeleton";
export default function Page() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [protocolA, setProtocolA] = useState<Protocol | null>(null);
  const [protocolB, setProtocolB] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/protocols")
      .then((res) => res.json())
      .then((data: Protocol[]) => {
        setProtocols(data);
        setProtocolA(data[0] ?? null);
        setProtocolB(data[1] ?? null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="layout-container">
      {/* ======================
          LOADING STATE
         ====================== */}
      {loading || !protocolA || !protocolB ? (
        <>
          <ProtocolSelectorsSkeleton />
          <SummarySectionSkeleton />
          <ComparisonTableSkeleton />
        </>
      ) : (
        <>
          {/* ======================
              DATA STATE
             ====================== */}
          <ProtocolSelectors
            protocols={protocols}
            protocolA={protocolA}
            protocolB={protocolB}
            setProtocolA={setProtocolA}
            setProtocolB={setProtocolB}
          />

          <SummarySection protocolA={protocolA} protocolB={protocolB} />

          <ComparisonTable protocolA={protocolA} protocolB={protocolB} />
        </>
      )}
    </div>
  );
}
