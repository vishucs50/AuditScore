"use client";

import { useEffect, useState } from "react";

type RiskEvent = {
  type: "danger" | "warning" | "success" | "primary";
  title: string;
  text: string;
  timestamp: string;
  source?: string;
};

const COLOR_MAP = {
  danger: {
    border: "border-[#ef4444]",
    text: "text-[#ef4444]",
  },
  warning: {
    border: "border-[#facc15]",
    text: "text-[#facc15]",
  },
  success: {
    border: "border-[#0bda5e]",
    text: "text-[#0bda5e]",
  },
  primary: {
    border: "border-primary",
    text: "text-primary",
  },
};

export default function LiveRiskFeed() {
  const [items, setItems] = useState<RiskEvent[]>([]);

  useEffect(() => {
    async function fetchFeed() {
      const res = await fetch("/api/live-risk");
      const data = await res.json();
      setItems(data);
    }

    fetchFeed();
    const id = setInterval(fetchFeed, 60_000); // every minute
    return () => clearInterval(id);
  }, []);

  return (
    <aside className="bg-card-dark rounded-xl border border-border-dark top-24 h-197">
      <div className="p-5 border-b border-border-dark flex justify-between">
        <h2 className="font-bold flex gap-2 items-center">
          <Ping /> Live Risk Feed
        </h2>
        <span className="text-xs text-text-secondary uppercase">Live News</span>
      </div>

      <div className="p-2 max-h-180 overflow-y-auto space-y-2">
        {items.map((i, idx) => (
          <Item key={idx} {...i} />
        ))}

        {items.length === 0 && (
          <p className="text-xs text-text-secondary p-3">No live alerts</p>
        )}
      </div>
    </aside>
  );
}

/* helpers */

function Ping() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
    </span>
  );
}

function Item({ type, title, text }: RiskEvent) {
  const color = COLOR_MAP[type];

  return (
    <div
      className={`p-3 rounded-lg border-l-2 ${color.border} hover:bg-border-dark/50`}
    >
      <p className={`text-xs font-bold ${color.text}`}>{title}</p>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
