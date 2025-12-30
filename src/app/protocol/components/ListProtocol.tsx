import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Protocol } from '@/lib/models/protocols';
import { formatTVL } from '@/lib/risk/tvlStability';
type ListProtocolProps = {
  protocols: Protocol[];
};
function ListProtocol({protocols}:ListProtocolProps) {
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
   const totalPages = Math.ceil(protocols.length / ITEMS_PER_PAGE);

   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
   const endIndex = startIndex + ITEMS_PER_PAGE;

   const visibleProtocols = protocols.slice(startIndex, endIndex);
   console.log(visibleProtocols)
  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-[#324467] bg-[#161e2c]">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#324467] bg-card-dark text-xs font-semibold text-[#92a4c9] uppercase tracking-wider">
          <div className="col-span-4 pl-2">Protocol</div>
          <div className="col-span-2">Chain</div>
          <div className="col-span-2">TVL </div>
          <div className="col-span-2">Risk Summary</div>
          <div className="col-span-2 text-right pr-2">Score</div>
        </div>

        {/* List */}
        <div className="flex flex-col divide-y divide-border-dark">
          {/* === PROTOCOL ROW === */}
          {visibleProtocols.map((p) => (
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
                  <Image
                    src={p.icon} 
                    alt="icon"
                    width={24}
                    height={24}
                    className="object-contain"
                    style={{
                      filter: `drop-shadow(0 0 4px ${p.color})`,
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-white font-bold text-lg">{p.name}</h3>
                  <p className="text-[#92a4c9] text-sm mt-1 line-clamp-1">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* Chain */}
              <div className="col-span-2 flex items-center gap-2">
                <div className="px-2.5 py-1 rounded bg-border-dark border border-[#324467] text-xs">
                  {p.chains[0]}
                </div>
              </div>

              {/* TVL */}
              <div className="col-span-2">
                <p className="text-white font-medium">{formatTVL(p.tvl)}</p>
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
                      {p.finalRiskScore}/100
                    </span>
                  </div>
                  <p className="text-[10px] mt-1" style={{ color: p.color }}>
                    {p.risk}
                  </p>
                </div>

                <Link
                  href={`/protocol/${p.slug}`}
                  className="md:opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 rounded bg-border-dark hover:bg-primary flex items-center justify-center"
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pt-6 pb-12">
        {/* Previous */}
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="h-9 px-4 rounded-lg border border-[#324467] bg-card-dark text-sm disabled:opacity-40 hover:bg-border-dark transition"
        >
          Prev
        </button>

        {/* Page Numbers (max 3 visible) */}
        {(() => {
          const maxVisible = 3;

          let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));

          let endPage = startPage + maxVisible - 1;

          if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisible + 1);
          }

          return Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-9 w-9 rounded-lg border text-sm font-medium transition
          ${
            currentPage === page
              ? "bg-primary text-white border-primary"
              : "bg-card-dark border-[#324467] hover:bg-border-dark"
          }`}
            >
              {page}
            </button>
          ));
        })()}

        {/* Next */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="h-9 px-4 rounded-lg border border-[#324467] bg-card-dark text-sm disabled:opacity-40 hover:bg-border-dark transition"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ListProtocol