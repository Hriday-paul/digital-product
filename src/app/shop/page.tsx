import { GetServices } from "@/lib/services/Service.api";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Sparkles, Zap, Headset } from "lucide-react";
import ShopContainer from "./_components/ShopContainer";
import ServiceLoading from "./_components/ServiceLoading";
import CategoryFilterServer from "./_components/CategoryFilterServer";
import CategoryFilterSkeleton from "./_components/CategoryFilterSkeleton";

export const metadata: Metadata = {
  title: "Shop & Digital Services",
  description:
    "Explore our complete catalog of digital tools, services, subscriptions, and accounts. Filter by category and find the best offers.",
};

export default async function ShopPage({
  searchParams: ssp,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const searchParams = await ssp;

  const limit = searchParams?.limit || "21";
  const sort = searchParams?.sort;
  const page = searchParams?.page || "1";
  const category = searchParams?.category;
  const searchTerm = searchParams?.searchTerm;

  const query: Record<string, string> = {
    page,
    limit,
  };

  if (category) {
    query.category = category;
  }
  if (sort) {
    query.sort = sort;
  }
  if (searchTerm) {
    query.searchTerm = searchTerm;
  }

  // Fetch services promise for ShopContainer
  const servicePromise = GetServices({ query });

  return (
    <div className="min-h-screen bg-[#F7F9FB] dark:bg-zinc-950 pb-16 md:pb-24 font-montserrat">
      {/* Modern Shop Hero Banner */}
      <section className="relative overflow-hidden bg-white dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 py-8 sm:py-12">
        {/* Decorative Background Accents */}
        <div className="absolute -top-24 -right-24 size-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

        <div className="container mx-auto relative">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 mb-3"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3.5 text-zinc-400" />
            <span className="text-zinc-900 dark:text-zinc-100 font-semibold">
              Shop
            </span>
            {category && (
              <>
                <ChevronRight className="size-3.5 text-zinc-400" />
                <span className="text-primary font-semibold truncate max-w-[180px] sm:max-w-xs">
                  {category}
                </span>
              </>
            )}
          </nav>

          {/* Title, Description & Trust Badges */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2.5">
                <Sparkles className="size-3.5" />
                <span>Premium Digital Marketplace</span>
              </div>
              <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl text-zinc-900 dark:text-white tracking-tight">
                {category ? category : "All Services & Digital Products"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
                Discover authentic digital tools, verified accounts, and premium subscriptions tailored to supercharge your workflow.
              </p>
            </div>

            {/* Quick Trust Pills */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                <Zap className="size-4 text-amber-500" />
                <span>Fast Delivery</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                <ShieldCheck className="size-4 text-emerald-500" />
                <span>100% Verified</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-200">
                <Headset className="size-4 text-primary" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Section */}
      <div className="container mx-auto mt-6 sm:mt-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left Category Filter (Suspense Server Query) */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0">
            <Suspense fallback={<CategoryFilterSkeleton />}>
              <CategoryFilterServer selectedCategory={category} />
            </Suspense>
          </aside>

          {/* Right Services Grid */}
          <main className="flex-1 min-w-0 w-full">
            <Suspense fallback={<ServiceLoading />}>
              <ShopContainer
                servicePromise={servicePromise}
                query={query}
                selectedCategory={category}
              />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  );
}
