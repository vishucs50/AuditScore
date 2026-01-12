 "use client";

 import Skeleton from "../ui/Skeleton";

 export default function RiskBreakdownSkeleton() {
   return (
     <section>
       {/* Header */}
       <div className="flex items-center gap-3 mb-6 px-1">
         <Skeleton className="h-6 w-6 rounded" />
         <Skeleton className="h-6 w-48" />
       </div>

       {/* Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {Array.from({ length: 6 }).map((_, i) => (
           <div
             key={i}
             className="bg-card-dark rounded-xl p-5 border border-border-dark"
           >
             <div className="flex justify-between mb-4">
               <Skeleton className="h-5 w-32" />
               <Skeleton className="h-6 w-16 rounded" />
             </div>

             <Skeleton className="h-2 w-full rounded-full mb-4" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-5/6 mt-2" />
           </div>
         ))}
       </div>
     </section>
   );
 }