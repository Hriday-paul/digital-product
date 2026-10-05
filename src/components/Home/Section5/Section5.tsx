"use client";


import { ChevronDown } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "item-1",
    question: "অর্ডার করার পর কত সময়ে ডেলিভারি পাব?",
    answer:
      "পেমেন্ট কনফার্ম হওয়ার পর সাধারণত ৫–৩০ মিনিটের মধ্যে ডেলিভারি সম্পন্ন হয়। কিছু প্রিমিয়াম প্ল্যানে সর্বোচ্চ ১–২ ঘণ্টা সময় লাগতে পারে।",
  },
  {
    id: "item-2",
    question: "পেমেন্ট করার নিয়ম কী?",
    answer:
      "চেকআউটে bKash, Nagad বা Rocket সিলেক্ট করে নির্দিষ্ট নাম্বারে Send Money করুন। এরপর আপনার সেন্ডার নাম্বার ও Transaction ID দিয়ে অর্ডার কনফার্ম করুন।",
  },
  {
    id: "item-3",
    question: "আমি কীভাবে আমার অর্ডারের আপডেট দেখতে পারব?",
    answer:
      "অর্ডার করার পর Order Status পেজে রিয়েল-টাইম আপডেট দেখতে পাবেন। এছাড়া WhatsApp-এ অর্ডার কনফার্মেশন ও ডেলিভারি মেসেজ পাঠানো হয়।",
  },
  {
    id: "item-4",
    question: "শেয়ার্ড এবং পার্সোনাল প্ল্যানের পার্থক্য কী?",
    answer:
      "শেয়ার্ড প্ল্যানে একটি অ্যাকাউন্ট একাধিক ইউজারের মধ্যে ব্যবহৃত হয়, তাই দাম কম। পার্সোনাল প্ল্যানে সম্পূর্ণ অ্যাকাউন্ট শুধু আপনার — পাসওয়ার্ড পরিবর্তনের সুবিধাসহ।",
  },
  {
    id: "item-5",
    question: "আপনারা কি ওয়ারেন্টি বা রিপ্লেসমেন্ট দেন?",
    answer:
      "হ্যাঁ। সাবস্ক্রিপশনের পুরো সময় জুড়ে ওয়ারেন্টি থাকে। কোনো অ্যাকাউন্টে সমস্যা হলে দ্রুত রিপ্লেসমেন্ট বা সমাধান দেওয়া হয়।",
  },
  {
    id: "item-6",
    question: "কেনার পর কোনো সমস্যা হলে কী করণীয়?",
    answer:
      "আপনার Order ID সহ WhatsApp বা Messenger-এ আমাদের জানান। আমাদের সাপোর্ট টিম দ্রুত সমস্যাটি যাচাই করে সমাধান করবে। প্রয়োজন হলে রিপ্লেসমেন্টও প্রদান করা হবে।",
  },
];

export default function Section5() {
  return (
    <section aria-label="Frequently Asked Questions" className="py-8 sm:py-12 md:py-16 container">
      <div className="mx-auto max-w-3xl">
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-3xl leading-[1.2] font-semibold text-black dark:text-white sm:text-3xl lg:text-4xl font-montserrat">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-base text-text-blue dark:text-sky-400 sm:text-base font-montserrat max-w-lg mx-auto">
            Explore answers to commonly asked questions about our services, delivery, and payments.
          </p>
        </div>

        {/* shadcn/ui Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="mt-8 grid gap-3 sm:mt-10 sm:gap-3.5"
        >
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="group overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-[0_14px_40px_-30px_rgba(15,23,42,0.35)] backdrop-blur transition-all duration-300 data-[state=open]:border-primary/40 data-[state=open]:bg-primary/[0.04]"
            >
              <AccordionTrigger className="flex w-full min-h-[60px] cursor-pointer items-center justify-between gap-3 px-4 py-4 text-left text-[15px] font-semibold leading-snug text-foreground sm:px-5 sm:text-base hover:no-underline [&>svg]:hidden transition-colors data-[state=open]:text-primary">
                <span className="min-w-0 flex-1 transition-colors duration-200">
                  {faq.question}
                </span>
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full transition-all duration-300 bg-muted/70 text-muted-foreground group-data-[state=open]:bg-primary group-data-[state=open]:text-white group-data-[state=open]:rotate-180">
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="p-0">
                <p className="whitespace-pre-line px-4 pb-4 text-[14px] font-normal leading-relaxed text-muted-foreground sm:px-5 sm:pb-5 sm:text-[15px]">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
