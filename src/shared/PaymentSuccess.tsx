"use client";

import React, { useEffect } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { CheckCircle2, Clock, Home, Package } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

function PaymentSuccess() {
  useEffect(() => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4 py-12 sm:py-16 bg-gradient-to-b from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-lg"
      >
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl text-center space-y-6">
          {/* Animated Success Icon */}
          <div className="relative mx-auto size-20 sm:size-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-950/60 animate-ping opacity-25" />
            <div className="relative size-20 sm:size-24 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner">
              <CheckCircle2 className="size-10 sm:size-12" />
            </div>
          </div>

          {/* Heading & Status Badge */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold font-montserrat bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
              <Clock className="size-3.5 animate-pulse" />
              <span>Status: Pending Verification</span>
            </div>

            <h1 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100 tracking-tight">
              Thank You for Your Order!
            </h1>
          </div>

          {/* Core Message */}
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 sm:p-5 border border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 font-montserrat text-sm sm:text-base leading-relaxed space-y-2">
            <p className="font-medium text-zinc-800 dark:text-zinc-200">
              Your order is now <span className="text-amber-600 dark:text-amber-400 font-bold">pending</span>.
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Our team will be in contact with you as soon as possible to verify payment and deliver your service. Thank you.
            </p>
          </div>

          {/* WhatsApp Fast Contact Prompt */}
          <div className="pt-1">
            <a
              href="https://wa.me/8801727877160"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-montserrat font-semibold text-xs sm:text-sm shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <FaWhatsapp className="size-4.5" />
              <span>Fast Verification via WhatsApp: 01727877160</span>
            </a>
          </div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Link
              href="/account/orders"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 active:scale-98 text-white font-montserrat font-semibold text-xs sm:text-sm shadow-md shadow-primary/20 transition-all cursor-pointer"
            >
              <Package className="size-4" />
              <span>View My Orders</span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-98 text-zinc-800 dark:text-zinc-200 font-montserrat font-semibold text-xs sm:text-sm transition-all cursor-pointer border border-zinc-200 dark:border-zinc-700"
            >
              <Home className="size-4" />
              <span>Return to Home</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentSuccess;