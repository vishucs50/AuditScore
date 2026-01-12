import dbConnect from "@/lib/dbConnect";
import ProtocolModel from "@/lib/models/protocols";
import MetricsCurrent from "@/lib/models/MetricsCurrent";
export async function GET(req: Request) {
  console.log("➡️ Wallet exposure API called");

  await dbConnect();
  console.log("✅ DB connected");

  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  console.log("👛 Wallet address:", address);

  if (!address) return Response.json([]);

  const walletProtocols = ["Uniswap V3", "Curve DEX", "Aave V3"];
  console.log("📦 Wallet protocols:", walletProtocols);

  const protocols = await ProtocolModel.find({}, { name: 1, slug: 1 }).lean();

  console.log("📚 Protocols in DB:", protocols.length);

  const matched = walletProtocols
    .map((name) =>
      protocols.find(
        (p) =>
          p.name.toLowerCase().includes(name.toLowerCase()) ||
          name.toLowerCase().includes(p.name.toLowerCase())
      )
    )
    .filter(Boolean);

  console.log(
    "🎯 Matched protocols:",
    matched.map((p: any) => p.name)
  );

  const result = await Promise.all(
    matched.map(async (p: any) => {
      const metrics = await MetricsCurrent.findOne({
        protocolSlug: p.slug,
      }).lean();

      console.log(`📊 Metrics for ${p.slug}:`, metrics?.finalRiskScore.score);

      return {
        name: p.name,
        slug: p.slug,
        score: metrics?.finalRiskScore?.score ?? null,
        level: metrics?.finalRiskScore?.level ?? "unknown",
        factors: metrics?.finalRiskScore?.factors ?? [],
      };
    })
  );

  console.log("✅ Final response:", result);

  return Response.json(result);
}
