import baseApi from "./baseApi";
import { IMeta, IOrder, PlaceOrderPayload } from "../types";

const OrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation<{ message: string, data: any }, PlaceOrderPayload>({
            query: (body) => ({
                url: '/orders',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['orders'],
        }),
        getMyOrders: builder.query<{ message: string, data: { data: IOrder[], meta: IMeta } }, { page?: number; limit?: number; searchTerm?: string } | void>({
            query: (params) => ({
                url: '/orders/my-orders',
                params: params || {},
            }),
            providesTags: ['orders'],
        }),
    }),
});

export const { usePlaceOrderMutation, useGetMyOrdersQuery } = OrderApi;
export default OrderApi;
