
import { notFound } from "next/navigation";
import { GetServiceBySlug } from "@/lib/services/Service.api";
import ServiceDetailsClient from "./_components/ServiceDetailsClient";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailsPage({ params: paramsPromise }: ServicePageProps) {
  const { slug } = await paramsPromise;

  // Server request following previous API request code pattern
  const res = await GetServiceBySlug(slug).catch(() => null);

  if (!res || !res.data) {
    notFound();
  }

  return <ServiceDetailsClient service={res.data} />;
}

