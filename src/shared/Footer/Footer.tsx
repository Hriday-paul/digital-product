"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Phone, Mail } from "lucide-react";
import logo from "@/assets/logo.png";

import paymentMethod from "@/assets/Home/payment/bkash-nagad-rocket.png";

export default function Footer() {
  return (
    <footer className="bg-[#1D2420] text-white font-montserrat bg-[url('/footer_grain_texture.png')] bg-contain bg-center bg-repeat">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* Left Column: Brand & Socials */}
          <div className="lg:col-span-3 flex flex-col">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src={logo}
                alt="DigiMart"
                className="h-10 sm:h-12 w-auto object-contain brightness-110"
              />
              <span className="font-montserrat font-bold text-2xl sm:text-3xl text-white tracking-tight">
                DigiMart
              </span>
            </Link>

            <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-xs">
              DigiMart is your trusted digital marketplace, offering a wide range of services and products to meet your needs.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex items-center gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-8 rounded-full bg-white/10 hover:bg-primary text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaFacebookF size={13} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-8 rounded-full bg-white/10 hover:bg-primary text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaInstagram size={13} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="size-8 rounded-full bg-white/10 hover:bg-primary text-zinc-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaTwitter size={13} />
              </Link>
            </div>
          </div>

          {/* Middle Column: Contact Phone & Email (Replaces Newsletter) */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-4 sm:gap-5 p-5 sm:p-6">
            {/* Call Us */}
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-xs">
                <Phone className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  Call Us
                </span>
                <a
                  href="tel:+8801336832636"
                  className="text-base sm:text-lg font-semibold text-white hover:text-primary transition-colors font-montserrat"
                >
                  01336-832636
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-xs">
                <FaWhatsapp className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  WhatsApp
                </span>
                <a
                  href="https://wa.me/8801336832636"
                  className="text-base sm:text-lg font-semibold text-white hover:text-primary transition-colors font-montserrat"
                >
                  01336-832636
                </a>
              </div>
            </div>

            {/* Message Us */}
            <div className="flex items-center gap-3.5">
              <div className="size-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-xs">
                <Mail className="size-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                  Message Us
                </span>
                <a
                  href="mailto:digimart24@gmail.com"
                  className="text-base sm:text-lg font-semibold text-white hover:text-primary transition-colors font-montserrat"
                >
                  digimart24@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Links, Divider, Copyright & Payment Badges */}
          <div className="md:col-span-2 lg:col-span-5 flex flex-col justify-between h-full pt-1">
            {/* Navigation Links separated by primary-colored dots */}
            <nav className="flex flex-wrap lg:justify-end items-center gap-x-3 gap-y-2 text-sm sm:text-[15px] font-medium text-zinc-300">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-primary font-bold select-none">•</span>
              <Link href="/shop" className="hover:text-primary transition-colors">
                Shop
              </Link>
              <span className="text-primary font-bold select-none">•</span>
              <Link href="/#faqs" className="hover:text-primary transition-colors">
                Faqs
              </Link>
              <span className="text-primary font-bold select-none">•</span>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact Us
              </Link>
              <span className="text-primary font-bold select-none">•</span>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Support
              </Link>
            </nav>

            {/* Hairline Divider */}
            <div className="my-5 border-t border-zinc-700/60" />

            {/* Bottom Row: Copyright + Payment Badges */}
            <div className="space-y-4 flex flex-col lg:justify-end">
              <p className="text-sm text-zinc-300 font-normal lg:text-right">
                Copyright © {new Date().getFullYear()} DigiMart, All rights reserved.
              </p>

              {/* Payment Method Badges */}
              <Image
                src={paymentMethod}
                alt={"Payment Method"}
                height={500}
                width={500}
                className="h-8 w-auto object-contain mr-auto lg:mr-0 lg:ml-auto"
              />

            </div>

            {/* Developer Attribution */}
            <div className="mt-3 text-[11px] text-zinc-400 lg:text-right lg:ml-auto">
              Developed by{" "}
              <Link
                href="https://hriday-paul.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hridoy Paul
              </Link>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
