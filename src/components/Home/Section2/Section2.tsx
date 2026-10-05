"use client";

import React from "react";
import { Users, ShieldCheck, Tag, Headphones, LucideIcon } from "lucide-react";

interface FeatureCard {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    id: 1,
    icon: Users,
    title: "Trust by Thousand",
    description:
      "Over 10,000+ satisfied customers trusting our marketplace.",
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "100% secure payment gateways & verified digital products.",
  },
  {
    id: 3,
    icon: Tag,
    title: "Best Price",
    description:
      "Guaranteed top market value and exclusive instant discounts.",
  },
  {
    id: 4,
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Dedicated round-the-clock support ready to help you anytime.",
  },
];

export default function Section2() {
  return (
    <section aria-label="Why Choose Us" className="w-full py-4 md:py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 md:gap-3.5 lg:gap-4">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group flex flex-col items-center justify-center text-center p-2.5 sm:p-3.5 md:p-4 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-xs sm:rounded-sm shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-200 min-h-[125px] sm:min-h-[140px] md:min-h-[155px]"
              >
                {/* Primary Color Line Icon */}
                <div className="text-primary dark:text-[#38bdf8] transition-transform duration-200 group-hover:scale-105">
                  <Icon className="size-5 sm:size-6 md:size-6.5" strokeWidth={1.6} />
                </div>

                {/* Bold Title */}
                <h3 className="mt-1.5 sm:mt-2 font-montserrat font-bold text-[11px] sm:text-xs md:text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-0.5 sm:mt-1 font-montserrat font-normal text-[9.5px] sm:text-[11px] md:text-xs text-zinc-500 dark:text-zinc-400 leading-tight sm:leading-snug max-w-[180px] mx-auto">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
