import baseApi from "./baseApi";

export interface CreateSupportPayload {
    name: string;
    phone: string;
    email?: string;
    subject: string;
    details?: string;
}

const SupportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSupport: builder.mutation<{ message: string, data: any }, CreateSupportPayload>({
            query: (body) => ({
                url: '/supports',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useCreateSupportMutation } = SupportApi;
export default SupportApi;
