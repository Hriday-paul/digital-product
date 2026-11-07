"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { IService } from "@/redux/types";
import { RootState } from "@/redux/store";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";

const ServiceCard = ({ service, className }: { service: IService; className?: string }) => {
  const { id, slug, title, variants, images } = service;
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlistSlice.items);

  const isWishlisted = wishlistItems.some(
    (item) => (id && item.id === id) || (slug && item.slug === slug)
  );

  const minVariantPrice = variants?.length
    ? [...variants].sort((a, b) => a.final_price - b.final_price)[0]?.final_price
    : undefined;

  const displayPrice = minVariantPrice ? `৳${minVariantPrice.toFixed(2)}` : "৳0";

  const image = images?.[0]?.url || "/placeholder.jpg";

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(service));
    if (isWishlisted) {
      toast.info(`${title} removed from wishlist`);
    } else {
      toast.success(`${title} added to wishlist!`);
    }
  };

  return (
    <div
      className={cn(
        "group relative flex min-w-0 flex-col overflow-hidden rounded-xs sm:rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300",
        className
      )}
    >
      {/* Wishlist Button */}
      <button
        type="button"
        onClick={handleToggleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className={cn(
          "absolute top-2.5 right-2.5 z-10 size-8 sm:size-9 rounded-full flex items-center justify-center border shadow-xs backdrop-blur-xs transition-all duration-200 cursor-pointer active:scale-90",
          isWishlisted
            ? "bg-rose-500 text-white border-rose-500 hover:bg-rose-600"
            : "bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700 hover:text-rose-500 hover:border-rose-300"
        )}
      >
        <Heart className={cn("size-4 transition-transform", isWishlisted && "fill-current scale-110")} />
      </button>

      {/* Edge-to-edge Top Image */}
      <Link
        href={`/shop/${slug}`}
        className="relative block w-full aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800"
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </Link>

      {/* Card Content (Centered) */}
      <div className="flex flex-col items-center justify-between text-center p-4 sm:p-5 flex-1">
        {/* Title */}
        <Link href={`/shop/${slug}`} className="block w-full">
          <h3 className="font-montserrat font-medium text-[15px] sm:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-text-blue transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        {/* Price */}
        <p className="mt-2.5 font-montserrat font-semibold text-base sm:text-[17px] text-text-blue ">
          {displayPrice}
        </p>

        {/* Select options Button */}
        <Link
          href={`/shop/${slug}`}
          className="mt-4 sm:mt-5 inline-flex items-center justify-center px-6 py-2.5 bg-primary hover:bg-primary/80 text-white font-montserrat font-semibold text-sm rounded-xs sm:rounded-sm transition-all duration-200 shadow-xs hover:shadow-md hover:scale-[1.02] active:scale-[0.98] w-fit"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;