"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type AvgRiskPoint = {
  time: string;
  score: number;
};

export default function AvgRiskChart() {
  const [data, setData] = useState<AvgRiskPoint[]>([]);

  useEffect(() => {
    async function fetchAvgRisk() {
      const res = await fetch("/api/avg-risk-history");
      const json = await res.json();
      setData(json);
    }

    fetchAvgRisk();
  }, []);

  return (
    <section className="bg-card-dark border border-border-dark rounded-xl p-6 m-4 ">
      <h2 className="text-lg font-bold mb-2">Average Risk Over Time</h2>
      <p className="text-text-secondary text-sm mb-4">
        Ecosystem-wide risk trend
      </p>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
            <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#111722",
                border: "1px solid #324467",
                borderRadius: 6,
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#60a5fa"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
