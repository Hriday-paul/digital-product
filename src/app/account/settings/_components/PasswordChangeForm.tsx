"use client"
import PasswordInput from '@/components/Auth/PasswordInput';
import { useChangePasswordMutation } from '@/redux/api/authApi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { toast } from 'react-toastify';

type changePasswordType = {
    "oldPassword": string,
    "newPassword": string,
    confirmPassword: string
}

function PassswordChangeForm() {

    const [postChangePassword, { isLoading }] = useChangePasswordMutation();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<changePasswordType>();

    const handleFormSubmit: SubmitHandler<changePasswordType> = async (data) => {
        if (data?.newPassword !== data?.confirmPassword) return;
        try {
            const res = await postChangePassword(data).unwrap();
            // Do something with the response, e.g., show a success message
            toast.success(res?.message || "Password changed successfully");
            reset();
        } catch (err: any) {
            // Handle error, e.g., show an error message
            toast.error(err?.data?.message || "Something went wrong");
        }
    }
    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className='bg-white p-5 border border-stroke rounded-xl'>

            <div className='border-b border-stroke pb-3'>
                <h6 className='text-xl font-montserrat font-medium'>Change Password</h6>
            </div>

            <div className="w-full mx-auto my-5">
                <PasswordInput
                    name="oldPassword"
                    label={"Current Password"}
                    placeholder="Enter your current password"
                    register={register}
                    isLarge={true}
                    errors={errors}
                    validationRules={{
                        required: "Current Password is required",
                    }}
                />
                {errors?.oldPassword && (
                    <p className="text-orange-500 text-sm col-span-2 font-figtree">{errors?.oldPassword?.message as string}</p>
                )}
            </div>

            <div className="w-full mx-auto my-5">
                <PasswordInput
                    name="newPassword"
                    label={"New Password"}
                    placeholder="Enter your new password"
                    register={register}
                    isLarge={true}
                    errors={errors}
                    validationRules={{
                        required: "New Password is required",
                        pattern: {
                            value: /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                            message:
                                "Password must include 1 uppercase, 1 number, 1 special character, and 8+ characters.",
                        },
                    }}
                />
                {errors?.newPassword && (
                    <p className="text-orange-500 text-sm col-span-2 font-figtree">{errors?.newPassword?.message as string}</p>
                )}
            </div>

            <div className="w-full mx-auto my-5">
                <PasswordInput
                    name="confirmPassword"
                    label={"Confirm Password"}
                    placeholder="Enter confirm password"
                    register={register}
                    isLarge={true}
                    errors={errors}
                    validationRules={{
                        required: "Confirm Password is required",
                    }}
                />
            </div>

            {(watch('newPassword') !== watch('confirmPassword')) && <p className='text-xs font-figtree text-danger mt-0.5'>Password not match</p>}

            <button type='submit' disabled={isLoading} className='bg-primary py-3 font-montserrat rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                <span>{isLoading ? 'Loading...' : "Update"}</span>
            </button>
        </form>
    )

}

export default PassswordChangeForm