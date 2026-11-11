"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import slide1 from "@/assets/Home/banner/slide1.jpg";
import slide2 from "@/assets/Home/banner/slide2.jpg";
import { IBanner } from "@/redux/types";

interface Section1Props {
  banners?: IBanner[];
}

export default function Section1({ banners = [] }: Section1Props) {
  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  // Fallback slides if no banners returned from API
  const defaultSlides = [
    {
      id: "fallback-1",
      url: slide1,
      link: "/shop",
      alt: "AsifZoneBd Banner 1 - Discover Digital Products & Services",
    },
    {
      id: "fallback-2",
      url: slide2,
      link: "/shop",
      alt: "AsifZoneBd Banner 2 - Special Deals & Offers",
    },
  ];

  const slides =
    banners && banners.length > 0
      ? banners.map((b, idx) => ({
          id: b.id || `banner-${idx}`,
          url: b.url,
          link: b.link || "/shop",
          alt: `AsifZoneBd Banner ${idx + 1}`,
        }))
      : defaultSlides;

  return (
    <section aria-label="Hero Banner" className="w-full py-4 md:py-6">
      <div className="container mx-auto">
        <Carousel
          plugins={[autoplay.current]}
          opts={{
            loop: true,
            align: "start",
          }}
          className="relative w-full group overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800"
        >
          <CarouselContent className="-ml-0">
            {slides.map((slide, index) => (
              <CarouselItem key={slide.id} className="pl-0">
                <Link
                  href={slide.link || "/shop"}
                  className="block relative w-full aspect-[16/8] sm:aspect-[21/9] lg:aspect-[2.35/1] overflow-hidden bg-zinc-100 dark:bg-zinc-900"
                >
                  <Image
                    src={slide.url}
                    alt={slide.alt}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1280px"
                    className="object-cover object-center select-none transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons (only if more than 1 slide) */}
          {slides.length > 1 && (
            <>
              <CarouselPrevious
                variant="outline"
                size="icon"
                className="left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 size-8 sm:size-10 md:size-11 bg-white/85 hover:bg-white text-zinc-800 hover:text-black dark:bg-zinc-900/85 dark:hover:bg-zinc-900 dark:text-zinc-100 border-0 shadow-md backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
              >
                <ChevronLeft className="size-4 sm:size-6" />
                <span className="sr-only">Previous banner slide</span>
              </CarouselPrevious>

              <CarouselNext
                variant="outline"
                size="icon"
                className="right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 size-8 sm:size-10 md:size-11 bg-white/85 hover:bg-white text-zinc-800 hover:text-black dark:bg-zinc-900/85 dark:hover:bg-zinc-900 dark:text-zinc-100 border-0 shadow-md backdrop-blur-xs transition-all duration-200 hover:scale-105 active:scale-95 z-20 cursor-pointer"
              >
                <ChevronRight className="size-4 sm:size-6" />
                <span className="sr-only">Next banner slide</span>
              </CarouselNext>

              {/* Carousel Dots */}
              <CarouselDots
                className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-20 bg-black/35 dark:bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full"
                activeDotClassName="bg-primary w-6 h-2 shadow-sm"
                dotClassName="bg-white/60 hover:bg-white/90 w-2 h-2"
              />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
}
