"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  ShieldCheck,
  PhoneCall,
  FileText,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function OrderGuide() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xs overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <HelpCircle className="size-5" />
          </div>
          <div>
            <h3 className="font-montserrat font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100">
              অর্ডার ও পেমেন্ট সংক্রান্ত গুরুত্বপূর্ণ তথ্য (Order Guide)
            </h3>
            <p className="text-xs text-zinc-500 font-montserrat mt-0.5">
              অর্ডার সম্পন্ন করার পূর্বে অবশ্যই গুরুত্বপূর্ণ নিয়মাবলী পড়ে নিন
            </p>
          </div>
        </div>

        <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
          {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
        </div>
      </button>

      {/* Guide Content */}
      {isOpen && (
        <div className="p-5 sm:p-6 pt-0 border-t border-zinc-100 dark:border-zinc-800 space-y-6 text-sm font-montserrat text-zinc-700 dark:text-zinc-300">
          {/* Pre-order WhatsApp Notice */}
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
            <p className="font-semibold text-sm flex items-center gap-2">
              <AlertTriangle className="size-4 text-amber-600 shrink-0" />
              <span>প্রিয় গ্রাহক,</span>
            </p>
            <p className="mt-1 text-xs sm:text-sm leading-relaxed">
              অর্ডার করার পূর্বে অনুগ্রহ করে আমাদের হোয়াটসঅ্যাপ নম্বরে যোগাযোগ করে পণ্যের স্টক, মূল্য ও অন্যান্য বিস্তারিত তথ্য নিশ্চিত হয়ে তারপর অর্ডার সম্পন্ন করুন।
            </p>
          </div>

          {/* Payment Methods */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              <span>আমাদের পেমেন্ট মাধ্যমসমূহ</span>
            </h4>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              আপনার সুবিধার কথা বিবেচনা করে আমরা একাধিক নিরাপদ ও সহজ পেমেন্ট ব্যবস্থা রেখেছি। আপনি আপনার পছন্দের যেকোনো মাধ্যমে আমাদের পেমেন্ট করতে পারবেন:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold">
                <p>✅ বিকাশ (Personal)</p>
                <p className="font-mono text-primary">01790079486</p>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold">
                <p>✅ নগদ (Personal)</p>
                <p className="font-mono text-primary">01790079486</p>
              </div>
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold">
                <p>✅ উপায় / রকেট</p>
                <p className="font-mono text-primary">01790079486</p>
              </div>
            </div>
            <p className="text-xs text-zinc-500 pt-1">
              🔰 <strong>নিরাপদ লেনদেনের নিশ্চয়তা:</strong> আপনি যেকোনো পেমেন্ট মাধ্যম ব্যবহার করুন না কেন, আমরা আপনার লেনদেনের নিরাপত্তা, নির্ভরযোগ্যতা ও স্বচ্ছতা নিশ্চিত করতে সর্বোচ্চ গুরুত্ব দিয়ে থাকি। আপনার আস্থা ও সন্তুষ্টিই আমাদের প্রধান অগ্রাধিকার!
            </p>
          </div>

          {/* Support & Delivery */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-2 text-blue-950 dark:text-blue-200">
            <h4 className="font-bold flex items-center gap-2 text-sm">
              <PhoneCall className="size-4 text-primary" />
              <span>সেবা, সাপোর্ট ও ডেলিভারি সংক্রান্ত তথ্য</span>
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed">
              ✅ আমাদের সকল সেবা, সাপোর্ট ও ডিজিটাল প্রোডাক্ট ডেলিভারি কার্যক্রম হোয়াটসঅ্যাপের মাধ্যমে পরিচালনা করা হয়। দ্রুত সার্ভিস গ্রহণ, অর্ডার নিশ্চিতকরণ, অ্যাকাউন্ট সংক্রান্ত তথ্য, যেকোনো সমস্যা বা সহায়তার জন্য আমাদের হোয়াটসঅ্যাপ নম্বরে যোগাযোগ করুন।
            </p>
            <div className="pt-1">
              <a
                href="https://wa.me/8801727877160"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-xs transition-transform active:scale-95"
              >
                <FaWhatsapp className="size-4" />
                <span>হোয়াটসঅ্যাপ: 01727877160</span>
              </a>
            </div>
            <p className="text-xs text-blue-800/80 dark:text-blue-300/80">
              ✅ হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করলে আমরা আপনার অনুরোধ দ্রুত যাচাই করে প্রয়োজনীয় সাপোর্ট ও সার্ভিস প্রদানের সর্বোচ্চ চেষ্টা করব।
            </p>
          </div>

          {/* Refund Policy */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <FileText className="size-4 text-primary" />
              <span>ডিজিটাল প্রোডাক্ট রিফান্ড নীতিমালা</span>
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              <p>
                <strong>১. শেয়ার্ড অ্যাকাউন্ট সম্পর্কে:</strong> আমাদের সরবরাহকৃত কিছু ডিজিটাল প্রোডাক্ট শেয়ার্ড অ্যাকাউন্ট হিসেবে প্রদান করা হতে পারে। একাধিক ব্যবহারকারীর ব্যবহারের কারণে কিছু নির্দিষ্ট সীমাবদ্ধতা থাকতে পারে।
              </p>
              <p>
                <strong>২. ব্যবহার সীমাবদ্ধতা:</strong> কিছু অ্যাকাউন্টে ব্যবহার সীমা, লগইন সীমাবদ্ধতা, ডিভাইস সীমা বা নির্দিষ্ট ফিচার ব্যবহারে সীমাবদ্ধতা থাকতে পারে। তবে যে সকল সুবিধা প্রদান করা সম্ভব, তা নিশ্চিত করার জন্য আমরা সর্বোচ্চ চেষ্টা করি।
              </p>
              <p>
                <strong>৩. অ্যাকাউন্টের নিরাপত্তা:</strong> অ্যাকাউন্টের পাসওয়ার্ড পরিবর্তন করা, অন্য ব্যক্তির সাথে শেয়ার করা বা অ্যাকাউন্টের সেটিংসে পরিবর্তন করা সম্পূর্ণ নিষিদ্ধ।
              </p>
              <p>
                <strong>৪. রিফান্ড ও সাপোর্ট:</strong> শেয়ার্ড অ্যাকাউন্টের ক্ষেত্রে পূর্ব নির্ধারিত সীমাবদ্ধতা ও ব্যবহারের নিয়ম অনুযায়ী সেবা প্রদান করা হয়। কোনো ফিচার সীমিত থাকা বা ব্যবহারকারীর ব্যক্তিগত প্রয়োজন অনুযায়ী কাজ না করলে তা রিফান্ডের আওতাভুক্ত হবে না।
              </p>
              <p className="text-amber-700 dark:text-amber-400 text-xs font-medium">
                ✅ <strong>গুরুত্বপূর্ণ:</strong> অর্ডার করার পূর্বে পণ্যের ধরন, ব্যবহার পদ্ধতি ও সম্ভাব্য সীমাবদ্ধতা সম্পর্কে নিশ্চিত হয়ে অর্ডার করুন। আমরা সর্বোচ্চ মানের সেবা ও ব্যবহারকারীর সন্তুষ্টি নিশ্চিত করতে কাজ করি।
              </p>
            </div>
          </div>

          {/* Price Updates Notice */}
          <div className="p-3.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-600 dark:text-zinc-400">
            <p className="font-semibold text-zinc-800 dark:text-zinc-200">
              ✅ মূল্য পরিবর্তন ও আপডেট সংক্রান্ত তথ্য:
            </p>
            <p className="mt-1 leading-relaxed">
              আমাদের সকল ডিজিটাল প্রোডাক্ট ও সার্ভিসের মূল্য যেকোনো সময় পরিবর্তন হতে পারে। বাজার পরিস্থিতি, সার্ভিস আপডেট বা অন্যান্য কারণে দাম কম বা বেশি হওয়ার সম্ভাবনা রয়েছে। সর্বশেষ মূল্য ও নতুন অফার জানতে আমাদের সাথে যুক্ত থাকুন।
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

