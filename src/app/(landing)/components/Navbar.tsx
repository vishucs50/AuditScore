import React from 'react'

function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-surface-border bg-background-dark/80 backdrop-blur-md">
        <div className="px-4 md:px-10 py-3 mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3 text-white">
            <div className="size-8 rounded-2xl bg-primary/20 flex items-center justify-center text-primary ">
              <span className="material-symbols-outlined text-[20px]">
                shield_lock
              </span>
            </div>
            <h2 className="text-lg font-bold tracking-tight">AuditScore</h2>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a className="text-gray-300 hover:text-white text-sm">
              Methodology
            </a>
            <a className="text-gray-300 hover:text-white text-sm">Compare</a>
            <a className="text-gray-300 hover:text-white text-sm">About</a>
          </nav>

          <button className="bg-primary hover:bg-blue-800 text-white text-sm font-bold h-9 px-5 rounded-lg shadow-lg shadow-blue-900/20">
            Explore Protocol Risks
          </button>
        </div>
      </header>
    </>
  );
}

export default Navbar