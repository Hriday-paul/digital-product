import React from "react";

export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 pb-20 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-3.5">
        <div className="container mx-auto">
          <div className="h-4 w-52 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>
      </div>

      <div className="container mx-auto mt-6 sm:mt-10">
        <div className="mb-6 space-y-2">
          <div className="h-8 w-64 bg-zinc-200 dark:bg-zinc-800 rounded" />
          <div className="h-4 w-96 bg-zinc-200 dark:bg-zinc-800 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Left form skeleton */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
              <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-10 w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
                <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg" />
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
              <div className="h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
                <div className="h-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Right summary skeleton */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 space-y-4">
              <div className="h-5 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="flex gap-4">
                <div className="size-20 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

