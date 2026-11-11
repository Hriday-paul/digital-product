"use client";

import React, { useState } from "react";
import { useGetMyOrdersQuery } from "@/redux/api/Order.api";
import { IOrder } from "@/redux/types";
import Pagination from "@/components/ui/Pagination";
import OrderRow from "./OrderRow";
import {
  OrdersEmpty,
  OrdersError,
  OrdersHeader,
  OrdersLoading,
} from "./OrdersStateViews";

export default function MyOrdersContainer() {
  const [page, setPage] = useState(1);
  const limit = 8;

  const { data: response, isLoading, isError } = useGetMyOrdersQuery({
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
  const totalPages = meta?.totalPage || 1;

  return (
    <div className="space-y-8">
      <OrdersHeader />

      {isLoading && <OrdersLoading />}

      {isError && !isLoading && <OrdersError />}

      {!isLoading && !isError && orders.length === 0 && <OrdersEmpty />}

      {!isLoading && !isError && orders.length > 0 && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4.5 border-b border-zinc-200 dark:border-zinc-800 text-sm font-montserrat font-bold text-zinc-800 dark:text-zinc-200">
            <div className="col-span-5">Order Items</div>
            <div className="col-span-3">Order Info</div>
            <div className="col-span-2 text-center">Total Price</div>
            <div className="col-span-2 text-center">Status</div>
          </div>

          {/* Order Rows */}
          <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {orders.map((order, index) => (
              <OrderRow key={order.id || index} order={order} />
            ))}
          </div>
        </div>
      )}

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
