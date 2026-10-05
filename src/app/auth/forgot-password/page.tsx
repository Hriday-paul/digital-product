import ForgotPassForm from '@/components/Auth/ForgotPassForm'
import Pagetop from '@/shared/Pagetop'

import { IoIosArrowForward } from 'react-icons/io'
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Runbd forgot password Page",
    metadataBase: new URL('https://runbd.org'),
    alternates: {
        canonical: '/auth/forgot-password',
        languages: {
            en: `/auth/forgot-password`,
            bn: `/bn/auth/forgot-password`,
            'x-default': `/auth/forgot-password`
        }
    },
}

async function Forgot() {
    return (
        <div>
            <Pagetop title="Forgot Password">
                <h3 className="text-xs md:text-sm font-montserrat text-gray-100 flex flex-row gap-x-1.5 justify-center items-center">
                    <Link href='/' className='text-primary'>Home</Link> <IoIosArrowForward className='' /> Forgot Password
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <ForgotPassForm />
            </div>
        </div>
    )
}

export default Forgot