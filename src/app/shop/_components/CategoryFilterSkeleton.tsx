import React from "react";

export default function CategoryFilterSkeleton() {
  return (
    <div className="w-full animate-pulse">
      {/* Mobile skeleton */}
      <div className="lg:hidden bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-4 shadow-xs space-y-3">
        <div className="h-5 w-36 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="flex gap-2 overflow-hidden">
          <div className="h-9 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-xl shrink-0" />
          <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl shrink-0" />
          <div className="h-9 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl shrink-0" />
          <div className="h-9 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl shrink-0" />
        </div>
      </div>

      {/* Desktop sidebar card skeleton */}
      <div className="hidden lg:block bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
          <div className="size-9 rounded-xl bg-zinc-200 dark:bg-zinc-800 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
          </div>
        </div>
        <div className="p-3.5 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-11 w-full bg-zinc-100 dark:bg-zinc-800/70 rounded-xl"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
