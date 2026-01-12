import { Skeleton } from "../ui/Skeleton";

export default function LiveRiskFeedSkeleton() {
  return (
    <aside className="bg-card-dark rounded-xl border border-border-dark">
      <div className="p-5 border-b border-border-dark">
        <Skeleton className="h-5 w-40" />
      </div>

      <div className="p-3 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-lg" />
        ))}
      </div>
    </aside>
  );
}
