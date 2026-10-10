"use client"
import { List, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { IoSettingsOutline } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';

const routs: { id: number, name: string, rout: string, icon: React.ReactNode }[] = [
    {
        id: 1,
        name: "Dashboard",
        icon: <MdDashboard size={16}/>,
        rout: '/account'
    },
    {
        id: 3,
        name: "Orders",
        icon: <ShoppingCart size={16} />,
        rout: '/account/orders'
    },
    {
        id: 5,
        name: "Settings",
        icon: <IoSettingsOutline  size={16}/>,
        rout: '/account/settings'
    }]

function AccountNav() {
    const pathname = usePathname();
    return (
        <div className='bg-white shadow-md border-y border-zinc-100 py-5'>
            <div className='container'>
                <div className=' flex flex-row justify-between items-center gap-x-5'>

                    <ul className='flex flex-row gap-x-3 md:gap-x-5 lg:gap-x-8 items-center'>

                        {routs?.map((i) => {
                            const isActive = pathname === i.rout;
                            return (
                                <li
                                    key={i?.id}
                                    className={`font-montserrat text-base duration-200 flex flex-row gap-x-2 items-center ${isActive
                                        ? "text-primary"
                                        : "text-gray-800 hover:text-primary"
                                        }`}
                                >
                                    {i?.icon}
                                    <Link href={i?.rout}>{i?.name}</Link>
                                </li>
                            );
                        })}

                    </ul>

                </div>
            </div>
        </div>
    )
}

export default AccountNav