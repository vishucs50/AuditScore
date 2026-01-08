const protocols = [
  {
    name: "Curve Finance",
    score: "8.5",
    tvl: "$3.1B",
    risk: "Safe",
    bar: "15%",
    color: "success",
  },
  {
    name: "SushiSwap",
    score: "6.2",
    tvl: "$450M",
    risk: "Caution",
    bar: "45%",
    color: "warning",
  },
  {
    name: "Degenerator",
    score: "2.1",
    tvl: "$800K",
    risk: "Danger",
    bar: "85%",
    color: "danger",
  },
  {
    name: "Balancer",
    score: "5.8",
    tvl: "$920M",
    risk: "Caution",
    bar: "30%",
    color: "warning",
  },
  {
    name: "Lido",
    score: "9.1",
    tvl: "$14B",
    risk: "Safe",
    bar: "10%",
    color: "success",
  },
  {
    name: "TerraClassic",
    score: "1.5",
    tvl: "$15M",
    risk: "Danger",
    bar: "95%",
    color: "danger",
  },
];

export default function ProtocolRiskMatrix() {
  return (
    <section>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Protocol Risk Matrix</h2>
        <button className="text-sm text-primary">View All →</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {protocols.map((p) => (
          <div
            key={p.name}
            className={`bg-card-dark rounded-xl p-4 border-l-4 border-${p.color} border-border-dark`}
          >
            <div className="flex justify-between mb-3">
              <h4 className="font-bold">{p.name}</h4>
              <span
                className={`bg-${p.color}/10 text-${p.color} text-xs px-2 py-1 rounded`}
              >
                {p.risk}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <Stat label="Risk Score" value={p.score} />
              <Stat label="TVL" value={p.tvl} />
            </div>

            <div>
              <span className="text-[10px] text-text-secondary uppercase">
                Volatility
              </span>
              <div className="w-full h-1 bg-[#111722] rounded overflow-hidden">
                <div
                  className={`h-full bg-${p.color}`}
                  style={{ width: p.bar }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[10px] text-text-secondary uppercase">{label}</span>
      <p className="font-mono">{value}</p>
    </div>
  );
}
