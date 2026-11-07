"use client";

import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronRight,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import { clearWishlist } from "@/redux/slices/wishlistSlice";
import ServiceCard from "@/shared/ServiceCard";

export default function WishlistClient() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlistSlice.items);

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    toast.info("Wishlist cleared");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 pb-16 md:pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent border-b border-zinc-200/60 dark:border-zinc-800/60 py-8 sm:py-12">
        <div className="container mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500 font-montserrat mb-3"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3.5 text-zinc-400" />
            <span className="text-primary font-medium">Wishlist</span>
          </nav>

          {/* Title & Clear Action */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-montserrat font-semibold mb-2">
                <Heart className="size-3.5 fill-current" />
                <span>Saved Services</span>
              </div>
              <h1 className="font-montserrat font-extrabold text-2xl sm:text-3xl md:text-4xl text-zinc-900 dark:text-white tracking-tight">
                My Wishlist ({wishlistItems.length})
              </h1>
              <p className="mt-2 text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-montserrat max-w-2xl leading-relaxed">
                Keep track of your favorite digital services and subscriptions for quick access anytime.
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <button
                type="button"
                onClick={handleClearWishlist}
                className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 text-rose-600 dark:text-rose-400 font-montserrat font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                <Trash2 className="size-4" />
                <span>Clear Wishlist</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto mt-8 sm:mt-10">
        {wishlistItems.length === 0 ? (
          <div className="max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 sm:p-10 text-center shadow-xs my-8">
            <div className="mx-auto size-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-4">
              <Heart className="size-8" />
            </div>
            <h2 className="font-montserrat font-bold text-xl text-zinc-900 dark:text-zinc-100">
              Your Wishlist is Empty
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-montserrat leading-relaxed">
              Save your favorite digital services by clicking the heart icon on any service card or details page.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-montserrat font-semibold text-sm shadow-xs transition-all"
            >
              <ShoppingBag className="size-4" />
              <span>Explore Services</span>
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {wishlistItems.map((service) => (
              <ServiceCard
                key={service.id || service.slug}
                service={service}
                className="h-full"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
