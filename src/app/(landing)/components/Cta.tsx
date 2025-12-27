import React from 'react'

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
            <button className="px-8 h-14 bg-white text-primary font-bold rounded-xl shadow-xl">
              Explore Protocol Risks
            </button>
            <button className="px-8 h-14 bg-blue-800/50 border border-blue-400/30 text-white font-bold rounded-xl">
              View Methodology
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cta