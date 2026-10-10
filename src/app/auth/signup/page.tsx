import SignUpForm from '@/components/Auth/SignUpForm'
import Pagetop from '@/shared/Pagetop'
import { Metadata } from 'next'
import Link from 'next/link'
import { IoIosArrowForward } from 'react-icons/io'

export const metadata: Metadata = {
    title: "Signup",
    description: "Runbd signup Page",
    metadataBase: new URL('https://runbd.org'),
    alternates: {
        canonical: '/auth/signup',
        languages: {
            en: `/auth/signup`,
            bn: `/bn/auth/signup`,
            'x-default': `/auth/signup`
        }
    },
}

async function SignUp() {
    return (
        <div>
            <Pagetop title="Signup">
                <h3 className="text-xs md:text-sm font-montserrat text-gray-100 flex flex-row gap-x-1.5 items-center">
                    <Link href='/'>Home</Link> <IoIosArrowForward className='' /> Signup
                </h3>
            </Pagetop>

            <div className='container px-5 md:px-0 my-10'>
                <SignUpForm />
            </div>

        </div>
    )
}

export default SignUp