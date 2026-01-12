import { Skeleton } from "../ui/Skeleton";

export default function RiskChartSkeleton() {
  return (
    <section className="bg-card-dark border border-border-dark rounded-xl p-6 m-4">
      <Skeleton className="h-5 w-48 mb-2" />
      <Skeleton className="h-4 w-64 mb-6" />
      <Skeleton className="h-64 w-full" />
    </section>
  );
}
