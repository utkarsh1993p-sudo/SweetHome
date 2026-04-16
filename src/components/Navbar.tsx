"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import SweetHomeLogo from "./SweetHomeLogo";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order" },
  { href: "/reservations", label: "Reservations" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());

  return (
    <nav className="sticky top-0 z-50 bg-white/97 backdrop-blur border-b border-green-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <SweetHomeLogo size="sm" variant="color" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors hover:text-red-600 ${
                pathname === link.href
                  ? "text-red-600 border-b-2 border-red-600 pb-0.5"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            className="relative ml-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            Cart
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-green-100 px-4 pb-4 overflow-hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-sm font-semibold border-b border-gray-100 ${
                  pathname === link.href ? "text-red-600" : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/order"
              onClick={() => setMobileOpen(false)}
              className="block mt-3 bg-red-600 text-white text-center py-2 rounded-full text-sm font-semibold"
            >
              Cart {totalItems > 0 && `(${totalItems})`}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
