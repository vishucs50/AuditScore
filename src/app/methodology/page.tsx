"use client"
import React from 'react'
import { Protocol } from '@/lib/models/protocols';
import { useState,useEffect } from 'react';
import ScoringEquation from './components/ScoringEquation';
import DetailedMetricBreakdown from './components/DetailedMetricsBreakdown';
import RiskCategories from './components/RiskTier';
function Page() {
    const [protocols, setProtocols] = useState<Protocol[]>([]);
            useEffect(() => {
            
                fetch("/api/protocols")
                .then((res) => res.json())
                .then((data) => {
                    setProtocols(data);
                });
            }, []);

  return (
    <>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased overflow-x-hidden min-h-screen flex flex-col">
        <main className="grow flex flex-col items-center w-full">
        <div className="w-full max-w-240 px-4 sm:px-10 pb-20">
        <section className="py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Scoring Methodology
          </h1>
          <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Our proprietary algorithm aggregates on-chain data and audit reports
            to generate a single, comparable safety score. Here is how we break
            it down.
          </p>
        </section>
        <ScoringEquation/>
        <DetailedMetricBreakdown/>
        <RiskCategories/>
        </div>
        </main>
      </div>
    </>
  );
}

export default Page