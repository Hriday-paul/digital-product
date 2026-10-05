'use client'
import Link from "next/link";
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { config } from "@/utils/config";
import { addUserDetails } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";
import baseApi from "@/redux/api/baseApi";
import { useRouter, useSearchParams } from "next/navigation";

type FormType = {
    phone: string,
    password: string,
    role: string
}

const LoginForm = () => {
    const [postSignIn, { isLoading }] = useLoginUserMutation();
    const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);
    const dispatch = useDispatch();
    const router = useRouter();
    const nextRout = useSearchParams().get('next');

    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm<FormType>({
        defaultValues: { role: "User" }
    });

    const handleFormSubmit: SubmitHandler<FormType> = async (data) => {
        try {
            const res = await postSignIn(data).unwrap();

            setCookie('accessToken', res?.data?.accessToken, {
                httpOnly: false,
                maxAge: 14 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            setCookie('refreshToken', res?.data?.refreshToken, {
                httpOnly: false,
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            dispatch(addUserDetails({
                firstName: res?.data?.user?.first_name,
                profilePicture: res?.data?.user?.picture?.url || "/empty-user.png",
                role: res?.data?.user?.auth?.role
            }));

            dispatch(baseApi.util.resetApiState());
            toast.success(res?.message || 'সাইন ইন সফল');
            reset();
            router.push(nextRout || "/profile");
            router.refresh();

        } catch (err: any) {
            toast.error(err?.data?.message || 'কিছু ভুল হয়েছে, আবার চেষ্টা করুন');
        }
    }

    return (
        <div className='bg-white max-w-xl border border-stroke rounded shadow p-8 mx-auto mb-10'>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-5 md:px-7 lg:px-10 mt-5 md:mt-8 lg:mt-10">

                {/* Phone */}
                <div className="my-5">
                    <label htmlFor={"phone"} className="mb-1.5 font-montserrat block text-black text-lg">
                        Phone
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <div className={`w-full flex flex-row items-center border rounded-md ${errors?.phone ? 'border-danger' : 'border-stroke'}`}>
                        <span className="border-r border-gray-300 px-2 font-montserrat">+88</span>
                        <input
                            type="number"
                            id='phone'
                            {...register("phone", { 
                                required: "Phone number is required", 
                                pattern: { value: /^01\d{9}$/, message: "Invalid phone number" }, 
                                minLength: { value: 11, message: "Phone number must be 11 digits" }
                            })}
                            placeholder={"Enter your phone number"}
                            className="w-full px-2 bg-white py-2.5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-montserrat placeholder:font-montserrat rounded-r-md"
                        />
                    </div>
                    {errors.phone && <div className='flex items-center mb-2'>
                        <MdErrorOutline className='text-sm text-orange-500' />
                        <p className='text-orange-500 text-sm ml-1'>{errors.phone.message}</p>
                    </div>}
                </div>

                {/* Password */}
                <div className="w-full mx-auto mb-4">
                    <PasswordInput
                        name="password"
                        label={"Password"}
                        placeholder={"Enter your password"}
                        register={register}
                        isLarge={true}
                        errors={errors}
                        validationRules={{ required: "Password is required" }}
                    />
                </div>

                <Link href={'/auth/forgot-password'} className='underline underline-offset-2 font-medium font-montserrat'>{"Forgot Password"}</Link>

                {/* Submit */}
                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-montserrat rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? "Loading..." : "Sign In"}</span>
                </button>

                {/* Register Link */}
                <div>
                    <h5 className='text-gray-900 font-montserrat text-sm md:text-base text-center mt-3'>
                        {"Don't have an account?"} 
                        <Link className='text-primary' href='/auth/signup'> {"Register"}</Link>
                    </h5>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;