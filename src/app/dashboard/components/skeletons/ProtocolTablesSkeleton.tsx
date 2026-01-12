import { Skeleton } from "../ui/Skeleton";

export default function ProtocolTablesSkeleton() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="bg-card-dark rounded-xl border border-border-dark"
        >
          <div className="px-5 py-3 border-b border-border-dark">
            <Skeleton className="h-5 w-40" />
          </div>

          {Array.from({ length: 5 }).map((_, j) => (
            <div key={j} className="px-5 py-4 flex justify-between">
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
                <Skeleton className="h-3 w-48" />
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-10 mb-2" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
