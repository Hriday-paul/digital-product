"use client";

import React, { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ICategory } from "@/redux/types";
import {
  Layers,
  LayoutGrid,
  Check,
  RotateCcw,
  Search,
  ChevronRight,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
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
  const [CategorySearch, setCategorySearch] = useState("");

  const handleSelect = (categoryName?: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (categoryName) {
        params.set("category", categoryName);
      } else {
        params.delete("category");
      }
      params.delete("page");
      const query = params.toString();
      router.push(`/shop${query ? `?${query}` : ""}`);
    });
  };

  const isAllActive = !selectedCategory;

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(CategorySearch.trim().toLowerCase())
  );

  return (
    <div className="w-full font-montserrat">
      {/* Mobile & Tablet Category Bar */}
      <div className="lg:hidden bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-3.5 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Layers className="size-4" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
              Filter by Category
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {categories.length + 1}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isPending && (
              <Loader2 className="size-3.5 text-primary animate-spin" />
            )}
            {selectedCategory && (
              <button
                type="button"
                onClick={() => handleSelect(undefined)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
              >
                <RotateCcw className="size-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
          <button
            type="button"
            onClick={() => handleSelect(undefined)}
            className={cn(
              "shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer",
              isAllActive
                ? "bg-gradient-to-r from-primary to-[#1577b0] text-white border-primary shadow-sm shadow-primary/25"
                : "bg-zinc-50 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700 hover:border-primary/40 hover:text-primary"
            )}
          >
            <LayoutGrid className="size-3.5" />
            <span>All Services</span>
          </button>

          {categories.map((cat) => {
            const isCatActive =
              selectedCategory === cat.id || selectedCategory === cat.name;
            const count = cat.services?.length;

            return (
              <button
                key={cat.id || cat.name}
                type="button"
                onClick={() => handleSelect(cat.name)}
                className={cn(
                  "shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer",
                  isCatActive
                    ? "bg-gradient-to-r from-primary to-[#1577b0] text-white border-primary shadow-sm shadow-primary/25"
                    : "bg-zinc-50 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700 hover:border-primary/40 hover:text-primary"
                )}
              >
                <span>{cat.name}</span>
                {typeof count === "number" && count > 0 && (
                  <span
                    className={cn(
                      "text-[10px] px-1.5 py-0.2 rounded-full font-bold",
                      isCatActive
                        ? "bg-white/20 text-white"
                        : "bg-zinc-200/70 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300"
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar Filter */}
      <div className="hidden lg:flex flex-col gap-5 sticky top-24">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
          {/* Top Accent Header */}
          <div className="p-5 bg-gradient-to-br from-primary/[0.08] via-primary/[0.03] to-transparent border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm shadow-primary/30">
                  <Layers className="size-4.5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-tight">
                    Categories
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5">
                    {categories.length} categories available
                  </p>
                </div>
              </div>

              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => handleSelect(undefined)}
                  title="Reset category filter"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Category Search Input (shown when > 4 categories) */}
            {categories.length > 4 && (
              <div className="relative mt-4">
                <Search className="size-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={CategorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Filter categories..."
                  className="w-full pl-8 pr-8 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
                {CategorySearch && (
                  <button
                    type="button"
                    onClick={() => setCategorySearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Category List */}
          <div className="p-3.5 space-y-1.5 max-h-[460px] overflow-y-auto">
            {/* All Services Item */}
            <button
              type="button"
              onClick={() => handleSelect(undefined)}
              className={cn(
                "group w-full flex items-center justify-between p-2.5 rounded-xl text-sm transition-all duration-200 text-left cursor-pointer border",
                isAllActive
                  ? "bg-gradient-to-r from-primary to-[#1577b0] text-white font-semibold border-primary shadow-md shadow-primary/20"
                  : "bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-700 font-medium"
              )}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={cn(
                    "size-8 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    isAllActive
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:bg-primary/10 group-hover:text-primary"
                  )}
                >
                  <LayoutGrid className="size-4" />
                </div>
                <span className="truncate">All Services</span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {isAllActive ? (
                  <span className="size-5 rounded-full bg-white/20 flex items-center justify-center">
                    <Check className="size-3.5 text-white" />
                  </span>
                ) : (
                  <ChevronRight className="size-4 text-zinc-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                )}
              </div>
            </button>

            {/* Divider */}
            <div className="my-1.5 border-t border-zinc-100 dark:border-zinc-800/80" />

            {/* Filtered Category Items */}
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => {
                const isCatActive =
                  selectedCategory === cat.id || selectedCategory === cat.name;
                const count = cat.services?.length;

                return (
                  <button
                    key={cat.id || cat.name}
                    type="button"
                    onClick={() => handleSelect(cat.name)}
                    className={cn(
                      "group w-full flex items-center justify-between p-2.5 rounded-xl text-sm transition-all duration-200 text-left cursor-pointer border",
                      isCatActive
                        ? "bg-gradient-to-r from-primary to-[#1577b0] text-white font-semibold border-primary shadow-md shadow-primary/20"
                        : "bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 border-transparent hover:border-zinc-200/80 dark:hover:border-zinc-700 font-medium"
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          "size-8 rounded-lg flex items-center justify-center shrink-0 transition-colors text-xs font-bold uppercase",
                          isCatActive
                            ? "bg-white/20 text-white"
                            : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                        )}
                      >
                        {cat.name?.slice(0, 2) || "SV"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate leading-snug">{cat.name}</p>
                        {cat.description && (
                          <p
                            className={cn(
                              "text-[11px] truncate font-normal",
                              isCatActive
                                ? "text-white/80"
                                : "text-zinc-400 dark:text-zinc-500"
                            )}
                          >
                            {cat.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {typeof count === "number" && count > 0 && (
                        <span
                          className={cn(
                            "text-[11px] px-2 py-0.5 rounded-full font-semibold",
                            isCatActive
                              ? "bg-white/20 text-white"
                              : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-primary/10 group-hover:text-primary"
                          )}
                        >
                          {count}
                        </span>
                      )}
                      {isCatActive ? (
                        <span className="size-5 rounded-full bg-white/20 flex items-center justify-center">
                          <Check className="size-3.5 text-white" />
                        </span>
                      ) : (
                        <ChevronRight className="size-4 text-zinc-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-6 px-3 text-center">
                <p className="text-xs text-zinc-400">
                  No categories match &ldquo;{CategorySearch}&rdquo;
                </p>
              </div>
            )}
          </div>

          {/* Pending Transition Status Bar */}
          {isPending && (
            <div className="px-4 py-2.5 bg-primary/5 border-t border-primary/15 flex items-center justify-center gap-2 text-xs font-semibold text-primary">
              <Loader2 className="size-3.5 animate-spin" />
              <span>Updating services...</span>
            </div>
          )}
        </div>

        {/* Helpful Support Card in Sidebar */}
        <div className="rounded-2xl bg-gradient-to-br from-[#1D2420] to-zinc-900 text-white p-5 shadow-sm border border-zinc-800 relative overflow-hidden">
          <div className="absolute -right-6 -top-6 size-24 rounded-full bg-primary/20 blur-xl pointer-events-none" />
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-primary text-[11px] font-semibold mb-2.5">
            <Sparkles className="size-3" />
            <span>Need Custom Plan?</span>
          </div>
          <h4 className="font-bold text-sm text-white leading-snug">
            Can&apos;t find what you&apos;re looking for?
          </h4>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Chat with our support team on WhatsApp for instant custom subscriptions and bulk deals.
          </p>
          <a
            href="https://wa.me/8801727877160"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs shadow-sm transition-all active:scale-98"
          >
            <FaWhatsapp className="size-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
