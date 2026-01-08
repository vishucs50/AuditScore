import mongoose from "mongoose";

const RiskDetailSchema = new mongoose.Schema(
  {
    score: { type: Number, min: 0, max: 100, required: true },
    level: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    summary: { type: String, required: true },
    factors: [{ type: String }],
  },
  { _id: false } // important: prevents extra _id for subdocs
);

const MetricsSchema = new mongoose.Schema({
  protocolSlug: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },

  auditRisk: RiskDetailSchema,
  tvlStability: RiskDetailSchema,
  liquidityRisk: RiskDetailSchema,
  whaleConcentration: RiskDetailSchema,
  protocolMaturity: RiskDetailSchema,
  dependencyRisk: RiskDetailSchema,
  finalRiskScore: {
    score: { type: Number, min: 0, max: 100 },
    level: {
      type: String,
      enum: ["low", "medium", "high"],
    },
    summary: { type: String },
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.MetricsCurrent ||
  mongoose.model("MetricsCurrent", MetricsSchema);
