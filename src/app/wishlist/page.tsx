import { Metadata } from "next";
import WishlistClient from "./_components/WishlistClient";

export const metadata: Metadata = {
  title: "My Wishlist",
  description: "View and manage your saved digital services and products.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
