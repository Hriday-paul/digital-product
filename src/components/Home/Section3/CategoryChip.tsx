"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ICategory } from "@/redux/types";
import { useRouter } from "next/navigation";

type CategoryChipsProps = {
  categories: ICategory[];
  defaultCategory?: string;
  onSelectCategory?: (category: string) => void;
};

const CategoryChip = ({
  categories,
}: CategoryChipsProps) => {

  const cats = categories?.slice(0, 5) || [];

  const router = useRouter();

  const handleClick = (category: string) => {
    router.push(`/shop?category=${category}`);
  };

  return (
    <div className="mx-auto flex max-w-275 flex-wrap items-center justify-center gap-2 sm:gap-3">
      {cats.map((category) => (
        <button
          key={category?.id}
          type="button"
          onClick={() => handleClick(category?.name || "")}
          className={cn(
            "rounded-full px-4 py-2 text-sm transition-all sm:px-3.5 sm:py-2 font-montserrat font-medium cursor-pointer", "bg-gray-100 text-neutral-700 hover:bg-gray-200 hover:text-black dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          )}
        >
          {category?.name}
        </button>
      ))}
      <Link
        href="/shop"
        className="px-3 py-2 text-sm font-semibold text-primary hover:underline sm:text-base font-montserrat inline-flex items-center transition-colors"
      >
        + More
      </Link>
    </div>
  );
};

export default CategoryChip;