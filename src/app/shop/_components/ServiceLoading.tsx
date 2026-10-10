import React from "react";

export default function ServiceLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-xs flex flex-col"
        >
          {/* Image skeleton */}
          <div className="w-full aspect-square bg-zinc-200 dark:bg-zinc-800" />

          {/* Content skeleton */}
          <div className="p-4 sm:p-5 flex flex-col items-center flex-1 space-y-3">
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-4/5" />
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
            <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3 mt-2" />
            <div className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded-md w-28 mt-3" />
          </div>
        </div>
      ))}
    </div>
  );
}

