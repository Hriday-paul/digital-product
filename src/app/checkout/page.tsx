import { Metadata } from "next";
import CheckoutClient from "./_components/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout & Order Confirmation",
  description: "Review your cart items and complete your digital service order.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
