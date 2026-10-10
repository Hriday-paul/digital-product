import { GetServices } from "@/lib/services/Service.api";
import { Metadata } from "next";
import React, { Suspense } from "react";
import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import ShopContainer from "./_components/ShopContainer";
import ServiceLoading from "./_components/ServiceLoading";
import CategoryFilterServer from "./_components/CategoryFilterServer";
import CategoryFilterSkeleton from "./_components/CategoryFilterSkeleton";

export const metadata: Metadata = {
  title: "Shop & Digital Services",
  description:
    "Explore our complete catalog of digital tools, services, subscriptions, and accounts. Filter by category and find the best offers.",
};

export default async function ShopPage({ searchParams: ssp }: { searchParams: Promise<{ [key: string]: string }> }) {
  const searchParams = await ssp;

  const limit = searchParams?.limit || "21";
  const sort = searchParams?.sort;
  const page = searchParams?.page || "1";
  const category = searchParams?.category;

  const query: any = {
    page,
    limit,
  };

  if (category) {
    query.category = category;
  }
  if (sort) {
    query.sort = sort;
  }

  // Fetch services promise for ShopContainer
  const servicePromise = GetServices({ query });

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 pb-16 md:pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-b border-zinc-200/60 dark:border-zinc-800/60 py-8 sm:py-12">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 font-montserrat mb-3">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3.5 text-zinc-400" />
            <span className="text-primary font-medium">Shop</span>
          </nav>

          {/* Title & Description */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-montserrat font-semibold mb-2">
                <Sparkles className="size-3.5" />
                <span>Digital Marketplace</span>
              </div>
              <h1 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-zinc-900 dark:text-white tracking-tight">
                All Services & Digital Products
              </h1>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-montserrat max-w-2xl leading-relaxed">
                Discover reliable digital tools, accounts, premium subscriptions, and creative assets designed to accelerate your growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shop Section */}
      <div className="container mx-auto mt-6 sm:mt-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left Category Filter (Suspense Server Query) */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0">
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