"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaWhatsapp, FaFacebookMessenger } from "react-icons/fa";
import { PhoneCall, MessageCircleMore, X } from "lucide-react";

const CHAT_OPTIONS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/8801727877160",
    icon: FaWhatsapp,
    bgClass: "bg-[#25D366] hover:bg-[#20bd5a] shadow-[#25D366]/30",
    external: true,
  },
  {
    id: "messenger",
    label: "Messenger",
    href: "https://www.facebook.com/asifzone486",
    icon: FaFacebookMessenger,
    bgClass: "bg-[#0084FF] hover:bg-[#0073e6] shadow-[#0084FF]/30",
    external: true,
  },
  {
    id: "call",
    label: "Direct Call",
    href: "tel:+8801727877160",
    icon: PhoneCall,
    bgClass: "bg-primary hover:bg-[#1577b0] shadow-primary/30",
    external: false,
  },
];

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 font-montserrat"
    >
      {/* Expanded Chat Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end gap-2.5 mb-1"
          >
            {CHAT_OPTIONS.map((option, index) => {
              const Icon = option.icon;
              return (
                <motion.a
                  key={option.id}
                  href={option.href}
                  target={option.external ? "_blank" : undefined}
                  rel={option.external ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 16, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: (CHAT_OPTIONS.length - 1 - index) * 0.05,
                  }}
                  aria-label={option.label}
                  className="group flex items-center gap-2.5 focus:outline-none"
                >
                  <span className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 text-xs sm:text-sm font-semibold shadow-md border border-zinc-200/80 dark:border-zinc-800 transition-transform duration-200 group-hover:-translate-x-0.5">
                    {option.label}
                  </span>
                  <span
                    className={`size-11 sm:size-12 rounded-full text-white flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 active:scale-95 ${option.bgClass}`}
                  >
                    <Icon className="size-5 sm:size-5.5" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat options" : "Open chat options"}
        aria-expanded={isOpen}
        className="relative size-13 sm:size-14 rounded-full bg-primary hover:bg-[#1577b0] text-white flex items-center justify-center shadow-lg shadow-primary/35 transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-25 pointer-events-none" />
        )}

        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <X className="size-6 sm:size-6.5" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              <MessageCircleMore className="size-6 sm:size-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
