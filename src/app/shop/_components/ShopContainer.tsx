import { IMeta, IService } from "@/redux/types";
import ServiceItems from "./ServiceItems";
import ShopToolbar from "./ShopToolbar";

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
    <div className="space-y-6">
      {/* Interactive Top Results & Search Bar */}
      <ShopToolbar
        shownCount={services.length}
        totalCount={total}
        selectedCategory={selectedCategory}
        initialSearch={query?.searchTerm || ""}
      />

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
