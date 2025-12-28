import React from 'react'
import Link from 'next/link';
function Navbar() {
  return (
    <>
      <header className="flex items-center  whitespace-nowrap border-b border-solid border-b-border-dark px-6 lg:px-10 py-3 sticky top-0 z-50 bg-[#111722]">
        <div className="flex flex-1 items-center gap-4 text-white">
          <div className="size-8 rounded-2xl bg-primary/20 flex items-center justify-center text-primary ">
            <span className="material-symbols-outlined text-[20px]">
              shield_lock
            </span>
          </div>
          <h2 className="text-white text-xl font-bold tracking-[-0.015em]">
            AuditScore
          </h2>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-300 hover:text-white text-sm">
            Methodology
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white text-sm">
            Compare
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white text-sm">
            About
          </Link>
        </nav>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <label className="hidden md:flex flex-col min-w-40 h-10 max-w-64">
            <div className="flex w-full h-full rounded-lg bg-border-dark group focus-within:ring-2 ring-primary/50">
              <div className="text-[#92a4c9] flex items-center pl-3">
                <span className="material-symbols-outlined text-[20px]">
                  search
                </span>
              </div>
              <input
                className="flex-1 bg-transparent text-white placeholder:text-[#92a4c9] px-3 text-sm outline-none"
                placeholder="Search protocols..."
              />
            </div>
          </label>
        </div>
      </header>
    </>
  );
}

export default Navbar