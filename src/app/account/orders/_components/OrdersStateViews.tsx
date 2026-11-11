"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, Loader2, ShoppingBag } from "lucide-react";

export function OrdersHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
      <div>
        <h1 className="font-montserrat font-semibold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-100">
          My Orders
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 font-montserrat mt-1">
          Manage and access your purchased digital services, tools, and subscriptions.
        </p>
      </div>

      <Link
        href="/shop"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white text-xs sm:text-sm font-montserrat font-semibold transition-all self-start sm:self-auto cursor-pointer"
      >
        <ShoppingBag className="size-4" />
        <span>Browse More Services</span>
      </Link>
    </div>
  );
}

export function OrdersLoading() {
  return (
    <div className="min-h-[350px] flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <Loader2 className="size-8 text-primary animate-spin mb-3" />
      <p className="text-sm font-montserrat text-zinc-500">
        Loading your orders...
      </p>
    </div>
  );
}

export function OrdersError() {
  return (
    <div className="min-h-[300px] flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="size-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-3">
        <AlertCircle className="size-7" />
      </div>
      <h3 className="font-montserrat font-bold text-lg text-zinc-900 dark:text-zinc-100">
        Unable to load orders
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-zinc-500 font-montserrat max-w-sm">
        Please make sure you are logged in to your account to view your order history.
      </p>
      <Link
        href="/auth/login"
        className="mt-4 px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-montserrat font-semibold text-xs sm:text-sm shadow-xs transition-all"
      >
        Login to Account
      </Link>
    </div>
  );
}

export function OrdersEmpty() {
  return (
    <div className="min-h-[320px] flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-center">
      <div className="size-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
        <ShoppingBag className="size-8" />
      </div>
      <h3 className="font-montserrat font-bold text-lg text-zinc-900 dark:text-zinc-100">
        No orders found yet
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-zinc-500 font-montserrat max-w-sm">
        You haven&apos;t ordered any services or products yet. Check out our shop to get started!
      </p>
      <Link
        href="/shop"
        className="mt-5 px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-montserrat font-semibold text-xs sm:text-sm shadow-xs transition-all"
      >
        Explore Services
      </Link>
    </div>
  );
}
