"use client"
import { FaRegUser } from "react-icons/fa"
import SmNavSheet from "./SmNavsheet"
import logo from "@/assets/logo1.webp"
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

export const navitems = [
    {
        id: 1,
        rout: "/",
        label: "Home"
    },
    {
        id: 2,
        rout: "/shop",
        label: "Shop"
    },
    {
        id: 4,
        rout: "/contact",
        label: "Contact"
    },
]

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const handleMoveProfile = () => {
        router.push(`/account`);
    }

    return (
        <div className='bg-[#00040C] shadow-md sticky top-0 z-50 left-0 border-b border-white/10'>
            <div className='container'>
                <div className='flex flex-row justify-between items-center gap-x-4 py-2.5 sm:py-3'>
                    <Link href={"/"}>
                        <div className="flex flex-row gap-x-1 items-center">
                            <Image
                                src={logo}
                                alt='logo'
                                className='h-11 sm:h-14 md:h-16 xl:h-18 w-auto object-cover'
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Navigation List */}
                    <nav className='hidden lg:flex items-center'>
                        <ul className='flex flex-row items-center gap-1.5 p-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md shadow-inner'>
                            {navitems?.map((i) => {
                                const isActive =
                                    i.rout === "/"
                                        ? pathname === "/"
                                        : pathname === i.rout || pathname.startsWith(i.rout + "/");
                                return (
                                    <li key={i?.id}>
                                        <Link
                                            href={i?.rout}
                                            className={`px-5 py-2 rounded-full font-montserrat text-sm transition-all duration-200 inline-block ${
                                                isActive
                                                    ? "bg-primary text-white font-semibold shadow-sm shadow-primary/30"
                                                    : "text-zinc-300 font-medium hover:text-white hover:bg-white/10"
                                            }`}
                                        >
                                            {i?.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="flex flex-row gap-x-2.5 sm:gap-x-3 items-center">
                        <button
                            onClick={handleMoveProfile}
                            aria-label="User Account"
                            className='cursor-pointer size-10 flex items-center justify-center bg-white/10 hover:bg-white/20 active:scale-95 border border-white/15 rounded-full transition-all text-white'
                        >
                            <FaRegUser className="text-base sm:text-lg" />
                        </button>

                        <section className='lg:hidden'>
                            <SmNavSheet />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar