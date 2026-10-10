import { IMeta, IUser } from "../types";
import baseApi from "./baseApi";

const UserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        myProfile: builder.query<{ message: string, data: IUser }, void>({
            query: () => ({
                url: '/users/my-profile',
            }),
            providesTags: ['user']
        }),

       
    })
})

export const { useMyProfileQuery } = UserApi;