
import { GetCategories } from "@/lib/services/Category.api";
import CategoryFilterClient from "./CategoryFilterClient";

export default async function CategoryFilterServer({
  selectedCategory,
}: {
  selectedCategory?: string;
}) {
  const res = await GetCategories();
  const categories = res?.data || [];

  return (
    <CategoryFilterClient
      categories={categories}
      selectedCategory={selectedCategory}
    />
  );
}

