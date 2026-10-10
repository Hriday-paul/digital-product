"use client"
import { SelectWithSearch } from '@/components/ui/SelectWithSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserProfileQuery, useUpdateProfileMutation } from '@/redux/api/authApi';
import { IUser } from '@/redux/types';
import ErrorComponent from '@/shared/ErrorComponent';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import { MdErrorOutline, MdOutlineEdit } from 'react-icons/md';
import { toast } from 'react-toastify';


type FieldType = {
    phone: string,
    name: string,
    email: string | null,
    whatsapp: string | null
    picture: { url: string, key: string } | null,
    address: string | null,
}

function AccountDetailsForm() {
    const { isLoading: profileGetLoad, isSuccess: profileSuccess, isError, data: profileData } = useGetUserProfileQuery();

    const [image, setImage] = useState<File | null>(null);

    const fileonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as File[] | null;
        if (!fileList) {
            return;
        }
        setImage(fileList[0])
    };


    if (profileGetLoad) {
        return <div className='space-y-5 items-center w-full'>
            <Skeleton className="h-40 w-full rounded" />
            <Skeleton className="h-40 w-full rounded" />
        </div>
    }

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div className='space-y-5'>
            {/* ------------------photo section----------- */}
            <div className='bg-white py-8 flex flex-row gap-2 justify-center items-center border border-stroke rounded-xl'>
                <div className='relative'>
                    <Image src={image ? URL.createObjectURL(image) : (profileData?.data?.picture?.url || "/empty-user.png")} alt='user image' className='h-20 w-20 object-cover rounded-full border border-primary' height={600} width={600} />

                    <label htmlFor="chosePhoto" className='cursor-pointer absolute right-0 bottom-0.5 bg-primary/50 h-6 w-6 p-1 rounded-full flex justify-center items-center'>
                        <MdOutlineEdit className='text-white' />
                    </label>
                    <input onChange={fileonChange} multiple={false} type="file" name="chosePhoto" id="chosePhoto" className='hidden' accept="image/*" />

                </div>
                <div className='space-y-1'>
                    <h3 className='text-xl text-black font-montserrat font-medium'>{profileData?.data?.name}</h3>
                    <p className='text-sm font-montserrat'>{profileData?.data?.phone}</p>
                </div>
            </div>

            <div className='bg-white p-5 border border-stroke rounded-xl'>
                <div className='border-b border-stroke pb-3'>
                    <h6 className='text-xl font-montserrat font-medium'>Account Details</h6>
                </div>

                {
                    (profileSuccess && profileData) && <UpdateProfileForm profileData={profileData?.data} image={image} />
                }

            </div>

        </div>
    )
}

export default AccountDetailsForm;

const UpdateProfileForm = ({ profileData, image }: { profileData: IUser, image: File | null }) => {
    const [postUpdate, { isLoading }] = useUpdateProfileMutation();

    const query: { division?: number, district?: number } = {}

    const {
        register,
        handleSubmit,
        control,
        reset,
        resetField,
        formState: { errors },
    } = useForm<FieldType>({
        defaultValues: {
            ...profileData,
        }
    });

    const handleFormSubmit: SubmitHandler<FieldType> = async (data) => {
        try {

            const form = new FormData();

            form.append('data', JSON.stringify(data))

            if (image) {
                form.append('picture', image);
            }

            const res = await postUpdate({ data: form }).unwrap()

            toast.success(res?.message || "Profile updated successfully")

        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className='pt-5'>
            <form onSubmit={handleSubmit(handleFormSubmit)} className=''>
                <div className="w-full mx-auto mb-3">
                    <label htmlFor='Firstname' className="mb-1.5 block text-black dark:text-white font-montserrat">
                        First name
                        <span className="text-red-500 text-base ml-1">*</span>
                    </label>
                    <input
                        type="text"
                        id='Firstname'
                        {...register("name", { required: true })}
                        placeholder="First Name"
                        className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-montserrat placeholder:font-montserrat ${errors?.name ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                    />
                    {errors?.name && <p className="text-red-500 text-sm col-span-2">{errors?.name?.message}</p>}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='email' className="mb-1.5 block text-black dark:text-white font-montserrat">
                            Email
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="email"
                            id='email'
                            {...register("email",
                                // { required: true }
                            )}
                            placeholder="xyz@gmail.com"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-montserrat placeholder:font-montserrat ${errors?.email ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.email && <p className="text-red-500 text-sm col-span-2">{errors?.email?.message}</p>}
                    </div>

                    <div>
                        <label htmlFor={"phone"} className={`mb-1.5 font-montserrat block text-black text-lg`}>
                            Phone Number
                            <span className="text-red-500 text-base ml-1">*</span>
                        </label>
                        <div className={`w-full flex flex-row items-center border rounded-md ${errors?.phone ? 'border-danger' : 'border-stroke '}`}>
                            <span className="border-r border-gray-300 px-2 font-montserrat">+88</span>
                            <input
                                type="number"
                                id='phone'
                                {...register("phone", { pattern: /^01\d{9}$/, minLength: 11, required: true })}
                                placeholder="01****"
                                className={`w-full px-2 bg-white py-2.5 text-black outline-none transition disabled:cursor-default disabled:bg-whiter font-montserrat placeholder:font-montserrat rounded-r-md`}
                            />
                        </div>
                        {errors.phone && <div className='flex items-center mb-2'>
                            <p className="text-red-500 text-sm col-span-2">{errors?.phone?.message}</p>
                        </div>}
                    </div>

                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='Whatsapp' className="mb-1.5 block text-black dark:text-white font-montserrat">
                            Whatsapp
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='Whatsapp'
                            {...register("whatsapp",
                                // { required: true }
                            )}
                            placeholder="Whatsapp"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-montserrat placeholder:font-montserrat ${errors?.whatsapp ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.whatsapp && <p className="text-red-500 text-sm col-span-2">{errors?.whatsapp?.message}</p>}
                    </div>
                    <div className="w-full mx-auto mb-3">
                        <label htmlFor='address' className="mb-1.5 block text-black dark:text-white font-montserrat">
                            Address
                            {/* <span className="text-red-500 text-base ml-1">*</span> */}
                        </label>
                        <input
                            type="text"
                            id='address'
                            {...register("address",
                                // { required: true }
                            )}
                            placeholder="address"
                            className={`w-full rounded bg-white border py-2.5 px-4 text-black outline-none transition disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white font-montserrat placeholder:font-montserrat ${errors?.address ? 'border-primary' : ' border-stroke focus:border-black active:border-black'}`}
                        />
                        {errors?.address && <p className="text-red-500 text-sm col-span-2">{errors?.address?.message}</p>}
                    </div>
                </div>

                <button type='submit' disabled={isLoading} className='bg-primary py-3 font-montserrat rounded-md w-full mt-5 hover:bg-primary/70 duration-200 flex flex-row gap-x-2 items-center justify-center disabled:bg-opacity-60 text-white disabled:cursor-not-allowed cursor-pointer'>
                    {isLoading && <ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>{isLoading ? 'Loading...' : "Update"}</span>
                </button>

            </form>
        </div>
    )
}