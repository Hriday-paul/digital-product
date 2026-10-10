import { GetServices } from '@/lib/services/Service.api';
import { Metadata } from 'next';
import React, { Suspense } from 'react'
import ShopContainer from './_components/ShopContainer';

export const metadata: Metadata = {
    title: "Shop",
    description: "Explore our wide range of products and services in the shop section. Find the best deals and offers tailored to your needs.",
}

async function Services({
    searchParams: ssp,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {

    const searchParams = await ssp;

    const limit = searchParams?.limit;
    const sort = searchParams?.sort;
    const page = searchParams?.page;
    const category = searchParams?.category;

    const query: any = { page, limit: 21 }

    if (category) {
        query.category = category;
    }

    const servicePromise = GetServices({ query });

    return (
        <div>
            <Suspense fallback={<ServiceLoading />}>
                <ShopContainer servicePromise={servicePromise} query={query} />
            </Suspense>
        </div>
    )
}

export default Services