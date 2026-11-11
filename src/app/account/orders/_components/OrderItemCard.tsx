"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Package } from "lucide-react";
import { OrderItem } from "@/redux/types";

interface OrderItemCardProps {
  item: OrderItem;
  index: number;
}

export default function OrderItemCard({ item, index }: OrderItemCardProps) {
  const service = item.service;
  const variant = item.variant;
  const serviceImg = service?.images?.[0]?.url;

  return (
    <div className="flex items-start gap-3.5">
      {/* Thumbnail or Fallback Icon */}
      {serviceImg ? (
        <div className="relative size-16 sm:size-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700 shadow-2xs">
          <Image
            src={serviceImg}
            alt={service?.title || "Digital Product"}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="size-14 sm:size-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
          <Package className="size-6 sm:size-7" />
        </div>
      )}

      {/* Item Details */}
      <div className="min-w-0 flex-1 font-montserrat">
        {service?.slug ? (
          <Link
            href={`/shop/${service.slug}`}
            className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 hover:text-primary transition-colors line-clamp-1"
          >
            {service.title}
          </Link>
        ) : (
          <p className="font-bold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 line-clamp-1">
            {service?.title || `Service Item #${index + 1}`}
          </p>
        )}

        {variant?.timeLine && (
          <p className="text-xs text-primary font-medium mt-0.5">
            Plan: {variant.timeLine}
          </p>
        )}

        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            Qty:{" "}
            <strong className="text-zinc-700 dark:text-zinc-200">
              {item.quantity}
            </strong>
          </span>
          <span>•</span>
          <span>
            Unit:{" "}
            <strong className="text-zinc-700 dark:text-zinc-200">
              ৳{item.unitPrice}
            </strong>
          </span>
          <span>•</span>
          <span>
            Subtotal:{" "}
            <strong className="text-zinc-800 dark:text-zinc-100">
              ৳{item.totalPrice}
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
}
