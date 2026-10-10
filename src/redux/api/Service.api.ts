import { IMeta, IService, IUser } from "../types";
import baseApi from "./baseApi";

const ServcieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        services: builder.query<{ message: string, data: { data: IService[], meta: IMeta } }, any>({
            query: (query) => ({
                url: '/services',
                params: query
            }),
            // invalidatesTags: []
        }),

    })
})

export const { useLazyServicesQuery } = ServcieApi;