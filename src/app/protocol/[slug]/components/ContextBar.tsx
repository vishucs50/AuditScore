"use client";

import React from "react";
import { motion } from "framer-motion";
import { Protocol } from "@/lib/models/protocols";
type Props={
    protocol:Protocol;
}
function ContextBar({protocol}:Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col md:flex-row gap-6 mb-8 w-full bg-card-dark rounded-2xl p-6 border border-[#1e293b] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/*  Protocol */}
        <motion.label
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-2"
        >
          <p className="text-[#92a4c9] text-sm font-medium">Protocol</p>

          <div className="relative">
            <div className="w-full bg-[#0b1220] border border-[#1e293b] text-white rounded-xl pl-11 pr-10 py-3 flex items-center cursor-default">
              {protocol.name}
            </div>

            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#92a4c9]">
              <span className="material-symbols-outlined text-[20px]">
                layers
              </span>
            </div>
          </div>
        </motion.label>

        {/* Select Chain */}
        <motion.label
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-2"
        >
          <p className="text-[#92a4c9] text-sm font-medium">Select Chain</p>

          <div className="relative">
            <select
              defaultValue={protocol.chains?.[0]}
              className="appearance-none w-full bg-[#0b1220] border border-[#1e293b] text-white rounded-xl pl-11 pr-10 py-3 focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/40 transition cursor-pointer"
            >
              {protocol.chains?.map((chain) => (
                <option key={chain} value={chain}>
                  {chain}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#92a4c9]">
              <span className="material-symbols-outlined text-[20px]">hub</span>
            </div>

            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#92a4c9]">
              <span className="material-symbols-outlined text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </motion.label>
      </div>

      {/* Generate Button */}
      <div className="flex items-end justify-end md:w-auto">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-linear-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white px-7 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition"
        >
          <span className="material-symbols-outlined text-[20px]">
            description
          </span>
          Generate Report
        </motion.button>
      </div>
    </motion.section>
  );
}

export default ContextBar;
