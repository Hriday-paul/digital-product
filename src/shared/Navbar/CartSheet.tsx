"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RootState } from "@/redux/store";
import {
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from "@/redux/slices/cartSlice";

const formatPrice = (val?: number) => {
  if (val === undefined || val === null || isNaN(val)) return "0";
  return Number.isInteger(val) ? val.toString() : val.toFixed(2);
};

export default function CartSheet() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cartSlice.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.variant.final_price * item.quantity,
    0
  );

  const handleProceedToCheckout = () => {
    setOpen(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open Shopping Cart"
        className="relative cursor-pointer size-10 flex items-center justify-center rounded-full border border-zinc-200 bg-gradient-to-b from-white to-zinc-100 text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:text-primary hover:to-zinc-50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_6px_rgba(0,0,0,0.12)] active:scale-95"
      >
        <ShoppingCart className="size-4.5 sm:size-5" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-primary text-white text-[10px] font-montserrat font-bold flex items-center justify-center shadow-xs">
            {totalQuantity > 99 ? "99+" : totalQuantity}
          </span>
        )}
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[330px] sm:w-[400px] sm:max-w-md p-0 flex flex-col justify-between bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between pr-12">
          <SheetHeader className="p-0 text-left">
            <SheetTitle className="font-montserrat font-bold text-lg text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ShoppingCart className="size-5 text-primary" />
              <span>Your Cart</span>
              {totalQuantity > 0 && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  {totalQuantity}
                </span>
              )}
            </SheetTitle>
            <SheetDescription className="text-xs font-montserrat text-zinc-500">
              Review and manage your selected services
            </SheetDescription>
          </SheetHeader>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="text-xs font-montserrat font-semibold text-red-500 hover:text-red-600 hover:underline cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Cart Items Body */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="size-16 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-400 flex items-center justify-center mb-3.5">
              <ShoppingBag className="size-8" />
            </div>
            <h4 className="font-montserrat font-bold text-base text-zinc-900 dark:text-zinc-100">
              Your cart is empty
            </h4>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 font-montserrat max-w-[230px]">
              Explore our digital services and add plans to your cart.
            </p>
            <Link
              href="/shop"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-montserrat font-semibold text-xs sm:text-sm transition-all shadow-xs"
            >
              <span>Browse Services</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 divide-y divide-zinc-100 dark:divide-zinc-800">
              {cartItems.map((item) => (
                <div
                  key={`${item.serviceId}-${item.variant.id}`}
                  className="py-4 flex gap-3.5 items-start"
                >
                  {/* Thumbnail */}
                  <Link
                    href={item.slug ? `/shop/${item.slug}` : "/shop"}
                    onClick={() => setOpen(false)}
                    className="relative size-16 sm:size-18 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0"
                  >
                    <Image
                      src={item.photo || "/serviceImg.webp"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  {/* Info & Controls */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={item.slug ? `/shop/${item.slug}` : "/shop"}
                        onClick={() => setOpen(false)}
                        className="font-montserrat font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:text-primary transition-colors line-clamp-2 leading-snug"
                      >
                        {item.title}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            removeFromCart({
                              serviceId: item.serviceId,
                              variantId: item.variant.id,
                            })
                          )
                        }
                        aria-label="Delete item from cart"
                        className="text-zinc-400 hover:text-red-500 p-1 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>

                    <p className="mt-1 text-[11px] sm:text-xs font-montserrat text-zinc-500 dark:text-zinc-400">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                        {item.variant.timeLine}
                      </span>
                      {item.variant.accountType ? ` • ${item.variant.accountType}` : ""}
                    </p>

                    <div className="mt-2.5 flex items-center justify-between gap-2">
                      {/* Quantity Controls */}
                      <div className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-0.5">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateCartQuantity({
                                serviceId: item.serviceId,
                                variantId: item.variant.id,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                          aria-label="Decrease quantity"
                          className="size-6 sm:size-7 rounded flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 sm:w-8 text-center font-montserrat font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(
                              updateCartQuantity({
                                serviceId: item.serviceId,
                                variantId: item.variant.id,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          aria-label="Increase quantity"
                          className="size-6 sm:size-7 rounded flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="font-montserrat font-extrabold text-sm text-primary block">
                          ৳{formatPrice(item.variant.final_price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-zinc-400 font-montserrat block">
                            ৳{formatPrice(item.variant.final_price)} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 space-y-4">
              <div className="flex items-center justify-between font-montserrat">
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                  Total Amount
                </span>
                <span className="text-xl font-extrabold text-primary">
                  ৳{formatPrice(totalAmount)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-primary hover:bg-[#1577b0] active:scale-[0.99] text-white font-montserrat font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
