"use client";

import { useEffect, useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useRouter } from "next/navigation";

type ProtocolRisk = {
  name: string;
  slug: string;
  finalRiskScore: {
    score: number;
  } | null;
  risk: string;
  color: string;
};

type ChartPoint = ProtocolRisk & {
  index: number;
};

export default function ProtocolRiskDotChart() {
  const [data, setData] = useState<ChartPoint[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProtocols() {
      const res = await fetch("/api/protocols", { cache: "no-store" });
      const json: ProtocolRisk[] = await res.json();

      const mapped = json
        .filter((p) => p.finalRiskScore?.score !== null)
        .map((p, index) => ({
          ...p,
          index,
        }));

      setData(mapped);
    }

    fetchProtocols();
  }, []);

  return (
    <section className="bg-card-dark border border-border-dark rounded-xl p-6 m-4">
      <h2 className="text-lg font-bold mb-2">Protocol Risk Distribution</h2>
      <p className="text-text-secondary text-sm mb-4">
        Click a dot to view protocol details
      </p>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <XAxis
              dataKey="index"
              name="Protocol"
              tick={false}
              axisLine={false}
            />
            <YAxis
              dataKey="finalRiskScore.score"
              domain={[0, 100]}
              stroke="#64748b"
              fontSize={12}
              name="Risk Score"
            />

            <Tooltip
              cursor={{ stroke: "#60a5fa", strokeWidth: 1.5 }}
              content={<ProtocolRiskTooltip />}
            />

            <Scatter
              data={data}
              shape="circle"
              onClick={(data) => {
                router.push(`/protocol/${data.slug}`);
              }}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
function ProtocolRiskTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) {
  if (!active || !payload || !payload.length) return null;

  const p = payload[0].payload as ChartPoint;

  return (
    <div
      className="rounded-xl px-4 py-3 border"
      style={{
        backgroundColor: "#020617",
        borderColor: p.color,
        boxShadow: `0 0 30px ${p.color}55`,
        minWidth: 180,
      }}
    >
      <div className="font-semibold text-white text-sm mb-1">{p.name}</div>

      <div className="text-xs text-text-secondary mb-2">{p.risk}</div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-text-secondary">Risk Score</span>
        <span className="text-lg font-bold" style={{ color: p.color }}>
          {p.finalRiskScore?.score}
        </span>
      </div>
    </div>
  );
}
