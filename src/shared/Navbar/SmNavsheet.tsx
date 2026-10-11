"use client"

import React, { useState } from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { RiMenu3Fill } from 'react-icons/ri'
import { navitems } from './Navbar'
import Image from 'next/image'
import logo from "@/assets/logo.png"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Home,
    ShoppingBag,
    PhoneCall,
    ChevronRight,
    User,
    Package,
    Sparkles,
} from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

const getNavIcon = (rout: string) => {
    switch (rout) {
        case "/":
            return Home
        case "/shop":
            return ShoppingBag
        case "/contact":
            return PhoneCall
        default:
            return Sparkles
    }
}

const getNavSubtitle = (rout: string) => {
    switch (rout) {
        case "/":
            return "Home & featured services"
        case "/shop":
            return "Explore all digital products"
        case "/contact":
            return "Get support & reach out"
        default:
            return "Explore"
    }
}

const SmNavSheet = () => {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger
                    className="flex items-center justify-center size-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/15 transition-all duration-150 cursor-pointer"
                    aria-label="Open navigation menu"
                >
                    <RiMenu3Fill className="text-xl text-white" />
                </SheetTrigger>

                <SheetContent
                    side="right"
                    className="w-[310px] sm:w-[360px] p-5 sm:p-6 flex flex-col justify-between overflow-y-auto bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800"
                >
                    <SheetHeader className="sr-only">
                        <SheetTitle>Mobile Navigation Menu</SheetTitle>
                        <SheetDescription>Browse categories, pages, and account</SheetDescription>
                    </SheetHeader>

                    {/* Top Content */}
                    <div className="space-y-6">
                        {/* Header Brand */}
                        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                            <Link
                                href="/"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2"
                            >
                                <Image
                                    src={logo}
                                    alt="DigiMart"
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>
                        </div>

                        {/* Display List for Nav Items */}
                        <div>
                            <p className="text-xs font-montserrat font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3 px-1">
                                Navigation
                            </p>
                            <ul className="space-y-2.5">
                                {navitems.map((item) => {
                                    const isActive =
                                        item.rout === "/"
                                            ? pathname === "/"
                                            : pathname === item.rout || pathname.startsWith(item.rout + "/");

                                    const Icon = getNavIcon(item.rout);

                                    return (
                                        <li key={item.id}>
                                            <Link
                                                href={item.rout}
                                                onClick={() => setOpen(false)}
                                                className={`group flex items-center justify-between p-3 rounded-xl transition-all duration-200 border ${
                                                    isActive
                                                        ? "bg-primary text-white border-primary shadow-md shadow-primary/25 font-semibold"
                                                        : "bg-zinc-50 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200/80 dark:border-zinc-800"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`size-9 rounded-lg flex items-center justify-center transition-colors ${
                                                            isActive
                                                                ? "bg-white/20 text-white"
                                                                : "bg-white dark:bg-zinc-800 text-primary group-hover:bg-primary group-hover:text-white border border-zinc-200 dark:border-zinc-700 shadow-2xs"
                                                        }`}
                                                    >
                                                        <Icon className="size-4.5" />
                                                    </div>
                                                    <div className="flex flex-col text-left">
                                                        <span className="font-montserrat text-sm font-semibold leading-tight">
                                                            {item.label}
                                                        </span>
                                                        <span
                                                            className={`text-[11px] font-montserrat ${
                                                                isActive
                                                                    ? "text-white/80"
                                                                    : "text-zinc-500 dark:text-zinc-400"
                                                            }`}
                                                        >
                                                            {getNavSubtitle(item.rout)}
                                                        </span>
                                                    </div>
                                                </div>

                                                <ChevronRight
                                                    className={`size-4 transition-transform group-hover:translate-x-0.5 ${
                                                        isActive ? "text-white" : "text-zinc-400"
                                                    }`}
                                                />
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                      
                    </div>

                    {/* Bottom WhatsApp Support Button */}
                    <div className="pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
                        <a
                            href="https://wa.me/8801727877160"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-montserrat font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-98"
                        >
                            <FaWhatsapp className="size-5" />
                            <span>WhatsApp Support (01727877160)</span>
                        </a>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default SmNavSheet;