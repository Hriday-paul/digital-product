import React from "react";

export default function CategoryFilterSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-4">
      {/* Mobile horizontal skeleton */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-2">
        <div className="h-9 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0" />
        <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0" />
        <div className="h-9 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0" />
        <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0" />
      </div>

      {/* Desktop sidebar card skeleton */}
      <div className="hidden lg:block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-xs">
        <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
        <div className="space-y-2.5">
          <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
          <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

