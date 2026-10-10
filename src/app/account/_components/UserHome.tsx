"use client"
import { Skeleton } from '@/components/ui/skeleton';
import { useGetUserProfileQuery } from '@/redux/api/authApi';
import ErrorComponent from '@/shared/ErrorComponent';
import Image from 'next/image';

function UserHome() {
    const { isLoading: profileGetLoad, isSuccess: profileSuccess, isError, data: profileData } = useGetUserProfileQuery();

    if (profileGetLoad) {
        return <div className='space-y-5 items-center w-full max-w-3xl'>
            <Skeleton className="h-40 w-full rounded" />
        </div>
    }

    if (isError) {
        return <ErrorComponent />
    }

    return (
        <div>
            <h3 className='text-base lg:text-lg font-montserrat text-black py-3'>Welcome, {profileData?.data?.name || ""}</h3>
            <div className='bg-white py-8 flex flex-row gap-2 justify-between items-center border border-stroke rounded-3xl px-5 max-w-xl'>
                <div className='flex flex-row items-center gap-2'>
                    <div className='relative'>
                        <Image src={profileData?.data?.picture?.url || "/empty-user.png"} alt='user image' className='h-16 w-16 object-cover rounded-full border border-primary' height={600} width={600} />
                    </div>
                    <div className='space-y-1'>
                        <h3 className='text-xl text-black font-montserrat font-medium'>{profileData?.data?.name}</h3>
                        <p className='text-sm font-montserrat'>{profileData?.data?.email}</p>
                    </div>
                </div>
                {/* //verified badge */}
                <span className='text-sm font-montserrat text-green-600 flex-row gap-x-1 items-center bg-green-100 inline-flex px-2 py-0.5 rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verified
                </span>
            </div>
        </div>
    )
}

export default UserHome