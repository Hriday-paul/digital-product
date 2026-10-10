import React from "react";
import MyOrdersContainer from "./_components/MyOrdersContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Account",
  description: "View and manage your digital service orders, downloads, and receipts.",
};

export default function MyOrdersPage() {
  return (
    <div className="container px-3 sm:px-5 py-8 md:py-12">
      <MyOrdersContainer />
    </div>
  );
}

