"use client";

import { IMeta, IService } from "@/redux/types";
import useLazyLoad from "@/shared/LazyLoadAd";
import { useRef } from "react";
import Link from "next/link";
import ServiceCard from "@/shared/ServiceCard";
import { useLazyServicesQuery } from "@/redux/api/Service.api";
import { PackageSearch, RotateCcw } from "lucide-react";

interface ServiceItemsProps {
  query: { [key: string]: string | undefined };
  initialData: IService[];
  initialMeta?: IMeta;
  selectedCategory?: string;
}

function ServiceItems({
  query,
  initialData,
  initialMeta,
  selectedCategory,
}: ServiceItemsProps) {
  const [loadServices, { isLoading }] = useLazyServicesQuery();
  const triggerRef = useRef<HTMLDivElement>(null);

  const loadNextPage = async (page: number) => {
    try {
      query.page = page.toString();

      const res = await loadServices(query).unwrap();
      const data = res?.data?.data || [];
      const meta = res?.data?.meta;

      // No meta or no data back -> treat as end of list
      const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

      return { data, hasMore };
    } catch {
      return { data: [], hasMore: false };
    }
  };

  const { data, hasMore } = useLazyLoad<IService>({
    triggerRef,
    onGrabData: loadNextPage,
    options: {},
    initialData: initialData,
    initialPage: initialMeta?.page ? initialMeta.page + 1 : 2,
    initialHasMore: initialMeta ? initialMeta.page < initialMeta.totalPage : false,
  });

  return (
    <div>
      {/* Empty State */}
      {data?.length === 0 && !isLoading && (
        <div className="min-h-[360px] flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-center shadow-xs">
          <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
            <PackageSearch className="size-8" />
          </div>
          <h3 className="font-montserrat font-bold text-lg sm:text-xl text-zinc-900 dark:text-zinc-100">
            No services found
          </h3>
          <p className="mt-2 text-sm text-zinc-500 font-montserrat max-w-sm">
            {selectedCategory
              ? "We couldn't find any services in this category. Try selecting another category or clear your filter."
              : "No services are currently available in the store. Please check back soon."}
          </p>
          {selectedCategory && (
            <Link
              href="/shop"
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-montserrat font-medium text-xs sm:text-sm shadow-xs transition-all hover:scale-105 active:scale-95"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset Category Filter</span>
            </Link>
          )}
        </div>
      )}

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
        {data?.map((service) => (
          <ServiceCard key={service?.id || service?.slug} service={service} />
        ))}
        {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}
      </div>

      {/* Loading Spinner during infinite scroll */}
      {isLoading && hasMore && (
        <div className="flex items-center justify-center py-10">
          <div className="size-8 rounded-full border-2 border-zinc-200 border-t-primary animate-spin" />
        </div>
      )}
    </div>
  );
}

export default ServiceItems;