"use client";

import { Skeleton } from "../ui/Skeleton";
export default function ProtocolFiltersSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <Skeleton className="flex-1 h-12 rounded-lg" />

        {/* Sort */}
        <Skeleton className="h-12 w-48 rounded-lg" />
      </div>
    </div>
  );
}
