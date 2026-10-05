import ResetPassword from '@/components/Auth/ResetPassword'
import Pagetop from '@/shared/Pagetop'
import { Metadata } from 'next'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Runbd Reset Password Page",
    metadataBase: new URL('https://runbd.org'),
    alternates: {
        canonical: '/auth/reset-password',
        languages: {
            en: `/auth/reset-password`,
            bn: `/bn/auth/reset-password`,
            'x-default': `/auth/reset-password`
        }
    },
}

async function Resetpass() {
    return (
        <div>
            <Pagetop title="Reset Password">
                <h3 className="text-xs md:text-sm font-montserrat text-gray-100 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> <Link href='/auth/forgot-password' className='text-primary'>Forgot Password</Link> <IoIosArrowForward className='' /> Reset Password
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <ResetPassword />
            </div>
        </div>
    )
}

export default Resetpass