import dbConnect from "@/lib/dbConnect";
import ChainRiskSnapshot from "@/lib/models/ChainRiskSnapShot";
export async function GET(req: Request) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const chain = searchParams.get("chain");

  const query = chain ? { chain } : {};

  // latest snapshot per chain
  const data = await ChainRiskSnapshot.aggregate([
    { $match: query },
    { $sort: { timestamp: -1 } },
    {
      $group: {
        _id: "$chain",
        chain: { $first: "$chain" },
        riskScore: { $first: "$riskScore" },
        totalTVL: { $first: "$totalTVL" },
        protocolCount: { $first: "$protocolCount" },
        timestamp: { $first: "$timestamp" },
      },
    },
    { $sort: { riskScore: -1 } },
  ]);

  return Response.json(data);
}
