import Pagetop from '@/shared/Pagetop'
import Link from 'next/link'
import React from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import AccountNav from './_components/AccountNav'



const layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Pagetop title='Account'>
        <h3 className="text-xs md:text-sm font-clash text-gray-100 flex flex-row gap-x-1.5 items-center">
          <Link href='/' className='font-montserrat'>Home</Link> <IoIosArrowForward className='' /> <p className='font-montserrat'>Account</p>
        </h3>
      </Pagetop>

      <AccountNav />

      {children}
    </div>
  )
}

export default layout