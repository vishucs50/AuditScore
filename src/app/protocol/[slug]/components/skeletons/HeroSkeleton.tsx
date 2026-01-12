"use client";

import Skeleton from "../ui/Skeleton";

export default function HeroSkeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main Card */}
      <div className="lg:col-span-2 bg-[#111722] rounded-xl p-6 border border-border-dark flex flex-col md:flex-row gap-8">
        {/* Circle */}
        <Skeleton className="size-48 rounded-full" />

        {/* Text */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-4 w-full max-w-xl" />
          <Skeleton className="h-4 w-full max-w-lg" />

          <div className="flex gap-4 pt-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </div>

      {/* APY Card */}
      <div className="bg-card-dark rounded-xl p-6 border border-border-dark flex flex-col gap-6">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-4 w-full rounded-full" />
      </div>
    </section>
  );
}
