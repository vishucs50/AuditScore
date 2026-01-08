type YieldPool = {
  chain: string;
  tvlUsd?: number;
  apy?: number;
  apyReward?: number;
};

export function groupByChain(pools: YieldPool[]) {
  const grouped: Record<string, YieldPool[]> = {};

  for (const pool of pools) {
    if (!pool?.chain) continue;

    if (!grouped[pool.chain]) {
      grouped[pool.chain] = [];
    }

    grouped[pool.chain].push(pool);
  }

  return grouped;
}
export function calculateWeightedApy(
  pools: {
    tvlUsd?: number;
    apy?: number;
    apyReward?: number;
  }[]
) {
  let totalTvl = 0;
  let weightedApy = 0;
  let weightedRewardApy = 0;

  for (const pool of pools) {
    const tvl = pool.tvlUsd ?? 0;
    if (tvl <= 0) continue;

    totalTvl += tvl;

    if (typeof pool.apy === "number") {
      weightedApy += pool.apy * tvl;
    }

    if (typeof pool.apyReward === "number") {
      weightedRewardApy += pool.apyReward * tvl;
    }
  }

  if (totalTvl === 0) {
    return {
      avgApy: null,
      rewardApy: null,
      tvl: 0,
    };
  }

  return {
    avgApy: Number((weightedApy / totalTvl).toFixed(2)),
    rewardApy: Number((weightedRewardApy / totalTvl).toFixed(2)),
    tvl: Number(totalTvl.toFixed(2)),
  };
}
