import mongoose,{Schema,Document} from "mongoose";
export interface Protocol extends Document {
  name: string;
  audits?:number;
  slug: string;
  category: string;
  chains: [string];
  website: string;
  launchDate: Date;
  finalRiskScore?: number;
  description?: string;
  auditRisk?: object;
  tvl?:number;
  tvlStability?: object;
  liquidityRisk?: object;
  whaleConcentration?: object;
  Protocolmaturity?: object;
  apyVolatility?: object;
  color?:string;
  icon?:string;
  chain?:string;
  apy?:string;
  risk?:string;
}
const ProtocolSchema:Schema<Protocol> = new Schema({
  name: String,
  slug:String,
  category: String,
  chains: [String],
  website: String,
  description:String,
  launchDate: Date,
});

const ProtocolModel =
  (mongoose.models.Protocol as mongoose.Model<Protocol>) ||
  mongoose.model<Protocol>("Protocol", ProtocolSchema);
export default ProtocolModel

