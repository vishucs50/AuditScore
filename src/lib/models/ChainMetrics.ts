import mongoose from "mongoose";

const ChainMetricsSchema = new mongoose.Schema({
  protocolSlug: { type: String, index: true },
  chain: { type: String, index: true },

  avgApy: Number,
  rewardApy: Number,
  tvl: Number,

  updatedAt: Date,
});

export default mongoose.models.ChainMetrics ||
  mongoose.model("ChainMetrics", ChainMetricsSchema);
