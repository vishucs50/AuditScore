import mongoose,{Schema,Document} from "mongoose";
export interface Protocol extends Document {
  name: string;
  audits: string;
  slug: string;
  category: string;
  chains: [string];
  website: string;
  launchDate: Date;
  finalRiskScore:{
    score:number;
    factors:string[];
    level:string;
  } ;
  description?: string;
  audit_links?: string[];
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
  avgApy: number | null;
  rewardApy: number | null;
  liquidityRisk: {
    score: number;
    summary: string;
    level: string;
  };
  dependencyRisk: {
    score: number;
    summary: string;
    level: string;
  };
  whaleConcentration: {
    score: number;
    summary: string;
    level: string;
  };
  protocolMaturity: {
    score: number;
    summary: string;
    level: string;
  };
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
  audit_links:[String],
});

const ProtocolModel =
  (mongoose.models.Protocol as mongoose.Model<Protocol>) ||
  mongoose.model<Protocol>("Protocol", ProtocolSchema);
export default ProtocolModel

