const chains = [
  { name: "Ethereum", score: 4.1, risk: "Low", color: "success" },
  { name: "BSC", score: 6.9, risk: "Medium", color: "warning" },
  { name: "Fantom", score: 8.2, risk: "High", color: "danger" },
];

export default function ChainSnapshot() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold mb-4">Chain Risk Snapshot</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {chains.map((c) => (
          <div
            key={c.name}
            className="bg-card-dark border border-border-dark rounded-lg p-3"
          >
            <p className="font-medium">{c.name}</p>
            <p className="text-2xl font-bold">{c.score}</p>
            <p className={`text-${c.color} text-xs`}>{c.risk} Risk</p>
          </div>
        ))}
      </div>
    </section>
  );
}
