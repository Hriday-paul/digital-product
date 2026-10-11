import ResendOtp from '@/components/Auth/ResendOtp'
import Pagetop from '@/shared/Pagetop';
import { Metadata } from 'next';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Resend Otp",
    description: "Account Resend Otp Page",
    metadataBase: new URL('https://asifzonebd.com'),
    alternates: {
        canonical: '/auth/resend-otp',
        languages: {
            en: `/auth/resend-otp`,
            'x-default': `/auth/resend-otp`
        }
    },
}

async function ResedOtp() {
    return (
        <div>
            <Pagetop title="Resend Otp">
                <h3 className="text-xs md:text-sm font-montserrat text-gray-100 flex flex-row gap-x-1.5 items-center">
                    <Link href='/'>Home</Link> <IoIosArrowForward className='' /> Resend Otp
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <ResendOtp />
            </div>
        </div>
    )
}

export default ResedOtp