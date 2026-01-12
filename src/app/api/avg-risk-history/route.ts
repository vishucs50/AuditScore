import dbConnect from "@/lib/dbConnect";
import MetricsSnapshot from "@/lib/models/MetricsSnapshot";

export async function GET() {
  await dbConnect();

  const data = await MetricsSnapshot.aggregate([
    {
      $match: {
        "finalRiskScore.score": { $exists: true },
      },
    },
    {
      // group by day
      $group: {
        _id: {
          day: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
        },
        avgRisk: { $avg: "$finalRiskScore.score" },
      },
    },
    { $sort: { "_id.day": 1 } },
    { $limit: 30 },
  ]);

  const formatted = data.map((d) => ({
    time: new Date(d._id.day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    score: Math.round(d.avgRisk),
  }));

  return Response.json(formatted);
}
