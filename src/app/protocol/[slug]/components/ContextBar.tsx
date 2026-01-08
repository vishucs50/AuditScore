"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { Protocol } from "@/lib/models/protocols";

type Props = {
  protocol: Protocol;
};

function ContextBar({ protocol }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // read chain from URL, fallback to first chain
  const selectedChain =
    searchParams.get("chain") ?? protocol.chains?.[0];

  function handleChainChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const chain = e.target.value;

    const params = new URLSearchParams(searchParams.toString());
    params.set("chain", chain);

    router.push(`?${params.toString()}`, { scroll: false });
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col md:flex-row gap-6 mb-8 w-full bg-card-dark rounded-2xl p-6 border border-[#1e293b]"
    >
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Protocol */}
        <div className="flex flex-col gap-2">
          <p className="text-[#92a4c9] text-sm font-medium">Protocol</p>
          <div className="w-full bg-[#0b1220] border border-[#1e293b] text-white rounded-xl px-4 py-3">
            {protocol.name}
          </div>
        </div>

        {/* Chain */}
        <div className="flex flex-col gap-2">
          <p className="text-[#92a4c9] text-sm font-medium">Select Chain</p>

          <select
            value={selectedChain}
            onChange={handleChainChange}
            className="w-full bg-[#0b1220] border border-[#1e293b] text-white rounded-xl px-4 py-3"
          >
            {protocol.chains?.map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.section>
  );
}

export default ContextBar;
