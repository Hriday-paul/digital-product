"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Loader2, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

interface ContactFormData {
  name: string;
  phone: string;
  subject: string;
  email: string;
  message: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Contact Form Submitted:", data);
      toast.success("Thank you! Your message has been sent successfully.");
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#FAFAFA]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-primary font-semibold text-sm sm:text-base font-montserrat tracking-wide">
              Contact Us
            </span>
            <h1 className="mt-3 font-montserrat font-extrabold text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight leading-[1.18]">
              Let&apos;s talk with us
            </h1>
            <p className="mt-4 sm:mt-5 text-sm sm:text-base text-neutral-500 font-montserrat leading-relaxed max-w-lg">
              Have questions, need assistance, or want to discuss your concerns? We&apos;re here to help! Fill out the form, and our team will get back to you promptly.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:gap-5 mt-4 sm:mt-5">
              {/* Call Us */}
              <div className="flex items-center gap-3.5">
                <div className="size-11 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-xs">
                  <Phone className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                    Call Us
                  </span>
                  <a
                    href="tel:+8801336832636"
                    className="text-base sm:text-lg font-semibold text-primary transition-colors font-montserrat"
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
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                    WhatsApp
                  </span>
                  <a
                    href="https://wa.me/8801336832636"
                    className="text-base sm:text-lg font-semibold text-primary transition-colors font-montserrat"
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
                  <span className="text-xs uppercase tracking-wider text-zinc-500 font-medium">
                    Message Us
                  </span>
                  <a
                    href="mailto:digimart24@gmail.com"
                    className="text-base sm:text-lg font-semibold text-primary transition-colors font-montserrat"
                  >
                    digimart24@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-5 sm:mt-8">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="size-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaFacebookF size={15} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="size-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaInstagram size={15} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="size-10 rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaTwitter size={15} />
              </Link>
            </div>

          </div>

          {/* Right Column: Contact Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-gray-100 p-6 sm:p-8 md:p-10">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Name & Phone in 2 Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-neutral-800 font-montserrat mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Name"
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg text-sm font-montserrat text-neutral-900 bg-[#E8ECEF] placeholder:text-neutral-400 border transition-all duration-200 outline-none ${errors.name
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                        : "border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                        }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500 font-montserrat font-medium">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-neutral-800 font-montserrat mb-1.5"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Phone"
                      {...register("phone", {
                        required: "Phone is required",
                        pattern: {
                          value: /^[0-9+\s\-()]{7,20}$/,
                          message: "Please enter a valid phone number",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg text-sm font-montserrat text-neutral-900 bg-[#E8ECEF] placeholder:text-neutral-400 border transition-all duration-200 outline-none ${errors.phone
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                        : "border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                        }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500 font-montserrat font-medium">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold text-neutral-800 font-montserrat mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Subject"
                    {...register("subject", {
                      required: "Subject is required",
                      minLength: {
                        value: 3,
                        message: "Subject must be at least 3 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-montserrat text-neutral-900 bg-[#E8ECEF] placeholder:text-neutral-400 border transition-all duration-200 outline-none ${errors.subject
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                      : "border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-red-500 font-montserrat font-medium">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-neutral-800 font-montserrat mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-montserrat text-neutral-900 bg-[#E8ECEF] placeholder:text-neutral-400 border transition-all duration-200 outline-none ${errors.email
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                      : "border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500 font-montserrat font-medium">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-neutral-800 font-montserrat mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Message"
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-montserrat text-neutral-900 bg-[#E8ECEF] placeholder:text-neutral-400 border transition-all duration-200 outline-none resize-y ${errors.message
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-red-50/20"
                      : "border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                      }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500 font-montserrat font-medium">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Full Width Submit Button in Primary Color */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 px-6 rounded-lg bg-primary hover:bg-[#1577b0] active:scale-[0.99] text-white font-montserrat font-semibold text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Submit</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
