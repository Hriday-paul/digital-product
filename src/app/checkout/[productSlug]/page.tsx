import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GetServiceBySlug } from "@/lib/services/Service.api";
import CheckoutClient from "./_components/CheckoutClient";
import { IService } from "@/redux/types";

interface CheckoutPageProps {
  params: Promise<{ productSlug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function CheckoutPage({
  params: paramsPromise,
  searchParams: ssp,
}: CheckoutPageProps) {
  const { productSlug } = await paramsPromise;
  const searchParams = await ssp;

  // Check if variant id is available in query param (?varientId=... or ?variantId=...)
  const variantId = searchParams?.varientId || searchParams?.variantId;
  if (!variantId) {
    notFound();
  }

  // Fetch service details on server
  const res = await GetServiceBySlug(productSlug).catch(() => null);
  const service = res?.data as IService;

  if (!service) {
    notFound();
  }

  // Verify that the specified variant exists on this service
  const variant = service.variants?.find((v) => v.id === variantId);
  if (!variant) {
    notFound();
  }

  return <CheckoutClient service={service} variant={variant} />;
}

