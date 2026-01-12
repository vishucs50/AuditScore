"use client";

import Skeleton from "../ui/Skeleton";

export default function ContextBarSkeleton() {
  return (
    <section className="flex flex-col md:flex-row gap-6 mb-8 w-full bg-card-dark rounded-2xl p-6 border border-[#1e293b]">
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </section>
  );
}
