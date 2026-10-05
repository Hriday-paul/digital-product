"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Headphones } from "lucide-react";

export default function Section6() {
  return (
    <section aria-label="Support Contact CTA" className="py-8 sm:py-12 md:py-16">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-2xl sm:rounded-3xl px-6 py-14 sm:px-12 sm:py-20 md:py-24 text-center shadow-lg bg-[url('/contact-bg.jpg')] bg-cover bg-center bg-no-repeat"
        >

          <div className="absolute inset-0 bg-gradient-to-r from-[#1479b4]/90 via-primary/90 to-[#2aa2e8]/90" />

          {/* Content */}
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            {/* Title */}
            <h2 className="font-montserrat font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
              Didn&apos;t find the answer?
            </h2>

            {/* Subtitle */}
            <p className="mt-3.5 sm:mt-4 text-sm sm:text-base font-normal text-white/90 font-montserrat leading-relaxed max-w-lg">
              Can&apos;t find what you&apos;re looking for? Contact our dedicated support team for instant assistance and personalized help.
            </p>

            {/* Dark Action Button matching reference design */}
            <Link
              href="/contact"
              className="mt-6 sm:mt-8 inline-flex items-center gap-2 rounded bg-[#1D2420] hover:bg-black text-white px-7 py-3 font-montserrat font-semibold text-sm sm:text-base shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Contact Us</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
