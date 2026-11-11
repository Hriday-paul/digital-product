"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Loader2,
  ArrowRight,
  PackageSearch,
  Sparkles,
} from "lucide-react";
import { useServicesQuery } from "@/redux/api/Service.api";
import { IService } from "@/redux/types";

const getStartingPrice = (service: IService) => {
  if (service.variants?.length) {
    const min = [...service.variants].sort(
      (a, b) => a.final_price - b.final_price
    )[0]?.final_price;
    if (typeof min === "number") return `৳${min.toFixed(0)}`;
  }
  if (typeof service.minPrice === "number") {
    return `৳${service.minPrice}`;
  }
  return "৳0";
};

export default function NavbarSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 220);
    return () => clearTimeout(timer);
  }, [query]);

  // Fetch services when search is opened or user types
  const { data: response, isLoading, isFetching } = useServicesQuery(
    {
      limit: 50,
      ...(debouncedQuery ? { searchTerm: debouncedQuery } : {}),
    },
    {
      skip: !isOpen && !query,
    }
  );

  // Extract services list safely
  const allServices: IService[] = useMemo(() => {
    const raw = response?.data;
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw?.data)) return raw.data;
    return [];
  }, [response]);

  // Filter services based on typed query
  const filteredServices = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return allServices.slice(0, 6);

    return allServices
      .filter((service) => {
        const titleMatch = service.title?.toLowerCase().includes(term);
        const categoryMatch = service.category?.name
          ?.toLowerCase()
          .includes(term);
        const descMatch = service.description?.toLowerCase().includes(term);
        return titleMatch || categoryMatch || descMatch;
      })
      .slice(0, 8);
  }, [allServices, query]);

  // Close on click outside or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOpenMobileSearch = () => {
    setIsOpen((prev) => !prev);
    setTimeout(() => inputRef.current?.focus(), 60);
  };

  const handleSelectService = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/shop/${slug}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    setIsOpen(false);
    if (trimmed) {
      router.push(`/shop?searchTerm=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/shop");
    }
  };

  return (
    <div ref={containerRef} className="relative font-montserrat">
      {/* Desktop Inline Search Bar */}
      <form
        onSubmit={handleFormSubmit}
        className="hidden md:flex items-center relative w-52 lg:w-64 xl:w-72"
      >
        <Search className="size-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder="Search services..."
          className="w-full h-10 pl-9 pr-8 rounded-full border border-zinc-200 bg-gradient-to-b from-white to-zinc-100/90 text-xs sm:text-sm text-zinc-800 placeholder:text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_3px_rgba(0,0,0,0.06)] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/15 transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 cursor-pointer"
          >
            <X className="size-3.5" />
          </button>
        )}
      </form>

      {/* Mobile Search Trigger Button */}
      <button
        type="button"
        onClick={handleOpenMobileSearch}
        aria-label="Search services"
        className="md:hidden cursor-pointer size-10 flex items-center justify-center rounded-full border border-zinc-200 bg-gradient-to-b from-white to-zinc-100 text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:text-primary hover:to-zinc-50 active:scale-95"
      >
        <Search className="size-4.5" />
      </button>

      {/* Dropdown Panel (Desktop & Mobile) */}
      {isOpen && (
        <div className="fixed inset-x-3 top-17 md:absolute md:inset-x-auto md:right-0 md:top-12 md:w-96 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.16)] overflow-hidden z-50">
          {/* Mobile Input Header */}
          <form
            onSubmit={handleFormSubmit}
            className="md:hidden p-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2"
          >
            <div className="relative flex-1">
              <Search className="size-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search services..."
                autoFocus
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-primary"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-2.5 py-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-800"
            >
              Close
            </button>
          </form>

          {/* Section Header */}
          <div className="px-4 py-2.5 bg-zinc-50/80 dark:bg-zinc-800/50 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="size-3 text-primary" />
              {query.trim() ? "Matching Services" : "Available Services"}
            </span>
            {(isLoading || isFetching) && (
              <Loader2 className="size-3.5 text-primary animate-spin" />
            )}
          </div>

          {/* Results Body */}
          <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {isLoading ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <Loader2 className="size-6 text-primary animate-spin mb-2" />
                <p className="text-xs text-zinc-500">Searching services...</p>
              </div>
            ) : filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const imgUrl = service.images?.[0]?.url || "/placeholder.jpg";
                const price = getStartingPrice(service);

                return (
                  <button
                    key={service.id || service.slug}
                    type="button"
                    onClick={() => handleSelectService(service.slug)}
                    className="w-full p-3 flex items-center gap-3 hover:bg-primary/[0.04] dark:hover:bg-zinc-800/60 transition-colors text-left group cursor-pointer"
                  >
                    <div className="relative size-12 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/80 dark:border-zinc-700">
                      <Image
                        src={imgUrl}
                        alt={service.title}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors truncate">
                        {service.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {service.category?.name && (
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                            {service.category.name}
                          </span>
                        )}
                        <span className="text-xs font-bold text-primary">
                          {price}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="size-4 text-zinc-300 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                  </button>
                );
              })
            ) : (
              <div className="py-9 px-4 text-center">
                <div className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto mb-2">
                  <PackageSearch className="size-5" />
                </div>
                <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                  No services found
                </p>
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  No match for &ldquo;{query}&rdquo;. Try another keyword.
                </p>
              </div>
            )}
          </div>

          {/* Footer Link */}
          <div className="p-2.5 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800">
            <Link
              href={
                query.trim()
                  ? `/shop?searchTerm=${encodeURIComponent(query.trim())}`
                  : "/shop"
              }
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-3 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <span>
                {query.trim()
                  ? `View all results for "${query.trim()}"`
                  : "Browse All Services"}
              </span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
