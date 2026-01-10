import mongoose from "mongoose";

const ChainRiskSnapshotSchema = new mongoose.Schema({
  chain: { type: String, index: true },
  riskScore: { type: Number, min: 0, max: 100 },
  totalTVL: { type: Number },
  protocolCount: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.ChainRiskSnapshot ||
  mongoose.model("ChainRiskSnapshot", ChainRiskSnapshotSchema);
