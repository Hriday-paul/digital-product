import { IMeta, IService } from "@/redux/types";
import ServiceItems from "./ServiceItems";
import { Package } from "lucide-react";

interface ShopContainerProps {
  servicePromise: Promise<{ data: { data: IService[]; meta: IMeta } }>;
  query: { [key: string]: string | undefined };
  selectedCategory?: string;
}

async function ShopContainer({
  servicePromise,
  query,
  selectedCategory,
}: ShopContainerProps) {
  const data = await servicePromise;
  const services = data?.data?.data || [];
  const meta = data?.data?.meta;
  const total = meta?.total ?? services.length;

  return (
    <div className="space-y-5">
      {/* Top Results Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 shadow-xs">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-montserrat">
          <Package className="size-4 text-primary" />
          <span>
            Showing <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{services.length}</strong>
            {total > 0 && total !== services.length && (
              <> of <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{total}</strong></>
            )}{" "}
            services
          </span>
        </div>

        {selectedCategory && (
          <div className="text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-montserrat font-medium">
            Category filtered
          </div>
        )}
      </div>

      {/* Grid of Services with Infinite Scroll */}
      <ServiceItems
        query={query}
        initialData={services}
        initialMeta={meta}
        selectedCategory={selectedCategory}
        key={JSON.stringify(query)}
      />
    </div>
  );
}

export default ShopContainer;