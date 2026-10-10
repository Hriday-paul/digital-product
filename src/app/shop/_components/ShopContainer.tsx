import { IMeta, IService } from '@/redux/types'
import ServiceItems from './ServiceItems'

async function ShopContainer({ servicePromise, query }: { servicePromise: Promise<{ data: { data: IService[], meta: IMeta } }>, query: { [key: string]: string | undefined } }) {
    const data = await servicePromise;
    return (
        <div>
            <ServiceItems query={query} initialData={data?.data?.data || []} initialMeta={data?.data?.meta} key={JSON.stringify(query)} />
        </div>
    )
}

export default ShopContainer