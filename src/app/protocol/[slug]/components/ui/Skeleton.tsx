"use client";

export default function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-[#1f2a40] ${className}`} />
  );
}
