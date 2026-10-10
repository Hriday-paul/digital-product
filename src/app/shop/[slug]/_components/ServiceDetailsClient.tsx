"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IService, IServiceVariant } from "@/redux/types";
import {
  ChevronRight,
  ShieldCheck,
  Zap,
  Headphones,
  Check,
  CreditCard,
  Info,
  Clock,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const getBadgeDetails = (badge: string) => {
  const normalized = String(badge).toUpperCase().trim();
  switch (normalized) {
    case "BEST_VALUE":
      return { label: "Best Value", className: "bg-emerald-600 text-white shadow-xs" };
    case "BEST_DEAL":
      return { label: "Best Deal", className: "bg-emerald-600 text-white shadow-xs" };
    case "MOST_POPULAR":
      return { label: "Most Popular", className: "bg-primary text-white shadow-xs" };
    case "TOP_PICK":
      return { label: "Top Pick", className: "bg-primary text-white shadow-xs" };
    case "RECOMMENDED":
      return { label: "Recommended", className: "bg-primary text-white shadow-xs" };
    case "PREMIUM":
      return { label: "Premium", className: "bg-purple-600 text-white shadow-xs" };
    case "EXCLUSIVE":
      return { label: "Exclusive", className: "bg-purple-600 text-white shadow-xs" };
    case "SPECIAL_OFFER":
      return { label: "Special Offer", className: "bg-rose-500 text-white shadow-xs" };
    case "LIMITED_STOCK":
      return { label: "Limited Stock", className: "bg-rose-500 text-white shadow-xs" };
    case "NEW":
      return { label: "New", className: "bg-amber-500 text-white shadow-xs" };
    case "TRENDING":
      return { label: "Trending", className: "bg-orange-500 text-white shadow-xs" };
    default:
      return {
        label: normalized
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        className: "bg-primary text-white shadow-xs",
      };
  }
};

const formatPrice = (val?: number) => {
  if (val === undefined || val === null || isNaN(val)) return "0";
  return Number.isInteger(val) ? val.toString() : val.toFixed(2);
};

interface ServiceDetailsClientProps {
  service: IService;
}

export default function ServiceDetailsClient({ service }: ServiceDetailsClientProps) {
  const { title, description, note, category, images, variants } = service;

  // Selected variant state (defaults to first variant or fallback)
  const [selectedVariant, setSelectedVariant] = useState<IServiceVariant | undefined>(
    variants && variants.length > 0 ? variants[0] : undefined
  );

  // Selected image index state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages =
    images && images.length > 0
      ? images
      : [{ id: "fallback", url: "/serviceImg.webp", key: "fallback" }];

  const currentImageUrl = displayImages[activeImageIndex]?.url || "/serviceImg.webp";

  const router = useRouter();

  const handleBuyNow = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant to continue");
      return;
    }
    router.push(`/checkout/${service.slug}?varientId=${selectedVariant.id}`);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 pb-16 md:pb-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-3.5">
        <div className="container mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-zinc-500 font-montserrat"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3.5 text-zinc-400" />
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            {category && (
              <>
                <ChevronRight className="size-3.5 text-zinc-400" />
                <Link
                  href={`/shop?category=${category?.name}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="size-3.5 text-zinc-400" />
            <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-xs sm:max-w-md">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Product / Service Container */}
      <div className="container mx-auto mt-6 sm:mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
              <Image
                src={currentImageUrl}
                alt={title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover"
              />
            </div>

            {/* Thumbnail Preview Selector */}
            {displayImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {displayImages.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      "relative size-18 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer bg-white dark:bg-zinc-900",
                      activeImageIndex === idx
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 opacity-70 hover:opacity-100"
                    )}
                  >
                    <Image
                      src={img.url}
                      alt={`${title} thumbnail ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information, Variants & Actions */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Category Pill */}
            {category && (
              <div className="mb-2.5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold font-montserrat bg-primary/10 text-primary">
                  {category.name}
                </span>
              </div>
            )}

            {/* Service Title */}
            <h1 className="font-montserrat font-extrabold text-xl sm:text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              {title}
            </h1>

            {/* Price Display for Selected Variant */}
            <div className="mt-4 flex flex-wrap items-baseline gap-3 pb-6 border-b border-zinc-200 dark:border-zinc-800">
              {selectedVariant ? (
                <>
                  <span className="font-montserrat font-extrabold text-3xl sm:text-4xl text-primary">
                    ৳{formatPrice(selectedVariant.final_price)}
                  </span>
                  {selectedVariant.base_price > selectedVariant.final_price && (
                    <>
                      <span className="text-lg sm:text-xl font-medium text-zinc-400 line-through font-montserrat">
                        ৳{formatPrice(selectedVariant.base_price)}
                      </span>
                      {selectedVariant.discount > 0 && (
                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-100 text-green-700 font-montserrat">
                          Save {selectedVariant.discount}%
                        </span>
                      )}
                    </>
                  )}
                </>
              ) : (
                <span className="font-montserrat font-bold text-2xl text-primary">
                  ৳{service.minPrice} – ৳{service.maxPrice}
                </span>
              )}
            </div>

            {/* Variant Select Options */}
            {variants && variants.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold font-montserrat text-zinc-900 dark:text-zinc-100">
                    Select Plan / Option:
                  </label>
                  {selectedVariant && (
                    <span className="text-xs font-montserrat text-primary font-medium">
                      Selected: {selectedVariant.timeLine}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {variants.map((v) => {
                    const isSelected = selectedVariant?.id === v.id;
                    const primaryBadge = v.badges && v.badges.length > 0 ? getBadgeDetails(v.badges[0]) : null;

                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        className={cn(
                          "relative flex flex-col justify-between p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer min-h-[110px]",
                          isSelected
                            ? "border-primary bg-primary/[0.04] shadow-xs ring-1 ring-primary/20"
                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                      >
                        {/* Floating Top Badge */}
                        {primaryBadge && (
                          <div className="absolute -top-2.5 right-3.5 z-10">
                            <span
                              className={cn(
                                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-montserrat tracking-wide uppercase shadow-xs",
                                primaryBadge.className
                              )}
                            >
                              <Sparkles className="size-2.5" />
                              <span>{primaryBadge.label}</span>
                            </span>
                          </div>
                        )}

                        {/* Top: Timeline & Checkmark */}
                        <div>
                          <div className="flex items-center justify-between gap-2 pr-1">
                            <span className="font-montserrat font-bold text-sm sm:text-[15px] text-zinc-900 dark:text-zinc-100">
                              {v.timeLine}
                            </span>
                            <div
                              className={cn(
                                "size-5 rounded-full flex items-center justify-center shrink-0 transition-colors",
                                isSelected
                                  ? "bg-primary text-white"
                                  : "border-2 border-zinc-300 dark:border-zinc-600"
                              )}
                            >
                              {isSelected && <Check className="size-3 stroke-[3]" />}
                            </div>
                          </div>

                          {/* Account Type Subtitle */}
                          {v.accountType && (
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-montserrat mt-0.5 font-medium">
                              {v.accountType.toLowerCase() === "personal"
                                ? "Personal License"
                                : v.accountType.toLowerCase() === "business"
                                ? "Business License"
                                : v.accountType}
                            </p>
                          )}
                        </div>

                        {/* Bottom Row: Price & Discount */}
                        <div className="mt-3 flex items-baseline gap-2">
                          <span className="font-montserrat font-extrabold text-lg text-primary">
                            ৳{formatPrice(v.final_price)}
                          </span>
                          {v.base_price > v.final_price && (
                            <span className="text-xs text-zinc-400 line-through font-montserrat">
                              ৳{formatPrice(v.base_price)}
                            </span>
                          )}
                          {v.discount > 0 && (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-montserrat">
                              -{v.discount}%
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Variant Note */}
                {selectedVariant?.note && (
                  <div className="mt-3.5 flex items-start gap-2 p-3 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs font-montserrat text-blue-900 dark:text-blue-300">
                    <Info className="size-4 shrink-0 text-primary mt-0.5" />
                    <span>{selectedVariant.note}</span>
                  </div>
                )}
              </div>
            )}

            {/* Buy Now Action */}
            <div className="mt-8 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-4 px-8 rounded-xl bg-primary hover:bg-[#1577b0] active:scale-[0.99] text-white font-montserrat font-bold text-base sm:text-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <CreditCard className="size-5" />
                <span>
                  Buy Now {selectedVariant ? `• ৳${formatPrice(selectedVariant.final_price)}` : ""}
                </span>
              </button>
            </div>

            {/* Trust & Guarantee Highlights */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5 text-xs font-montserrat text-zinc-600 dark:text-zinc-400">
                <Zap className="size-4 text-primary shrink-0" />
                <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-montserrat text-zinc-600 dark:text-zinc-400">
                <ShieldCheck className="size-4 text-primary shrink-0" />
                <span>Verified & Secure</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-montserrat text-zinc-600 dark:text-zinc-400">
                <Headphones className="size-4 text-primary shrink-0" />
                <span>24/7 Dedicated Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description & Information Section */}
        <div className="mt-12 sm:mt-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 md:p-10 shadow-xs">
          <h2 className="font-montserrat font-bold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            Service Description & Information
          </h2>

          <div className="mt-6 prose prose-zinc dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 font-montserrat whitespace-pre-line">
            {description}
          </div>

          {/* Service Note (if present) */}
          {note && (
            <div className="mt-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
              <div className="flex items-center gap-2 font-bold font-montserrat text-sm mb-1">
                <Info className="size-4 text-amber-600 dark:text-amber-400" />
                <span>Important Note:</span>
              </div>
              <p className="text-xs sm:text-sm font-montserrat">{note}</p>
            </div>
          )}

          {/* Specifications Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 font-montserrat block">Category</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-montserrat mt-0.5 block">
                {category?.name || "General"}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 font-montserrat block">Account Type</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-montserrat mt-0.5 block flex items-center gap-1.5">
                <UserCheck className="size-3.5 text-primary" />
                {selectedVariant?.accountType || "Standard"}
              </span>
            </div>
            <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 font-montserrat block">Selected Validity</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-montserrat mt-0.5 block flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" />
                {selectedVariant?.timeLine || "Standard"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

