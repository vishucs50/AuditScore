import { Skeleton } from "../ui/Skeleton";

export default function ChainSnapshotSkeleton() {
  return (
    <section className="mb-8">
      <Skeleton className="h-6 w-48 mb-4" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-card-dark border border-border-dark rounded-lg p-3"
          >
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-16 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>
    </section>
  );
}
