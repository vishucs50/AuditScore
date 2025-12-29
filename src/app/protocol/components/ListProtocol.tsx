import React from 'react'

function ListProtocol() {
  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-[#324467] bg-[#161e2c]">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#324467] bg-card-dark text-xs font-semibold text-[#92a4c9] uppercase tracking-wider">
          <div className="col-span-4 pl-2">Protocol</div>
          <div className="col-span-2">Chain</div>
          <div className="col-span-2">TVL / APY</div>
          <div className="col-span-2">Risk Summary</div>
          <div className="col-span-2 text-right pr-2">Score</div>
        </div>

        {/* List */}
        <div className="flex flex-col divide-y divide-border-dark">
          {/* === PROTOCOL ROW === */}
          {[
            {
              name: "Aave V3",
              desc: "Decentralized liquidity protocol for lending and borrowing.",
              chain: "Ethereum",
              tvl: "$12.4B",
              apy: "3.2% - 12.5%",
              score: "96/100",
              risk: "Low Risk",
              color: "#0bda5e",
              icon: "savings",
            },
            {
              name: "Curve Finance",
              desc: "AMMs for stablecoins and volatile assets.",
              chain: "Multi-Chain",
              tvl: "$3.8B",
              apy: "4.1% - 22%",
              score: "78/100",
              risk: "Medium Risk",
              color: "#ffc107",
              icon: "show_chart",
            },
            {
              name: "BlastYield",
              desc: "Aggregated yield farming with leverage.",
              chain: "Blast",
              tvl: "$145M",
              apy: "45.2%",
              score: "42/100",
              risk: "High Risk",
              color: "#fa6238",
              icon: "token",
            },
            {
              name: "Uniswap V3",
              desc: "Leading decentralized exchange protocol.",
              chain: "Multi-Chain",
              tvl: "$5.8B",
              apy: "Varies",
              score: "98/100",
              risk: "Low Risk",
              color: "#0bda5e",
              icon: "swap_horiz",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="group flex flex-col md:grid md:grid-cols-12 gap-4 px-6 py-5 hover:bg-[#1c2536] transition-colors items-center"
            >
              {/* Protocol */}
              <div className="col-span-4 flex items-center gap-4 w-full">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center border"
                  style={{
                    backgroundColor: `${p.color}15`,
                    borderColor: `${p.color}40`,
                  }}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ color: p.color }}
                  >
                    {p.icon}
                  </span>
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  <p className="text-[#92a4c9] text-sm mt-1 line-clamp-1">
                    {p.desc}
                  </p>
                </div>
              </div>

              {/* Chain */}
              <div className="col-span-2 flex items-center gap-2">
                <div className="px-2.5 py-1 rounded bg-border-dark border border-[#324467] text-xs">
                  {p.chain}
                </div>
              </div>

              {/* TVL / APY */}
              <div className="col-span-2">
                <p className="text-white font-medium">{p.tvl}</p>
                <p className="text-[#0bda5e] text-sm">{p.apy}</p>
              </div>

              {/* Risk */}
              <div className="col-span-2">
                <span className="text-xs text-[#92a4c9]">Risk Factors</span>
              </div>

              {/* Score */}
              <div className="col-span-2 flex justify-between md:justify-end gap-6">
                <div className="text-right">
                  <div
                    className="flex items-center justify-center px-3 h-8 rounded-full border"
                    style={{
                      backgroundColor: `${p.color}15`,
                      borderColor: `${p.color}40`,
                    }}
                  >
                    <span
                      className="text-sm font-bold"
                      style={{ color: p.color }}
                    >
                      {p.score}
                    </span>
                  </div>
                  <p className="text-[10px] mt-1" style={{ color: p.color }}>
                    {p.risk}
                  </p>
                </div>

                <button className="md:opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded bg-border-dark hover:bg-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center pt-4 pb-12">
        <button className="h-10 px-6 rounded-lg border border-[#324467] bg-card-dark text-sm font-medium hover:bg-border-dark transition-all">
          Load More Protocols
        </button>
      </div>
    </>
  );
}

export default ListProtocol