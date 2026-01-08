export  function groupByChain(pools: any[]) {
  const map: Record<string, any[]> = {};

  for (const pool of pools) {
    if (!pool.chain) continue;
     const key = pool.chain.trim().toLowerCase(); 
    if (!map[key]) map[key] = [];
    map[key].push(pool);
  }

  return map;
}

export  function calculateWeightedApy(pools: any[]) {
  let totalTvl = 0;
  let weightedApy = 0;
  let weightedReward = 0;

  for (const pool of pools) {
   const apyBase = pool.apyBase ?? pool.apy ?? 0;
   const apyReward = pool.apyReward ?? 0;

   if (!pool.tvlUsd) continue;

   totalTvl += pool.tvlUsd;
   weightedApy += apyBase * pool.tvlUsd;
   weightedReward += apyReward * pool.tvlUsd;

  }
    if (totalTvl === 0) return null;
  
    return {
      avgApy: weightedApy / totalTvl,
      rewardApy: weightedReward / totalTvl,
      tvl: totalTvl,
    };
  }