"use client"
import { IMeta, IService } from '@/redux/types'
import useLazyLoad from '@/shared/LazyLoadAd';
import { useRef } from 'react'
import Image from 'next/image';
import ServiceCard from '@/shared/ServiceCard';
import { useLazyServicesQuery } from '@/redux/api/Service.api';

function ServiceItems({ query, initialData, initialMeta }: { query: { [key: string]: string | undefined }, initialData: IService[], initialMeta: IMeta }) {

    const [loadServices, { isLoading }] = useLazyServicesQuery();
    const triggerRef = useRef(null);

    const loadNextPage = async (page: number) => {
        try {

            query.page = page.toString();

            const res = await loadServices(query).unwrap();
            const data = res?.data?.data || [];
            const meta = res?.data?.meta;

            // No meta or no data back -> treat as end of list
            const hasMore = meta ? meta.page < meta.totalPage : data.length > 0;

            return { data, hasMore };
        } catch (error) {
            return { data: [], hasMore: false };
        }
    }

    const { data, hasMore } = useLazyLoad<IService>({
        triggerRef,
        onGrabData: loadNextPage,
        options: {},
        initialData: initialData,
        initialPage: initialMeta?.page ? initialMeta.page + 1 : 2,
        initialHasMore: initialMeta ? initialMeta?.page < initialMeta?.totalPage : true
    });

    return (
        <div>
            {
                (data?.length === 0 && !isLoading) && <section className='min-h-[calc(25vh)] flex flex-col items-center justify-center'>
                    <Image src={"/empty_data.jpg"} height={1000} width={1000} className='h-28 w-auto mx-auto' alt='empty data' />
                    <p className='text-sm text-gray-500 text-center'>{"No data available"}</p>
                </section>
            }

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {data?.map(service => {
                    return <ServiceCard key={service?.id} service={service} />
                })}
                {hasMore && <div ref={triggerRef} style={{ height: 1 }} />}
            </div>
            {
                isLoading && hasMore && <div className="flex-center h-16 md:h-20 lg:h-24">
                    <div className="w-8 aspect-square rounded-full border-[3px] border-white border-r-primary animate-spin"></div>
                </div>
            }
        </div>
    )
}

export default ServiceItems