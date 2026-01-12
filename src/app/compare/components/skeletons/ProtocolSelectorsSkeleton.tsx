import { Skeleton } from "../ui/Skeleton";

export default function ProtocolSelectorsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pb-6">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="h-3 w-24 mb-2" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
