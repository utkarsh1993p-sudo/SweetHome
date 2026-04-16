"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
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
    <nav
      className="sticky top-0 z-50 bg-white border-b border-[--color-border] shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" aria-label="Sweet Home Home" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary] rounded-lg">
          <SweetHomeLogo size="sm" variant="color" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                relative px-3 py-2 text-sm font-semibold rounded-lg transition-colors duration-150 cursor-pointer
                ${pathname === link.href
                  ? "text-[--color-primary]"
                  : "text-[--color-fg-muted] hover:text-[--color-fg] hover:bg-[--color-surface]"
                }
              `}
            >
              {link.label}
              {pathname === link.href && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-0.5 bg-[--color-primary] rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-2">
          <Link
            href="/order"
            aria-label={`Cart — ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            className="relative flex items-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--color-primary]"
          >
            <ShoppingCart size={16} strokeWidth={2.5} />
            <span className="hidden sm:inline">Cart</span>
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="absolute -top-1.5 -right-1.5 bg-[--color-accent] text-white text-[10px] font-extrabold rounded-full w-5 h-5 flex items-center justify-center leading-none"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            className="md:hidden p-2 rounded-lg text-[--color-fg-muted] hover:bg-[--color-surface] hover:text-[--color-fg] transition-colors duration-150 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-white border-t border-[--color-border] overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors duration-150 cursor-pointer
                    ${pathname === link.href
                      ? "text-[--color-primary] bg-red-50"
                      : "text-[--color-fg-muted] hover:text-[--color-fg] hover:bg-[--color-surface]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
