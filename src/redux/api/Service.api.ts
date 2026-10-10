import { ICategory, IMeta, IService } from "../types";
import baseApi from "./baseApi";

const ServcieApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        services: builder.query<{ message: string, data: { data: IService[], meta: IMeta } }, any>({
            query: (query) => ({
                url: '/services',
                params: query
            }),
        }),
        categories: builder.query<{ message: string, data: ICategory[] }, void>({
            query: () => ({
                url: '/categories'
            }),
        }),
        serviceBySlug: builder.query<{ message: string, data: IService }, string>({
            query: (slug) => ({
                url: `/services/${slug}`
            }),
        }),
    })
})

export const { useLazyServicesQuery, useServicesQuery, useCategoriesQuery, useServiceBySlugQuery } = ServcieApi;