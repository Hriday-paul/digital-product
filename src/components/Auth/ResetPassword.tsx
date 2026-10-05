"use client"

import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { toast } from 'sonner';
import PasswordInput from './PasswordInput';
import { useRouter } from 'next/navigation';

type resetPasswordType = {
    new_password: string,
    confirm_password: string,
}

const ResetPassword = () => {
    const [postResetPassword, { isLoading }] = useResetPasswordMutation();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<resetPasswordType>();

    const router = useRouter();

    const handleFormSubmit: SubmitHandler<resetPasswordType> = async (data) => {

        if (data?.new_password !== data?.confirm_password) {
            toast.error("New password and confirm password do not match");
            return;
        }

        try {
            const res = await postResetPassword({
                newPassword: data?.new_password,
                confirmPassword: data?.confirm_password
            }).unwrap();

            toast.success(res?.message || "Password reset successfully");
            reset();
            router.push('/auth/login');

        } catch (err: any) {
            toast.error(err?.data?.message || "An error occurred while resetting the password");
        }
    }

    return (
        <div>
            <div className='bg-white max-w-xl border border-stroke rounded shadow p-8 mx-auto mb-10'>

                <form onSubmit={handleSubmit(handleFormSubmit)}>

                    {/* New Password */}
                    <div className="w-full mx-auto mb-4">
                        <PasswordInput
                            name="new_password"
                            label="New Password"
                            placeholder="*********"
                            register={register}
                            isLarge={true}
                            errors={errors}
                            validationRules={{
                                required: "New password is required",
                            }}
                        />

                        {errors?.new_password && (
                            <p className="text-orange-500 text-sm font-montserrat">
                                {errors?.new_password?.message as string}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div className="w-full mx-auto mb-4">
                        <PasswordInput
                            name="confirm_password"
                            label="Confirm Password"
                            placeholder="*********"
                            register={register}
                            isLarge={true}
                            errors={errors}
                            validationRules={{
                                required: "Confirm password is required",
                            }}
                        />

                        {(watch('new_password') !== watch('confirm_password')) && (
                            <p className='text-xs font-montserrat text-danger mt-0.5'>
                                Confirm password does not match new password
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        disabled={isLoading}
                        className='bg-primary py-3 font-montserrat rounded-lg w-full mt-5 hover:bg-opacity-90 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white cursor-pointer'
                    >
                        {isLoading && (
                            <ImSpinner2 className="text-lg text-white animate-spin" />
                        )}
                        <span>
                            {isLoading ? "Loading..." : "Reset Password"}
                        </span>
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ResetPassword;