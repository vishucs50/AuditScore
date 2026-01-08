import mongoose, { Schema, model, models } from "mongoose";

const ChainMetricsSchema = new Schema(
  {
    protocolSlug: {
      type: String,
      required: true,
      index: true,
    },

    chain: {
      type: String,
      required: true,
      index: true,
    },

    avgApy: {
      type: Number,
      default: null,
    },

    rewardApy: {
      type: Number,
      default: null,
    },

    tvl: {
      type: Number,
      default: null,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: false }
);

// 🔑 Prevent duplicates (protocol + chain)
ChainMetricsSchema.index({ protocolSlug: 1, chain: 1 }, { unique: true });

const ChainMetrics =
  models.ChainMetrics || model("ChainMetrics", ChainMetricsSchema);

export default ChainMetrics;
