import { Skeleton } from "../ui/Skeleton";

function SummaryCardSkeleton() {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-border-dark p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gray-300 dark:bg-gray-600" />

      <div className="flex justify-between mb-6">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex-1 border-l pl-4 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export default function SummarySectionSkeleton() {
  return (
    <div className="flex flex-col gap-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
      </div>
    </div>
  );
}
