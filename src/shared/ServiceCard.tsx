import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IService } from "@/redux/types";

const ServiceCard = ({ service, className }: { service: IService; className?: string }) => {
  const { slug, title, variants, images } = service;

  const minVariantPrice = variants?.sort((a, b) => a.final_price - b.final_price)[0]?.final_price;

  const displayPrice = minVariantPrice ? `৳${minVariantPrice.toFixed(2)}` : "৳0";
  
  const image = images?.[0]?.url || "/placeholder.jpg";

  return (
    <div
      className={cn(
        "group relative flex min-w-0 flex-col overflow-hidden rounded-xs sm:rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xs hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300",
        className
      )}
    >
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