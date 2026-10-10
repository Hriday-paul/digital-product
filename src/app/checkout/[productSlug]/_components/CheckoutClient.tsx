"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  ChevronRight,
  Copy,
  Check,
  CreditCard,
  User,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  Loader2,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { IService, IServiceVariant, PaymentMethodType, PlaceOrderPayload } from "@/redux/types";

import { cn } from "@/lib/utils";
import OrderGuide from "./OrderGuide";

import bkashImg from "@/assets/Home/payment/bkash.webp";
import nagadImg from "@/assets/Home/payment/nagad.webp";
import rocketImg from "@/assets/Home/payment/rocket.png";
import { usePlaceOrderMutation } from "@/redux/api/Order.api";

interface CheckoutClientProps {
  service: IService;
  variant: IServiceVariant;
}

interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerWhatsapp: string;
  customerNote?: string;
  accountNumber: string;
  transactionId: string;
}

const PAYMENT_METHODS = [
  {
    id: "BKASH" as PaymentMethodType,
    name: "bKash",
    number: "01790079486",
    type: "Personal (Send Money)",
    image: bkashImg,
  },
  {
    id: "NAGAD" as PaymentMethodType,
    name: "Nagad",
    number: "01790079486",
    type: "Personal (Send Money)",
    image: nagadImg,
  },
  {
    id: "ROCKET" as PaymentMethodType,
    name: "Rocket",
    number: "01790079486",
    type: "Personal (Send Money)",
    image: rocketImg,
  },
];

export default function CheckoutClient({ service, variant }: CheckoutClientProps) {
  const router = useRouter();
  const [PlaceOrder, {isLoading : isSubmitting}] = usePlaceOrderMutation();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("BKASH");
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    mode: "onTouched",
  });

  const activeMethodConfig = PAYMENT_METHODS.find((m) => m.id === selectedMethod) || PAYMENT_METHODS[0];

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(activeMethodConfig.number);
    setCopied(true);
    toast.success(`নম্বর কপি করা হয়েছে: ${activeMethodConfig.number}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const payload: PlaceOrderPayload = {
        serviceId: service.id,
        variantId: variant.id,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerWhatsapp: data.customerWhatsapp,
        customerNote: data.customerNote || undefined,
        paymentMethod: selectedMethod,
        accountNumber: data.accountNumber,
        transactionId: data.transactionId,
        amount: variant.final_price,
      };

      await PlaceOrder(payload);
      toast.success("অর্ডার সফলভাবে গ্রহণ করা হয়েছে!");
      router.push("/payment/success");
    } catch (err: any) {
      toast.error(err?.message || "অর্ডার সম্পন্ন করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    }
  };

  const serviceImage = service.images?.[0]?.url || "/serviceImg.webp";

  return (
    <div className="min-h-screen bg-[#FBFBFB] dark:bg-zinc-950 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-3.5">
        <div className="container mx-auto">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm text-zinc-500 font-montserrat"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3.5 text-zinc-400" />
            <Link href="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <ChevronRight className="size-3.5 text-zinc-400" />
            <Link href={`/shop/${service.slug}`} className="hover:text-primary transition-colors truncate max-w-xs">
              {service.title}
            </Link>
            <ChevronRight className="size-3.5 text-zinc-400" />
            <span className="text-primary font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto mt-6 sm:mt-10">
        <div className="mb-6">
          <h1 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-100">
            Checkout & Order Confirmation
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 font-montserrat">
            অনুগ্রহ করে আপনার তথ্য দিন এবং পেমেন্ট সম্পন্ন করে অর্ডারটি কনফার্ম করুন
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Customer Form & Payment Details */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Customer Information Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-5">
                  <User className="size-5 text-primary" />
                  <h2 className="font-montserrat font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100">
                    Customer Information (গ্রাহকের তথ্য)
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="customerName" className="block text-xs sm:text-sm font-semibold font-montserrat text-zinc-800 dark:text-zinc-200 mb-1.5">
                      Customer Name (আপনার নাম) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="customerName"
                      type="text"
                      placeholder="e.g. Rahim Ahmed"
                      {...register("customerName", {
                        required: "Customer name is required",
                        minLength: { value: 2, message: "Name must be at least 2 characters" },
                      })}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-sm font-montserrat bg-[#F4F6F8] dark:bg-zinc-800 border transition-all outline-none",
                        errors.customerName
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-transparent focus:border-primary focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-primary/20"
                      )}
                    />
                    {errors.customerName && (
                      <p className="mt-1 text-xs text-red-500 font-montserrat">{errors.customerName.message}</p>
                    )}
                  </div>

                  {/* Email & WhatsApp in 2 columns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label htmlFor="customerEmail" className="block text-xs sm:text-sm font-semibold font-montserrat text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
                        <Mail className="size-3.5 text-zinc-400" />
                        <span>Email Address (ইমেইল)</span> <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="customerEmail"
                        type="email"
                        placeholder="you@example.com"
                        {...register("customerEmail", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Enter a valid email address",
                          },
                        })}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg text-sm font-montserrat bg-[#F4F6F8] dark:bg-zinc-800 border transition-all outline-none",
                          errors.customerEmail
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-transparent focus:border-primary focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-primary/20"
                        )}
                      />
                      {errors.customerEmail && (
                        <p className="mt-1 text-xs text-red-500 font-montserrat">{errors.customerEmail.message}</p>
                      )}
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label htmlFor="customerWhatsapp" className="block text-xs sm:text-sm font-semibold font-montserrat text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
                        <FaWhatsapp className="size-3.5 text-emerald-500" />
                        <span>WhatsApp Number</span> <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="customerWhatsapp"
                        type="tel"
                        placeholder="e.g. 017XXXXXXXX"
                        {...register("customerWhatsapp", {
                          required: "WhatsApp number is required",
                          pattern: {
                            value: /^[0-9+\s\-()]{7,20}$/,
                            message: "Enter a valid WhatsApp number",
                          },
                        })}
                        className={cn(
                          "w-full px-4 py-3 rounded-lg text-sm font-montserrat bg-[#F4F6F8] dark:bg-zinc-800 border transition-all outline-none",
                          errors.customerWhatsapp
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-transparent focus:border-primary focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-primary/20"
                        )}
                      />
                      {errors.customerWhatsapp && (
                        <p className="mt-1 text-xs text-red-500 font-montserrat">{errors.customerWhatsapp.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Customer Note */}
                  <div>
                    <label htmlFor="customerNote" className="block text-xs sm:text-sm font-semibold font-montserrat text-zinc-800 dark:text-zinc-200 mb-1.5 flex items-center gap-1.5">
                      <FileText className="size-3.5 text-zinc-400" />
                      <span>Additional Note / Instructions (ঐচ্ছিক)</span>
                    </label>
                    <textarea
                      id="customerNote"
                      rows={3}
                      placeholder="কোনো বিশেষ নির্দেশনা বা প্রয়োজনীয় তথ্য থাকলে লিখুন..."
                      {...register("customerNote")}
                      className="w-full px-4 py-3 rounded-lg text-sm font-montserrat bg-[#F4F6F8] dark:bg-zinc-800 border border-transparent focus:border-primary focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-primary/20 transition-all outline-none resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Selection */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 shadow-xs">
                <div className="flex items-center gap-2.5 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-5">
                  <CreditCard className="size-5 text-primary" />
                  <h2 className="font-montserrat font-bold text-base sm:text-lg text-zinc-900 dark:text-zinc-100">
                    Payment Method (পেমেন্ট মাধ্যম সিলেক্ট করুন)
                  </h2>
                </div>

                {/* 3 Payment Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PAYMENT_METHODS.map((pm) => {
                    const isSelected = selectedMethod === pm.id;
                    return (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setSelectedMethod(pm.id)}
                        className={cn(
                          "relative p-4 rounded-xl border-2 flex flex-col items-center text-center gap-2.5 transition-all duration-200 cursor-pointer bg-white dark:bg-zinc-900",
                          isSelected
                            ? "border-primary bg-primary/[0.04] shadow-xs"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                      >
                        <div className="h-10 w-24 relative flex items-center justify-center">
                          <Image
                            src={pm.image}
                            alt={pm.name}
                            height={40}
                            className="h-9 w-auto object-contain"
                          />
                        </div>
                        <span className="font-montserrat font-bold text-sm text-zinc-900 dark:text-zinc-100">
                          {pm.name}
                        </span>
                        <div
                          className={cn(
                            "size-5 rounded-full flex items-center justify-center transition-colors",
                            isSelected ? "bg-primary text-white" : "border-2 border-zinc-300 dark:border-zinc-600"
                          )}
                        >
                          {isSelected && <Check className="size-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Send Money Number Instruction Box */}
                <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs sm:text-sm font-semibold font-montserrat text-zinc-700 dark:text-zinc-300">
                      Send Money to {activeMethodConfig.name} Personal Number:
                    </span>
                    <span className="text-[11px] font-bold font-montserrat uppercase px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {activeMethodConfig.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-lg sm:text-xl text-primary tracking-wider">
                        {activeMethodConfig.number}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-montserrat font-semibold transition-all cursor-pointer",
                        copied
                          ? "bg-green-600 text-white"
                          : "bg-primary hover:bg-primary/90 text-white active:scale-95"
                      )}
                    >
                      {copied ? (
                        <>
                          <Check className="size-3.5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3.5" />
                          <span>Copy Number</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-zinc-500 font-montserrat">
                    📌 অনুগ্রহ করে <strong>৳{variant.final_price}</strong> টাকা উক্ত নম্বরে সেন্ড মানি করুন। এরপর নিচের বক্সে আপনার প্রেরক নম্বর এবং TrxID দিয়ে অর্ডার সম্পন্ন করুন।
                  </p>
                </div>

                {/* 2 Payment Inputs: accountNumber & transactionId */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Account Number */}
                  <div>
                    <label htmlFor="accountNumber" className="block text-xs sm:text-sm font-semibold font-montserrat text-zinc-800 dark:text-zinc-200 mb-1.5">
                      Sender Account Number (প্রেরক নম্বর) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="accountNumber"
                      type="text"
                      placeholder="যে নম্বর থেকে টাকা পাঠিয়েছেন (01XXXXXXXXX)"
                      {...register("accountNumber", {
                        required: "Account number is required",
                        minLength: { value: 11, message: "Enter a valid 11-digit mobile number" },
                      })}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-sm font-montserrat bg-[#F4F6F8] dark:bg-zinc-800 border transition-all outline-none",
                        errors.accountNumber
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-transparent focus:border-primary focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-primary/20"
                      )}
                    />
                    {errors.accountNumber && (
                      <p className="mt-1 text-xs text-red-500 font-montserrat">{errors.accountNumber.message}</p>
                    )}
                  </div>

                  {/* Transaction ID */}
                  <div>
                    <label htmlFor="transactionId" className="block text-xs sm:text-sm font-semibold font-montserrat text-zinc-800 dark:text-zinc-200 mb-1.5">
                      Transaction ID (TrxID) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="transactionId"
                      type="text"
                      placeholder="e.g. BL9A7K2M1X"
                      {...register("transactionId", {
                        required: "Transaction ID is required",
                        minLength: { value: 6, message: "Transaction ID is too short" },
                      })}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg text-sm font-montserrat bg-[#F4F6F8] dark:bg-zinc-800 border transition-all outline-none uppercase font-mono",
                        errors.transactionId
                          ? "border-red-500 focus:ring-2 focus:ring-red-200"
                          : "border-transparent focus:border-primary focus:bg-white dark:focus:bg-zinc-900 focus:ring-2 focus:ring-primary/20"
                      )}
                    />
                    {errors.transactionId && (
                      <p className="mt-1 text-xs text-red-500 font-montserrat">{errors.transactionId.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-xl bg-primary hover:bg-[#1577b0] active:scale-[0.99] text-white font-montserrat font-bold text-base sm:text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="size-5" />
                      <span>Confirm & Place Order (৳{variant.final_price})</span>
                    </>
                  )}
                </button>
                <p className="mt-2.5 text-center text-xs text-zinc-500 font-montserrat">
                  🔒 আপনার তথ্য সম্পূর্ণ সুরক্ষিত। অর্ডারের পর অতি দ্রুত আপনার সাথে যোগাযোগ করা হবে।
                </p>
              </div>
            </div>

            {/* Right Column: Service Info & Order Guide */}
            <div className="lg:col-span-5 space-y-6">
              {/* Service Summary Card */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-xs">
                <h3 className="font-montserrat font-bold text-base text-zinc-900 dark:text-zinc-100 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  Order Summary
                </h3>

                {/* Service Visual & Title */}
                <div className="mt-4 flex gap-4 items-center">
                  <div className="relative size-20 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-800">
                    <Image
                      src={serviceImage}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-primary font-montserrat uppercase block">
                      {service.category?.name || "Digital Service"}
                    </span>
                    <h4 className="font-montserrat font-bold text-sm text-zinc-900 dark:text-zinc-100 truncate mt-0.5">
                      {service.title}
                    </h4>
                    <p className="text-xs text-zinc-500 font-montserrat mt-1">
                      Plan: <strong className="text-zinc-800 dark:text-zinc-200">{variant.timeLine}</strong> ({variant.accountType})
                    </p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2.5 text-xs sm:text-sm font-montserrat">
                  <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
                    <span>Base Price</span>
                    <span className="line-through text-zinc-400">৳{variant.base_price}</span>
                  </div>

                  {variant.discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-600 font-medium">
                      <span>Discount</span>
                      <span>-৳{variant.base_price - variant.final_price} ({variant.discount}%)</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800 text-base font-bold text-zinc-900 dark:text-zinc-100">
                    <span>Total Payable</span>
                    <span className="text-primary font-extrabold text-xl">৳{variant.final_price}</span>
                  </div>
                </div>
              </div>

              {/* Order Guide Component */}
              <OrderGuide />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

