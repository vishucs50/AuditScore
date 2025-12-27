export default function Solution() {
  return (
    <section className="py-20 bg-surface-dark border-y border-surface-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: VISUAL */}
          <div className="order-2 lg:order-1">
            <div
              className="relative rounded-2xl overflow-hidden border border-surface-border shadow-2xl bg-background-dark aspect-video"
              aria-label="Abstract visualization of data nodes connecting to form a shield"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2532&auto=format&fit=crop')",
                }}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-background-dark via-transparent to-transparent" />

              {/* Floating data card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-background-dark/90 backdrop-blur border border-surface-border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary">
                    hub
                  </span>
                  <span className="text-white font-bold text-sm">
                    Risk Signal Sources
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-surface-border rounded text-[10px] text-gray-300 font-mono">
                    Input: AuditReports
                  </span>
                  <span className="px-2 py-1 bg-surface-border rounded text-[10px] text-gray-300 font-mono">
                    Input: GitHub
                  </span>
                  <span className="px-2 py-1 bg-surface-border rounded text-[10px] text-gray-300 font-mono">
                    Input: DefiLlama
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">
                ssid_chart
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Transparent DeFi Risk Scoring
            </h2>

            <p className="text-text-secondary text-lg">
              AuditScore transforms publicly available on-chain data and audit
              information into a single, explainable risk score. Each score
              reflects protocol security practices, capital stability, and
              exposure to systemic risk—helping users make informed DeFi
              decisions beyond raw APY.
            </p>

            <ul className="space-y-4 mt-4">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 mt-1">
                  check_circle
                </span>
                <div>
                  <h4 className="text-white font-bold">
                    Explainable Risk Signals
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Each risk score is composed of clearly defined metrics such
                    as audit quality, TVL stability, and whale concentration.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 mt-1">
                  check_circle
                </span>
                <div>
                  <h4 className="text-white font-bold">
                    Transparent Methodology
                  </h4>
                  <p className="text-sm text-text-secondary">
                    Users can see exactly why a protocol scores high or low—no
                    black-box ratings or hidden assumptions.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-green-500 mt-1">
                  check_circle
                </span>
                <div>
                  <h4 className="text-white font-bold">
                    Data-Driven Evaluation
                  </h4>
                  <p className="text-sm text-text-secondary">
                    All scores are derived from publicly available on-chain data
                    and documented audit information.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
