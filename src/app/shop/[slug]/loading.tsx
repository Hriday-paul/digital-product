import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 pb-16 md:pb-24 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-3.5">
        <div className="container mx-auto">
          <div className="h-4 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>

      <div className="container mx-auto mt-6 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left image skeleton */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-square w-full rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex gap-3">
              <div className="size-16 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
              <div className="size-16 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            </div>
          </div>

          {/* Right info skeleton */}
          <div className="lg:col-span-7 space-y-5">
            <div className="h-5 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
            <div className="h-8 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
            <div className="h-10 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />

            <div className="pt-4 space-y-3">
              <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                <div className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              </div>
            </div>

            <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl mt-6" />
          </div>
        </div>

        {/* Description skeleton */}
        <div className="mt-12 p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4">
          <div className="h-6 w-56 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>
    </div>
  );
}

