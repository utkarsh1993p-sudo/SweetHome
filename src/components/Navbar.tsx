"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-orange-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <span className="font-bold text-xl text-orange-700 tracking-tight">
            Sweet<span className="text-amber-500">Home</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-600 ${
                pathname === link.href
                  ? "text-orange-600 border-b-2 border-orange-600 pb-0.5"
                  : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            className="relative ml-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-amber-400 text-orange-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
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
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-orange-100 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-gray-100 ${
                pathname === link.href ? "text-orange-600" : "text-gray-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/order"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 bg-orange-600 text-white text-center py-2 rounded-full text-sm font-medium"
          >
            Cart {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      )}
    </nav>
  );
}
