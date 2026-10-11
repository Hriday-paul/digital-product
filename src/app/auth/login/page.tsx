import LoginForm from '@/components/Auth/LoginForm'
import Pagetop from '@/shared/Pagetop'

import { Metadata } from 'next'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Login",
    description: "Account login Page",
    metadataBase: new URL('https://asifzonebd.com'),
    alternates: {
        canonical: '/auth/login',
        languages: {
            en: `/auth/login`,
            'x-default': `/auth/login`
        }
    },
}

async function LoginPage() {
    return (
        <div>
            <Pagetop title="Login">
                <h3 className="text-xs md:text-sm font-montserrat text-gray-100 flex flex-row gap-x-1.5 items-center">
                    <Link href='/'>Home</Link> <IoIosArrowForward className='' /> Login
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <LoginForm />
            </div>

        </div>
    )
}

export default LoginPage