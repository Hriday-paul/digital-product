import Section1 from "@/components/Home/Section1/Section1";
import Section2 from "@/components/Home/Section2/Section2";
import Section3 from "@/components/Home/Section3/Section3";
import Section4 from "@/components/Home/Section4/Section4";
import Section5 from "@/components/Home/Section5/Section5";
import Section6 from "@/components/Home/Section6/Section6";
import { GetServices } from "@/lib/services/Service.api";
import { GetCategories } from "@/lib/services/Category.api";

export default async function Home() {
  // Server-side render 1st page data for services and categories
  const [servicesRes, categoriesRes] = await Promise.all([
    GetServices({ query: { page: "1", limit: "8" } }).catch(() => null),
    GetCategories().catch(() => null),
  ]);

  const initialServices = servicesRes?.data?.data || [];
  const initialCategories = categoriesRes?.data || [];

  return (
    <div>
      <Section1 />
      <Section2 />
      <Section3
        initialServices={initialServices}
        initialCategories={initialCategories}
      />
      <Section4 />
      <Section5 />
      <Section6 />
    </div>
  );
}
