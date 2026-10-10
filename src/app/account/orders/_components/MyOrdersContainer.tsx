"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useGetMyOrdersQuery } from "@/redux/api/Order.api";

import { IOrder } from "@/redux/types";
import {
  Star,
  ShoppingBag,
  ExternalLink,
  Loader2,
  AlertCircle,
  Tag,
} from "lucide-react";
import { FaWhatsapp, FaWordpress, FaHtml5 } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Pagination from "@/components/ui/Pagination";

export default function MyOrdersContainer() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data: response, isLoading, isFetching, isError } = useGetMyOrdersQuery({
    page,
    limit,
  });

  const ordersData = response?.data;
  const orders: IOrder[] = Array.isArray(ordersData)
    ? ordersData
    : Array.isArray(ordersData?.data)
    ? ordersData.data
    : [];

  const meta = !Array.isArray(ordersData) ? ordersData?.meta : undefined;
  const totalPages = meta?.totalPage || (orders.length > 0 ? 1 : 1);

  // Helper to determine payment status badge styling and text
  const getPaymentStatusBadge = (status?: string) => {
    const normalized = (status || "PENDING").toUpperCase();
    switch (normalized) {
      case "PAID":
      case "COMPLETED":
        return {
          label: "Paid",
          badgeClass:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
          dotClass: "bg-emerald-500",
        };
      case "PENDING":
        return {
          label: "Pending",
          badgeClass:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
          dotClass: "bg-amber-500 animate-pulse",
        };
      case "FAILED":
      case "CANCELLED":
        return {
          label: normalized === "FAILED" ? "Failed" : "Cancelled",
          badgeClass:
            "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
          dotClass: "bg-rose-500",
        };
      case "REFUNDED":
        return {
          label: "Refunded",
          badgeClass:
            "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800",
          dotClass: "bg-purple-500",
        };
      default:
        return {
          label: normalized,
          badgeClass:
            "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300",
          dotClass: "bg-zinc-400",
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
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

      {/* Loading State */}
      {isLoading && (
        <div className="min-h-[350px] flex flex-col items-center justify-center p-8 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Loader2 className="size-8 text-primary animate-spin mb-3" />
          <p className="text-sm font-montserrat text-zinc-500">Loading your orders...</p>
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
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
      )}

      {/* Empty State */}
      {!isLoading && !isError && orders.length === 0 && (
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
      )}

      {/* Orders List matching Reference Image Design */}
      {!isLoading && !isError && orders.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4.5 border-b border-zinc-200 dark:border-zinc-800 text-sm font-montserrat font-bold text-zinc-800 dark:text-zinc-200">
            <div className="col-span-5">Product Details</div>
            <div className="col-span-3">Additional Info</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Payment Status</div>
          </div>

          {/* Order Rows */}
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {orders.map((order, index) => {
              const service = order.service;
              const variant = order.variant;
              const serviceImg = service?.images?.[0]?.url || "/serviceImg.webp";
              const formattedDate = order.createdAt ? moment(order.createdAt).format("DD MMM YYYY")
                : "No Date Available";
              const price = order?.payment?.amount;
              const licence = variant?.timeLine || "Regular";

              return (
                <div
                  key={order.id || index}
                  className="p-5 sm:p-6 transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-4 items-center">
                    {/* 1. Product Details Column */}
                    <div className="md:col-span-5 flex items-start gap-4">
                      {/* Thumbnail Image */}
                      <div className="relative size-20 sm:size-24 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
                        <Image
                          src={serviceImg}
                          alt={service?.title || "Digital Product"}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Title & Description */}
                      <div className="min-w-0 flex-1">
                        <Link
                          href={service?.slug ? `/shop/${service.slug}` : "/shop"}
                          className="font-montserrat font-bold text-base sm:text-[17px] text-zinc-900 dark:text-zinc-100 hover:text-primary transition-colors line-clamp-2 leading-snug"
                        >
                          {service?.title || "Premium Digital Service"}
                        </Link>
                        <p className="mt-1 text-xs sm:text-sm text-zinc-500 font-montserrat line-clamp-2 leading-relaxed">
                          {service?.description ||
                            "Nunc placerat mi id nisi inter dum mollis. Praesent phare..."}
                        </p>
                      </div>
                    </div>

                    {/* 2. Additional Info Column */}
                    <div className="md:col-span-3 space-y-1 text-xs sm:text-[13px] font-montserrat text-zinc-600 dark:text-zinc-400">
                      <div>
                        <span className="text-zinc-400">Date: </span>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200">
                          {formattedDate}
                        </span>
                      </div>
                      <div>
                        <span className="text-zinc-400">Licence: </span>
                        <span className="text-primary font-medium">{licence}</span>
                      </div>
                      {order?.customerName && (
                        <div>
                          <span className="text-zinc-400">Author: </span>
                          <span className="font-medium text-zinc-800 dark:text-zinc-200">
                            {order.customerName}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* 3. Price Column */}
                    <div className="md:col-span-2 flex md:justify-center items-center">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-montserrat font-bold text-sm sm:text-base">
                        ৳{price}
                      </span>
                    </div>

                    {/* 4. Payment Status Column */}
                    <div className="md:col-span-2 flex flex-col items-start md:items-center justify-center">
                      {(() => {
                        const statusConfig = getPaymentStatusBadge(
                          order.payment?.status || order.status
                        );
                        return (
                          <div
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-montserrat border shadow-2xs",
                              statusConfig.badgeClass
                            )}
                          >
                            <span
                              className={cn("size-2 rounded-full", statusConfig.dotClass)}
                            />
                            <span>{statusConfig.label}</span>
                          </div>
                        );
                      })()}

                      {order.payment?.paymentMethod && (
                        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 font-montserrat mt-1.5 capitalize">
                          Via {order.payment.paymentMethod.toLowerCase()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pagination using @/components/ui/pagination */}
      {!isLoading && !isError && totalPages > 1 && (
        <div className="flex items-center justify-center pt-4">
          <Pagination
            totalPages={totalPages}
            initialPage={page}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
}

