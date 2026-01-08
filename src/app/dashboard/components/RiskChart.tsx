export default function RiskChart() {
  return (
    <section className="bg-card-dark border border-border-dark rounded-xl p-6 m-3">
      <h2 className="text-lg font-bold mb-2">DeFi Risk Over Time</h2>
      <p className="text-text-secondary text-sm mb-4">
        Historical risk index fluctuation
      </p>

      <svg className="w-full h-64">
        <path
          d="M0 180 C 100 170, 200 190, 300 150 C 400 110, 500 130, 600 100"
          stroke="#60a5fa"
          strokeWidth="3"
          fill="none"
        />
      </svg>
    </section>
  );
}
