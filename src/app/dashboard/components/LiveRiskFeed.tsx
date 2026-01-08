export default function LiveRiskFeed() {
  return (
    <aside className="bg-card-dark rounded-xl border border-border-dark top-24 h-fit">
      <div className="p-5 border-b border-border-dark flex justify-between">
        <h2 className="font-bold flex gap-2 items-center">
          <Ping /> Live Risk Feed
        </h2>
        <span className="text-xs text-text-secondary uppercase">Real-time</span>
      </div>

      <div className="p-2 max-h-150 overflow-y-auto space-y-2">
        <Item
          color="danger"
          title="CRITICAL"
          text="TVL dropped 18% in Protocol X"
        />
        <Item color="warning" title="APY SPIKE" text="APY jumped to 450%" />
        <Item color="primary" title="AUDIT" text="New Certik audit published" />
        <Item color="success" title="RECOVERY" text="Stablecoin peg restored" />
      </div>
    </aside>
  );
}

/* helpers */

function Ping() {
  return (
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
    </span>
  );
}

function Item({
  color,
  title,
  text,
}: {
  color: string;
  title: string;
  text: string;
}) {
  return (
    <div
      className={`p-3 rounded-lg border-l-2 border-${color} hover:bg-border-dark/50`}
    >
      <p className={`text-xs font-bold text-${color}`}>{title}</p>
      <p className="text-sm font-medium">{text}</p>
    </div>
  );
}
