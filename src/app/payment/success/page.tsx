import React from "react";
import PaymentSuccess from "@/shared/PaymentSuccess";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order & Payment Success",
  description: "Your order and payment have been submitted successfully.",
};

export default function PaymentSuccessPage() {
  return <PaymentSuccess />;
}

