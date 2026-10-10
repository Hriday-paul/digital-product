"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ICategory } from "@/redux/types";
import { Layers, LayoutGrid, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryFilterClientProps {
  categories: ICategory[];
  selectedCategory?: string;
}

export default function CategoryFilterClient({
  categories,
  selectedCategory,
}: CategoryFilterClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (categoryId?: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (categoryId) {
        params.set("category", categoryId);
      } else {
        params.delete("category");
      }
      params.delete("page"); // Reset to page 1 on filter change
      const query = params.toString();
      router.push(`/shop${query ? `?${query}` : ""}`);
    });
  };

  const isAllActive = !selectedCategory;

  return (
    <div className="w-full">
      {/* Mobile Horizontal Category Pills */}
      <div className="lg:hidden w-full pb-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            type="button"
            onClick={() => handleSelect(undefined)}
            className={cn(
              "shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-montserrat font-medium transition-all duration-200",
              isAllActive
                ? "bg-primary text-white shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            )}
          >
            <LayoutGrid className="size-3.5" />
            <span>All Services</span>
          </button>

          {categories.map((cat) => {
            const isCatActive = selectedCategory === cat.name;
            return (
              <button
                key={cat.id || cat.name}
                type="button"
                onClick={() => handleSelect(cat.name)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-montserrat font-medium transition-all duration-200",
                  isCatActive
                    ? "bg-primary text-white shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                )}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar Card */}
      <div className="hidden lg:block bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-xs sticky top-24">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <Layers className="size-4 text-primary" />
            <h3 className="font-montserrat font-bold text-base text-zinc-900 dark:text-zinc-100">
              Categories
            </h3>
          </div>
          {selectedCategory && (
            <button
              type="button"
              onClick={() => handleSelect(undefined)}
              className="text-xs font-montserrat text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <X className="size-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* List */}
        <div className="mt-4 space-y-1.5">
          {/* All Services Option */}
          <button
            type="button"
            onClick={() => handleSelect(undefined)}
            className={cn(
              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-montserrat transition-all duration-200 text-left cursor-pointer",
              isAllActive
                ? "bg-primary text-white font-semibold shadow-xs"
                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium"
            )}
          >
            <div className="flex items-center gap-2.5">
              <LayoutGrid
                className={cn("size-4", isAllActive ? "text-white" : "text-zinc-400")}
              />
              <span>All Services</span>
            </div>
            {isAllActive && <Check className="size-4 text-white" />}
          </button>

          {/* Individual Categories */}
          {categories.map((cat) => {
            const isCatActive =
              selectedCategory === cat.id || selectedCategory === cat.name;
            return (
              <button
                key={cat.id || cat.name}
                type="button"
                onClick={() => handleSelect(cat.name)}
                className={cn(
                  "w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-montserrat transition-all duration-200 text-left cursor-pointer",
                  isCatActive
                    ? "bg-primary text-white font-semibold shadow-xs"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 font-medium"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-colors",
                      isCatActive ? "bg-white" : "bg-primary/50"
                    )}
                  />
                  <span className="truncate">{cat.name}</span>
                </div>
                {isCatActive && <Check className="size-4 text-white shrink-0" />}
              </button>
            );
          })}
        </div>

        {isPending && (
          <div className="mt-3 text-center">
            <span className="text-xs text-zinc-400 font-montserrat animate-pulse">
              Updating filter...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

