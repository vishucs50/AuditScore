import React from 'react'

function Stats() {
  return (
    <>
      <section className="border-y border-surface-border bg-background-dark/50">
        <div className="max-w-7xl mx-auto px-4 md:px-10 py-10 grid md:grid-cols-3 gap-8 text-center">
          {[
            ["Protocols Analyzed", "500+"],
            ["Risks Identified", "12,000"],
            ["Total Value Secured", "$4.2B"],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-text-secondary text-sm uppercase mb-1">
                {label}
              </p>
              <p className="text-white text-3xl font-mono font-bold">{value}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Stats