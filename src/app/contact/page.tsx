import type { Metadata } from "next";
import ContactSection from "@/components/Contact/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with AsifZoneBd. Let's talk about your project or business.",
};

export default function ContactPage() {
  return (
    <main className="min-h-[75vh]">
      <ContactSection />
    </main>
  );
}
