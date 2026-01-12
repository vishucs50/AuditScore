type CryptoPanicItem = {
  title: string;
  published_at: string;
  domain: string;
};

export async function GET() {
  const res = await fetch(
    `https://cryptopanic.com/api/developer/v2/posts/?auth_token=${process.env.CRYPTOPANIC_API_KEY}&public=true&kind=news`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return Response.json([], { status: 200 });
  }

  const json = await res.json();
  const results = Array.isArray(json.results) ? json.results : [];

  const events = results.slice(0, 10).map((item: CryptoPanicItem) => {
    const title = item.title.toLowerCase();

    let type: "danger" | "warning" | "success" | "primary" = "primary";
    let label = "NEWS";

    if (title.includes("hack") || title.includes("exploit")) {
      type = "danger";
      label = "SECURITY";
    } else if (title.includes("tvl") || title.includes("liquidation")) {
      type = "warning";
      label = "RISK";
    } else if (title.includes("audit")) {
      type = "success";
      label = "AUDIT";
    }

    return {
      type,
      title: label,
      text: item.title,
      timestamp: item.published_at,
      source: item.domain,
    };
  });

  return Response.json(events);
}
