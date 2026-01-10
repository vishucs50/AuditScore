"use client";
import Link from "next/link";
import { Protocol } from "@/lib/models/protocols";


export default function ProtocolTables({
  protocols,
}: {
  protocols: Protocol[];
}) {
  const valid = protocols.filter(
    (p) => typeof p.finalRiskScore?.score === "number"
  );

  const riskiest = [...valid]
    .sort((a, b) => a.finalRiskScore!.score - b.finalRiskScore!.score)
    .slice(0, 5);

  const safest = [...valid]
    .sort((a, b) => b.finalRiskScore!.score - a.finalRiskScore!.score)
    .slice(0, 5);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Safest */}
      <Table
        title="Safest Protocols"
        color="success"
        icon="verified_user"
        protocols={safest}
      />

      {/* Riskiest */}
      <Table
        title="Riskiest Protocols"
        color="danger"
        icon="warning"
        protocols={riskiest}
        danger
      />
    </section>
  );
}

function Table({
  title,
  color,
  icon,
  protocols,
  danger,
}: {
  title: string;
  color: "success" | "danger";
  icon: string;
  protocols: Protocol[];
  danger?: boolean;
}) {
  return (
    <div
      className={`bg-card-dark rounded-xl border border-${color}/20 overflow-hidden`}
    >
      <Header title={title} color={color} icon={icon} />

      <div className="divide-y divide-border-dark">
        {protocols.map((p) => (
          <Row
            key={p.name}
            name={p.name}
            meta={p.finalRiskScore?.factors.join(" • ") ?? "No risk data"}
            score={`${((p.finalRiskScore?.score ?? 100) / 10).toFixed(1)}/10`}
            tvl={`$${(p.tvl / 1e9).toFixed(2)}B`}
            danger={danger}
            href={`/protocol/${p.slug}`}
          />
        ))}
      </div>
    </div>
  );
}
function Header({
  title,
  color,
  icon,
}: {
  title: string;
  color: "success" | "danger";
  icon: string;
}) {
  return (
    <div
      className={`bg-${color}/5 px-5 py-3 border-b border-${color}/10 flex justify-between`}
    >
      <h3 className={`font-bold text-${color} flex gap-2`}>
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
        {title}
      </h3>
      <span
        className={`text-xs bg-${color}/10 text-${color} px-2 py-1 rounded`}
      >
        Top 5
      </span>
    </div>
  );
}

function Row({
  name,
  meta,
  score,
  tvl,
  danger,
  href,
}: {
  name: string;
  meta: string;
  score: string;
  tvl: string;
  danger?: boolean;
  href: string;
}) {
  return (
    <Link href={href} className="block">
      <div className="px-5 py-3 flex justify-between hover:bg-border-dark/30 transition-colors cursor-pointer">
        <div>
          <p className={`font-bold ${danger ? "text-danger" : "text-white"}`}>
            {name}
          </p>
          <p className="text-xs text-text-secondary">{meta}</p>
        </div>
        <div className="text-right">
          <span
            className={`block font-mono font-bold text-sm ${
              danger ? "text-danger" : "text-success"
            }`}
          >
            {score}
          </span>
          <span className="text-xs text-text-secondary">{tvl}</span>
        </div>
      </div>
    </Link>
  );
}
