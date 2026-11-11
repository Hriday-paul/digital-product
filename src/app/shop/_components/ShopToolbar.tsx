"use client";

import React, { useState, useTransition, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Package, Search, X, Loader2 } from "lucide-react";

interface ShopToolbarProps {
  shownCount: number;
  totalCount: number;
  selectedCategory?: string;
  initialSearch?: string;
}

export default function ShopToolbar({
  shownCount,
  totalCount,
  selectedCategory,
  initialSearch = "",
}: ShopToolbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState(initialSearch);

  useEffect(() => {
    setSearchValue(initialSearch);
  }, [initialSearch]);

  const updateParams = (updates: Record<string, string | undefined>) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, val]) => {
        if (val && val.trim() !== "") {
          params.set(key, val.trim());
        } else {
          params.delete(key);
        }
      });
      params.delete("page");
      const query = params.toString();
      router.push(`/shop${query ? `?${query}` : ""}`);
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams({ searchTerm: searchValue });
  };

  const handleClearSearch = () => {
    setSearchValue("");
    updateParams({ searchTerm: undefined });
  };

  const handleClearCategory = () => {
    updateParams({ category: undefined });
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl p-3.5 sm:p-4 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] font-montserrat">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        {/* Left: Results Summary & Active Filter Chips */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Package className="size-4" />
            </div>
            <span>
              Showing{" "}
              <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                {shownCount}
              </strong>
              {totalCount > 0 && totalCount !== shownCount && (
                <>
                  {" "}
                  of{" "}
                  <strong className="text-zinc-900 dark:text-zinc-100 font-bold">
                    {totalCount}
                  </strong>
                </>
              )}{" "}
              {totalCount === 1 ? "service" : "services"}
            </span>
          </div>

          {selectedCategory && (
            <button
              type="button"
              onClick={handleClearCategory}
              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <span>{selectedCategory}</span>
              <X className="size-3.5 opacity-75 group-hover:opacity-100" />
            </button>
          )}
        </div>

        {/* Right: Quick Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative w-full sm:w-64 md:w-72"
        >
          <Search className="size-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search digital services..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
          />
          {isPending ? (
            <Loader2 className="size-4 text-primary animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
          ) : (
            searchValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            )
          )}
        </form>
      </div>
    </div>
  );
}
