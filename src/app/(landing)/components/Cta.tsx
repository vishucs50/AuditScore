import React from 'react'
import Link from 'next/link';
function Cta() {
  return (
    <>
      <section className="py-20 px-4 md:px-10">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-primary to-blue-900 rounded-3xl p-10 md:p-16 text-center shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Ready to invest safer?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            AuditScore helps users compare DeFi protocols using transparent,
            explainable risk metrics
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Explore Protocol Risks */}
            <Link
              href="/dashboard"
              className="px-8 h-14
               bg-white text-primary font-bold
               rounded-xl shadow-xl
               inline-flex items-center justify-center
               transition-all duration-200 ease-out
               hover:-translate-y-1 hover:shadow-2xl"
            >
              Explore Protocol Risks
            </Link>

            {/* View Methodology */}
            <Link
              href="/methodology"
              className="px-8 h-14
               bg-blue-800/50 border border-blue-400/30
               text-white font-bold
               rounded-xl
               inline-flex items-center justify-center
               transition-all duration-200 ease-out
               hover:bg-blue-700/60 hover:border-blue-300/50"
            >
              View Methodology
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cta