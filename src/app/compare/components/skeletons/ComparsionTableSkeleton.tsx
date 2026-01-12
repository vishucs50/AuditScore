import { Skeleton } from "../ui/Skeleton";

function SkeletonRow() {
  return (
    <div className="border-b border-gray-200 dark:border-border-dark">
      <div className="grid grid-cols-12 gap-4 p-4 items-center">
        {/* Metric */}
        <div className="col-span-4 md:col-span-3 flex gap-2 items-center">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Protocol A */}
        <div className="col-span-4 border-l pl-4 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-1.5 w-full rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Protocol B */}
        <div className="col-span-4 border-l pl-4 space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-1.5 w-full rounded-full" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Diff */}
        <div className="hidden md:flex md:col-span-1 justify-center">
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </div>
  );
}

export default function ComparisonTableSkeleton() {
  return (
    <div className="mt-4 bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-50 dark:bg-[#151b26] border-b">
        <Skeleton className="h-4 w-20 col-span-4 md:col-span-3" />
        <Skeleton className="h-4 w-24 col-span-4 border-l pl-4" />
        <Skeleton className="h-4 w-24 col-span-4 border-l pl-4" />
        <Skeleton className="h-4 w-10 hidden md:block md:col-span-1" />
      </div>

      {/* Rows */}
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
