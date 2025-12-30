import mongoose from "mongoose";

const TVLSnapshotSchema = new mongoose.Schema({
  protocolSlug: { type: String, index: true },
  tvl: { type: Number },
  timestamp: { type: Date, index: true },
});

TVLSnapshotSchema.index({ protocolSlug: 1, timestamp: 1 });

export default mongoose.models.TVLSnapshot ||
  mongoose.model("TVLSnapshot", TVLSnapshotSchema);
