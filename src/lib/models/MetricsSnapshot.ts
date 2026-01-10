import mongoose from "mongoose";

const MetricsSnapshotSchema = new mongoose.Schema({
  protocolSlug: {
    type: String,
    required: true,
    index: true,
  },

  finalRiskScore: {
    score: { type: Number, min: 0, max: 100 },
    level: {
      type: String,
      enum: ["low", "medium", "high"],
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export default mongoose.models.MetricsSnapshot ||
mongoose.model("MetricsSnapshot", MetricsSnapshotSchema);
