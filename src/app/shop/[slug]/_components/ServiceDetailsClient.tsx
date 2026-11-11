"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { IService, IServiceVariant } from "@/redux/types";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";
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
  ShoppingCart,
  Minus,
  Plus,
  Heart,
  Share2,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const getBadgeDetails = (badge: string) => {
  const normalized = String(badge).toUpperCase().trim();
  switch (normalized) {
    case "BEST_VALUE":
      return { label: "Best Value", className: "bg-emerald-600 text-white" };
    case "BEST_DEAL":
      return { label: "Best Deal", className: "bg-emerald-600 text-white" };
    case "MOST_POPULAR":
      return { label: "Popular", className: "bg-primary text-white" };
    case "TOP_PICK":
      return { label: "Top Pick", className: "bg-primary text-white" };
    case "RECOMMENDED":
      return { label: "Recommended", className: "bg-primary text-white" };
    case "PREMIUM":
      return { label: "Premium", className: "bg-purple-600 text-white" };
    case "EXCLUSIVE":
      return { label: "Exclusive", className: "bg-purple-600 text-white" };
    case "SPECIAL_OFFER":
      return { label: "Special Offer", className: "bg-rose-500 text-white" };
    case "LIMITED_STOCK":
      return { label: "Limited", className: "bg-rose-500 text-white" };
    case "NEW":
      return { label: "New", className: "bg-amber-500 text-white" };
    case "TRENDING":
      return { label: "Trending", className: "bg-orange-500 text-white" };
    default:
      return {
        label: normalized
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        className: "bg-primary text-white",
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

export default function ServiceDetailsClient({
  service,
}: ServiceDetailsClientProps) {
  const { title, description, note, category, images, variants } = service;

  const [selectedVariant, setSelectedVariant] = useState<
    IServiceVariant | undefined
  >(variants && variants.length > 0 ? variants[0] : undefined);

  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const displayImages =
    images && images.length > 0
      ? images
      : [{ id: "fallback", url: "/serviceImg.webp", key: "fallback" }];

  const currentImageUrl =
    displayImages[activeImageIndex]?.url || "/serviceImg.webp";
  const primaryPhoto = displayImages[0]?.url || "/serviceImg.webp";

  const router = useRouter();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state: RootState) => state.wishlistSlice.items
  );

  const isWishlisted = wishlistItems.some(
    (item) =>
      (service.id && item.id === service.id) ||
      (service.slug && item.slug === service.slug)
  );

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(service));
    if (isWishlisted) {
      toast.info(`${service.title} removed from wishlist`);
    } else {
      toast.success(`${service.title} added to wishlist!`);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error("Please select a plan first");
      return;
    }

    dispatch(
      addToCart({
        serviceId: service.id,
        slug: service.slug,
        title: service.title,
        photo: primaryPhoto,
        categoryName: service.category?.name,
        variant: selectedVariant,
        quantity,
      })
    );

    toast.success(`${service.title} (${selectedVariant.timeLine}) added to cart!`);
  };

  const handleBuyNow = () => {
    if (!selectedVariant) {
      toast.error("Please select a plan first");
      return;
    }

    dispatch(
      addToCart({
        serviceId: service.id,
        slug: service.slug,
        title: service.title,
        photo: primaryPhoto,
        categoryName: service.category?.name,
        variant: selectedVariant,
        quantity,
      })
    );

    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-zinc-950 pb-12 font-montserrat">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 py-3">
        <div className="container mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-zinc-500 overflow-hidden"
          >
            <Link href="/" className="hover:text-primary transition-colors shrink-0">
              Home
            </Link>
            <ChevronRight className="size-3.5 text-zinc-400 shrink-0" />
            <Link href="/shop" className="hover:text-primary transition-colors shrink-0">
              Shop
            </Link>
            {category && (
              <>
                <ChevronRight className="size-3.5 text-zinc-400 shrink-0" />
                <Link
                  href={`/shop?category=${encodeURIComponent(category.name)}`}
                  className="hover:text-primary transition-colors shrink-0 max-w-[160px] truncate"
                >
                  {category.name}
                </Link>
              </>
            )}
            <ChevronRight className="size-3.5 text-zinc-400 shrink-0" />
            <span className="text-zinc-900 dark:text-zinc-100 font-medium truncate max-w-[220px] sm:max-w-md">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Top Card */}
      <div className="container mx-auto mt-4 sm:mt-6 max-w-6xl">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-5 sm:p-6 lg:p-7 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Gallery & Highlights */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shadow-2xs">
                <Image
                  src={currentImageUrl}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 35vw"
                  className="object-cover"
                />

                {/* Wishlist & Share Quick Actions */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <button
                    type="button"
                    onClick={handleShare}
                    title="Share service"
                    aria-label="Share service"
                    className="size-8 rounded-full bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 hover:text-primary border border-zinc-200/80 dark:border-zinc-700 flex items-center justify-center shadow-xs backdrop-blur-xs transition-colors cursor-pointer"
                  >
                    <Share2 className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    title={isWishlisted ? "Remove wishlist" : "Add wishlist"}
                    aria-label="Toggle wishlist"
                    className={cn(
                      "size-8 rounded-full border shadow-xs backdrop-blur-xs flex items-center justify-center transition-colors cursor-pointer",
                      isWishlisted
                        ? "bg-rose-500 text-white border-rose-500"
                        : "bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-700 hover:text-rose-500"
                    )}
                  >
                    <Heart
                      className={cn(
                        "size-4",
                        isWishlisted && "fill-current"
                      )}
                    />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              {displayImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
                  {displayImages.map((img, idx) => (
                    <button
                      key={img.id || idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={cn(
                        "relative size-14 sm:size-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer bg-zinc-50 dark:bg-zinc-950",
                        activeImageIndex === idx
                          ? "border-primary ring-2 ring-primary/20 scale-102"
                          : "border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
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

              {/* Trust Badges */}
              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <Zap className="size-4 text-amber-500 mb-1" />
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Instant Setup
                  </span>
                  <span className="text-[11px] text-zinc-400">Within minutes</span>
                </div>
                <div className="flex flex-col items-center border-x border-zinc-200/70 dark:border-zinc-700">
                  <ShieldCheck className="size-4 text-emerald-500 mb-1" />
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    100% Genuine
                  </span>
                  <span className="text-[11px] text-zinc-400">Guaranteed access</span>
                </div>
                <div className="flex flex-col items-center">
                  <Headphones className="size-4 text-primary mb-1" />
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    Full Support
                  </span>
                  <span className="text-[11px] text-zinc-400">24/7 online</span>
                </div>
              </div>
            </div>

            {/* Right Column: Information, Pricing, Variants & Actions */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              {/* Category & Status */}
              <div className="flex items-center gap-2.5 mb-2">
                {category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary">
                    {category.name}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  <Check className="size-3.5 stroke-[2.5]" /> In Stock & Instant Delivery
                </span>
              </div>

              {/* Title */}
              <h1 className="font-extrabold text-xl sm:text-2xl md:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight leading-snug">
                {title}
              </h1>

              {/* Price Banner */}
              <div className="mt-3.5 p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between gap-3">
                <div className="flex items-baseline gap-2.5">
                  {selectedVariant ? (
                    <>
                      <span className="font-extrabold text-2xl sm:text-3xl text-primary leading-none">
                        ৳{formatPrice(selectedVariant.final_price)}
                      </span>
                      {selectedVariant.base_price > selectedVariant.final_price && (
                        <span className="text-base sm:text-lg font-medium text-zinc-400 line-through">
                          ৳{formatPrice(selectedVariant.base_price)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="font-extrabold text-2xl text-primary">
                      ৳{service.minPrice} – ৳{service.maxPrice}
                    </span>
                  )}
                </div>

                {selectedVariant &&
                  selectedVariant.base_price > selectedVariant.final_price && (
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-2xs">
                      Save {selectedVariant.discount}%
                    </span>
                  )}
              </div>

              {/* Variants Section */}
              {variants && variants.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Choose Plan / Duration:
                    </label>
                    {selectedVariant && (
                      <span className="text-xs text-primary font-bold">
                        Selected: {selectedVariant.timeLine}
                      </span>
                    )}
                  </div>

                  {/* Grid of Plans */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      const primaryBadge =
                        v.badges && v.badges.length > 0
                          ? getBadgeDetails(v.badges[0])
                          : null;

                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={cn(
                            "relative flex items-center justify-between p-3 rounded-xl border text-left transition-all duration-150 cursor-pointer",
                            isSelected
                              ? "border-primary bg-primary/[0.05] shadow-xs ring-1 ring-primary/30"
                              : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700"
                          )}
                        >
                          {primaryBadge && (
                            <span
                              className={cn(
                                "absolute -top-2 right-2.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-2xs",
                                primaryBadge.className
                              )}
                            >
                              {primaryBadge.label}
                            </span>
                          )}

                          <div className="min-w-0 pr-2">
                            <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate block">
                              {v.timeLine}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400 block capitalize mt-0.5">
                              {v.accountType
                                ? `${v.accountType.toLowerCase()} license`
                                : "Standard license"}
                            </span>
                          </div>

                          <div className="flex items-center gap-2.5 shrink-0">
                            <div className="text-right">
                              <span className="font-extrabold text-sm sm:text-base text-primary block leading-tight">
                                ৳{formatPrice(v.final_price)}
                              </span>
                              {v.base_price > v.final_price && (
                                <span className="text-xs text-zinc-400 line-through block">
                                  ৳{formatPrice(v.base_price)}
                                </span>
                              )}
                            </div>
                            <div
                              className={cn(
                                "size-4.5 rounded-full flex items-center justify-center shrink-0 border transition-colors",
                                isSelected
                                  ? "bg-primary border-primary text-white"
                                  : "border-zinc-300 dark:border-zinc-600"
                              )}
                            >
                              {isSelected && <Check className="size-3 stroke-[3]" />}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {selectedVariant?.note && (
                    <div className="mt-2.5 flex items-start gap-2 p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-900/40 text-xs text-sky-900 dark:text-sky-300">
                      <Info className="size-4 shrink-0 text-sky-600 mt-0.5" />
                      <span className="leading-relaxed">{selectedVariant.note}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Quantity & CTA Row */}
              <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                      Quantity:
                    </span>
                    <div className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 p-0.5">
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="size-7 rounded-md flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-700 disabled:opacity-40 transition-colors cursor-pointer"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="w-8 text-center font-bold text-sm text-zinc-900 dark:text-zinc-100 select-none">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => prev + 1)}
                        aria-label="Increase quantity"
                        className="size-7 rounded-md flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {selectedVariant && (
                    <div className="text-right flex items-center gap-2">
                      <span className="text-xs text-zinc-400">Total:</span>
                      <span className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-zinc-100">
                        ৳{formatPrice(selectedVariant.final_price * quantity)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl border-2 border-primary/40 bg-primary/5 hover:bg-primary/10 active:scale-[0.99] text-primary font-bold text-sm sm:text-base transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <ShoppingCart className="size-4.5" />
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-xl bg-primary hover:bg-[#1577b0] active:scale-[0.99] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard className="size-4.5" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Fast WhatsApp Help link */}
                <div className="pt-1 flex items-center justify-center">
                  <a
                    href="https://wa.me/8801727877160"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-emerald-600 transition-colors"
                  >
                    <FaWhatsapp className="size-3.5 text-emerald-600" />
                    <span>Have questions about this service? Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Description & Specifications Box */}
        <div className="mt-5 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 p-5 sm:p-6 lg:p-7 shadow-xs">
          <h2 className="font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            Service Description & Details
          </h2>

          <div className="mt-4 prose prose-zinc dark:prose-invert max-w-none text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
            {description}
          </div>

          {/* Service Note (if present) */}
          {note && (
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-sm">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <Info className="size-4 text-amber-600" />
                <span>Important Note:</span>
              </div>
              <p className="leading-relaxed">{note}</p>
            </div>
          )}

          {/* Specifications Pills */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 block font-medium">Category</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block truncate">
                {category?.name || "General"}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 block font-medium">Account Type</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block flex items-center gap-1.5">
                <UserCheck className="size-4 text-primary" />
                <span className="truncate">
                  {selectedVariant?.accountType || "Standard"}
                </span>
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 block font-medium">Selected Duration</span>
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block flex items-center gap-1.5">
                <Clock className="size-4 text-primary" />
                <span className="truncate">
                  {selectedVariant?.timeLine || "Standard"}
                </span>
              </span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
              <span className="text-xs text-zinc-400 block font-medium">Delivery Method</span>
              <span className="text-sm font-semibold text-emerald-600 mt-0.5 block truncate">
                Instant (WhatsApp / Email)
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
