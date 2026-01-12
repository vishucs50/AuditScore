"use client"
import { Protocol } from "@/lib/models/protocols";
import ProtocolSelectors from "./components/ProtocolSelectors";
import SummarySection from "./components/SummarySection";
import ComparisonTable from "./components/ComparisonTable";
import { useEffect,useState } from "react";

export default function Page() {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [protocolA, setProtocolA] = useState<Protocol | null>(null);
  const [protocolB, setProtocolB] = useState<Protocol | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch("/api/protocols")
      .then((res) => res.json())
      .then((data) => {
        setProtocols(data);
        setProtocolA(data[0]);
        setProtocolB(data[1]);
        setLoading(false);
      });
  }, []);

  if (loading || !protocolA || !protocolB)
    return <div className="p-10">Loading...</div>;

  return (
    <div className="layout-container">
      <ProtocolSelectors
        protocols={protocols}
        protocolA={protocolA}
        protocolB={protocolB}
        setProtocolA={setProtocolA}
        setProtocolB={setProtocolB}
      />

      <SummarySection protocolA={protocolA} protocolB={protocolB} />

      <ComparisonTable protocolA={protocolA} protocolB={protocolB} />
    </div>
  );
}
