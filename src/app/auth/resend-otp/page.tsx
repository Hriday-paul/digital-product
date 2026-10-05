import ResendOtp from '@/components/Auth/ResendOtp'
import Pagetop from '@/shared/Pagetop';
import { Metadata } from 'next';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Resend Otp",
    description: "Runbd Resend Otp Page",
    metadataBase: new URL('https://runbd.org'),
    alternates: {
        canonical: '/auth/resend-otp',
        languages: {
            en: `/auth/resend-otp`,
            bn: `/bn/auth/resend-otp`,
            'x-default': `/auth/resend-otp`
        }
    },
}

async function ResedOtp() {
    return (
        <div>
            <Pagetop title="Resend Otp">
                <h3 className="text-xs md:text-sm font-montserrat text-gray-100 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Resend Otp
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <ResendOtp />
            </div>
        </div>
    )
}

export default ResedOtp