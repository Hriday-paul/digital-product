'use client'
import { ImSpinner2 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResendOtpMutation } from "@/redux/api/authApi";
import { useCookies } from "react-cookie";
import { config } from "@/utils/config";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormType = {
    email: string,
}

const ResendOtp = () => {

    const [postResend, { isLoading }] = useResendOtpMutation();
    const [_, setCookie] = useCookies(['token']);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormType>();

    const handleFormSubmit: SubmitHandler<FormType> = async (data) => {
        try {
            const res = await postResend(data).unwrap();

            setCookie('token', res?.data?.token, {
                httpOnly: false,
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            toast.success("OTP resent successfully");
            reset();

            router.push("/auth/verify-otp");
            router.refresh();

        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again");
        }
    }

    return (
        <div className='bg-white max-w-xl border border-stroke rounded shadow p-8 mx-auto mb-10'>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="px-5 md:px-7 lg:px-10 mt-5 md:mt-8 lg:mt-10">

                <div className="w-full mx-auto mb-4">
                    <label htmlFor='email' className="mb-1.5 block text-black font-montserrat">
                        Email
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <input
                        type="email"
                        id='email'
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email address"
                            }
                        })}
                        placeholder="xyz@gmail.com"
                        className={`w-full rounded-md border bg-white  py-2.5 px-4 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-montserrat placeholder:font-montserrat ${errors?.email ? 'border-danger' : ' border-stroke '}`}
                    />
                    {errors?.email && <p className="text-orange-500 text-sm col-span-2 font-montserrat">{errors?.email?.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type='submit'
                    disabled={isLoading}
                    className='bg-primary py-3 font-montserrat rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'
                >
                    {isLoading && (
                        <ImSpinner2 className="text-lg text-white animate-spin" />
                    )}
                    <span>
                        {isLoading ? "Loading..." : "Resend OTP"}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default ResendOtp;