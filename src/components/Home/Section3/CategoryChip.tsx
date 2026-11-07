"use client";

import { cn } from "@/lib/utils";
import { ICategory } from "@/redux/types";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Layers } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CategoryChipsProps = {
  categories: ICategory[];
  defaultCategory?: string;
  onSelectCategory?: (category: string) => void;
};

const CategoryChip = ({
  categories = [],
  defaultCategory,
  onSelectCategory,
}: CategoryChipsProps) => {
  const router = useRouter();

  const handleClick = (categoryName: string) => {
    if (onSelectCategory) {
      onSelectCategory(categoryName);
      return;
    }
    router.push(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  if (!categories?.length) return null;

  return (
    <div className="relative w-full px-9 sm:px-11 overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2.5 sm:-ml-3 py-1">
          {categories.map((category) => {
            const isActive = defaultCategory === category?.name;
            return (
              <CarouselItem
                key={category?.id || category?.name}
                className="pl-2.5 sm:pl-3 basis-auto"
              >
                <button
                  type="button"
                  onClick={() => handleClick(category?.name || "")}
                  className={cn(
                    "group inline-flex items-center gap-2 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-montserrat font-semibold transition-all duration-200 cursor-pointer select-none whitespace-nowrap border shadow-2xs",
                    isActive
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:text-primary"
                  )}
                >
                  <Layers className="size-3.5 sm:size-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>{category?.name}</span>
                  {typeof category?.services?.length === "number" && (
                    <span className="ml-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-primary/15 px-2 py-0.5 text-[11px] font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-primary transition-colors">
                      {category.services.length}
                    </span>
                  )}
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious
          variant="outline"
          size="icon"
          className="-left-8 sm:-left-10 top-1/2 -translate-y-1/2 size-7 sm:size-8 rounded-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-primary hover:text-white hover:border-primary shadow-xs disabled:opacity-40 cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </CarouselPrevious>

        <CarouselNext
          variant="outline"
          size="icon"
          className="-right-8 sm:-right-10 top-1/2 -translate-y-1/2 size-7 sm:size-8 rounded-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-primary hover:text-white hover:border-primary shadow-xs disabled:opacity-40 cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryChip;