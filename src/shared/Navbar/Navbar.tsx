"use client"
import { FaRegUser } from "react-icons/fa"
import { Heart } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import SmNavSheet from "./SmNavsheet"
import CartSheet from "./CartSheet"
import NavbarSearch from "./NavbarSearch"
import logo from "@/assets/logo.png"
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

export const navitems = [
    { id: 1, rout: "/", label: "Home" },
    { id: 2, rout: "/shop", label: "Shop" },
    { id: 4, rout: "/contact", label: "Contact" },
]

function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const wishlistCount = useSelector((state: RootState) => state.wishlistSlice.items.length);

    const handleMoveProfile = () => {
        router.push(`/account`);
    }

    const handleMoveWishlist = () => {
        router.push(`/wishlist`);
    }

    return (
        <div className='sticky top-0 left-0 z-50 bg-white/80 backdrop-blur-xl border-b border-zinc-200/70 shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_4px_20px_-6px_rgba(0,0,0,0.12)]'>
            <div className='container'>
                <div className='flex flex-row justify-between items-center gap-x-4 py-2.5'>
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
                        <ul className='flex flex-row items-center gap-1.5 p-1 rounded-full bg-gradient-to-b from-white to-zinc-100 border border-zinc-200 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_3px_rgba(0,0,0,0.06)]'>
                            {navitems?.map((i) => {
                                const isActive =
                                    i.rout === "/"
                                        ? pathname === "/"
                                        : pathname === i.rout || pathname.startsWith(i.rout + "/");
                                return (
                                    <li key={i?.id}>
                                        <Link
                                            href={i?.rout}
                                            className={`px-5 py-2 rounded-full font-montserrat text-sm transition-all duration-200 inline-block ${isActive
                                                    ? "bg-gradient-to-b from-primary to-primary/85 text-white font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_-2px_rgba(0,0,0,0.3)]"
                                                    : "text-zinc-600 font-medium hover:text-zinc-900 hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_3px_rgba(0,0,0,0.1)]"
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
                        <NavbarSearch />

                        <button
                            onClick={handleMoveWishlist}
                            aria-label="Wishlist"
                            className='relative cursor-pointer size-10 flex items-center justify-center rounded-full border border-zinc-200 bg-gradient-to-b from-white to-zinc-100 text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:text-rose-500 hover:to-zinc-50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_6px_rgba(0,0,0,0.12)] active:scale-95'
                        >
                            <Heart className="size-4.5 sm:size-5" />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-rose-500 text-white text-[10px] font-montserrat font-bold flex items-center justify-center shadow-xs">
                                    {wishlistCount > 99 ? "99+" : wishlistCount}
                                </span>
                            )}
                        </button>

                        <CartSheet />

                        <button
                            onClick={handleMoveProfile}
                            aria-label="User Account"
                            className='cursor-pointer size-10 flex items-center justify-center rounded-full border border-zinc-200 bg-gradient-to-b from-white to-zinc-100 text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_1px_3px_rgba(0,0,0,0.08)] transition-all hover:text-primary hover:to-zinc-50 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_2px_6px_rgba(0,0,0,0.12)] active:scale-95'
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