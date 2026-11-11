"use client";

import React from "react";
import moment from "moment";
import { Hash, Package } from "lucide-react";
import { IOrder, OrderItem, OrderStatus } from "@/redux/types";
import { cn } from "@/lib/utils";
import OrderItemCard from "./OrderItemCard";

interface OrderRowProps {
  order: IOrder;
}

const getOrderStatusBadge = (status?: OrderStatus | string) => {
  const normalized = (status || OrderStatus.PENDING).toUpperCase();
  switch (normalized) {
    case OrderStatus.COMPLETED:
    case "PAID":
      return {
        label: "Completed",
        badgeClass:
          "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800",
        dotClass: "bg-emerald-500",
      };
    case OrderStatus.PENDING:
      return {
        label: "Pending",
        badgeClass:
          "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800",
        dotClass: "bg-amber-500 animate-pulse",
      };
    case OrderStatus.CANCELED:
    case "CANCELLED":
    case "FAILED":
      return {
        label: "Canceled",
        badgeClass:
          "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800",
        dotClass: "bg-rose-500",
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

export default function OrderRow({ order }: OrderRowProps) {
  const items: OrderItem[] = Array.isArray(order.items) ? order.items : [];
  const formattedDate = order.createdAt
    ? moment(order.createdAt).format("DD MMM YYYY")
    : "No Date Available";
  const totalQuantity = items.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );
  const statusConfig = getOrderStatusBadge(order.status);

  return (
    <div className="p-5 sm:p-6 transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-4 items-center">
        {/* 1. Order Items Column */}
        <div className="md:col-span-5 space-y-3">
          {items.length > 0 ? (
            items.map((item, idx) => (
              <OrderItemCard key={item.id || idx} item={item} index={idx} />
            ))
          ) : (
            <div className="flex items-center gap-3.5 font-montserrat">
              <div className="size-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                <Package className="size-6" />
              </div>
              <div>
                <p className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100">
                  Order #{order.id?.slice(-8).toUpperCase()}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Digital Service Order
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 2. Order Info Column */}
        <div className="md:col-span-3 space-y-1 text-xs sm:text-[13px] font-montserrat text-zinc-600 dark:text-zinc-400">
          {order.id && (
            <div className="flex items-center gap-1">
              <Hash className="size-3.5 text-zinc-400 shrink-0" />
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {order.id.slice(-8).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <span className="text-zinc-400">Date: </span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">
              {formattedDate}
            </span>
          </div>
          {order.customerName && (
            <div>
              <span className="text-zinc-400">Customer: </span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {order.customerName}
              </span>
            </div>
          )}
          {order.transactionId && (
            <div>
              <span className="text-zinc-400">TrxID: </span>
              <span className="font-mono font-medium text-primary">
                {order.transactionId}
              </span>
            </div>
          )}
          {order.couponApplied && order.couponDiscount > 0 && (
            <div>
              <span className="text-zinc-400">Discount: </span>
              <span className="font-medium text-emerald-600">
                -৳{order.couponDiscount}{" "}
                {order.couponCode ? `(${order.couponCode})` : ""}
              </span>
            </div>
          )}
        </div>

        {/* 3. Total Price Column */}
        <div className="md:col-span-2 flex flex-col md:items-center justify-center">
          <span className="inline-flex items-center w-fit px-4 py-1.5 rounded-full bg-primary/10 text-primary font-montserrat font-bold text-sm sm:text-base">
            ৳{order.price ?? 0}
          </span>
          {totalQuantity > 0 && (
            <span className="text-[11px] text-zinc-400 font-montserrat mt-1">
              {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
            </span>
          )}
        </div>

        {/* 4. Order & Payment Status Column */}
        <div className="md:col-span-2 flex flex-col items-start md:items-center justify-center">
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

          {order.paymentMethod && (
            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 font-montserrat mt-1.5 capitalize">
              Via {order.paymentMethod.toLowerCase()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
