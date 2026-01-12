"use client";

import { Skeleton } from "../ui/Skeleton";

export default function GlobalStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl p-5 border border-[#324467] bg-linear-to-br from-[#161e2c] to-[#111827]"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-10" />
          </div>

          {/* Value */}
          <Skeleton className="h-8 w-24" />
        </div>
      ))}
    </div>
  );
}
