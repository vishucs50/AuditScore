import mongoose,{Schema,Document} from "mongoose";
export interface Protocol extends Document {
  name: string;
  audits: string;
  slug: string;
  category: string;
  chains: [string];
  website: string;
  launchDate: Date;
  finalRiskScore?: number;
  description?: string;
  auditRisk: {
    score: number;
    summary: string;
    factor: string[];
  };
  tvl: number;
  tvlStability: {
    score: number;
    summary: string;
    level: string;
  };
  liquidityRisk?: object;
  whaleConcentration?: object;
  Protocolmaturity?: object;
  apyVolatility?: object;
  color?: string;
  icon: string;
  chain?: string;
  apy?: string;
  risk?: string;
}
const ProtocolSchema:Schema<Protocol> = new Schema({
  name: String,
  audits:String,
  slug:String,
  category: String,
  chains: [String],
  website: String,
  description:String,
  launchDate: Date,
  icon:String,
  tvl:Number,
});

const ProtocolModel =
  (mongoose.models.Protocol as mongoose.Model<Protocol>) ||
  mongoose.model<Protocol>("Protocol", ProtocolSchema);
export default ProtocolModel

