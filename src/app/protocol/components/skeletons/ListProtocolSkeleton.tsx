"use client";
import { Skeleton } from "../ui/Skeleton";
export default function ListProtocolSkeleton() {
  return (
    <>
      <div className="w-full overflow-hidden rounded-xl border border-[#324467] bg-[#161e2c]">
        {/* Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-[#324467] bg-card-dark">
          <Skeleton className="col-span-4 h-4 w-32" />
          <Skeleton className="col-span-2 h-4 w-16" />
          <Skeleton className="col-span-2 h-4 w-16" />
          <Skeleton className="col-span-2 h-4 w-24" />
          <Skeleton className="col-span-2 h-4 w-12 justify-self-end" />
        </div>

        {/* Rows */}
        <div className="divide-y divide-border-dark">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-12 gap-4 px-6 py-5 items-center"
            >
              {/* Protocol */}
              <div className="col-span-4 flex gap-4 items-center">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>

              {/* Chain */}
              <Skeleton className="col-span-2 h-6 w-16 rounded" />

              {/* TVL */}
              <Skeleton className="col-span-2 h-4 w-20" />

              {/* Risk factors */}
              <div className="col-span-2 flex gap-2">
                <Skeleton className="h-6 w-14 rounded" />
                <Skeleton className="h-6 w-14 rounded" />
              </div>

              {/* Score */}
              <div className="col-span-2 flex justify-end">
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-6 pb-12">
        <Skeleton className="h-9 w-16 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-9 rounded-lg" />
        <Skeleton className="h-9 w-16 rounded-lg" />
      </div>
    </>
  );
}
