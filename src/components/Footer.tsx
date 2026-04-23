"use client";

import Link from "next/link";
import SweetHomeLogo from "./SweetHomeLogo";
import { Phone, Clock, Leaf, ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const links = [
  { href: "/menu",           label: "Our Menu" },
  { href: "/order",          label: "Order Online" },
  { href: "/reservations",   label: "Reservations" },
  { href: "/about",          label: "About Us" },
  { href: "/admin/qr-codes", label: "Table QR Codes" },
];

const columnVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Footer() {
  const reduced = useReducedMotion();

  return (
    <footer className="bg-[#1A0000] text-red-100" role="contentinfo">
      <motion.div
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10"
      >
        {/* Brand */}
        <motion.div variants={columnVariant}>
          <div className="mb-4">
            <SweetHomeLogo size="sm" variant="white" />
          </div>
          <p className="text-sm text-red-400 leading-relaxed mb-4">
            Pure vegetarian garden restaurant. Authentic Indian cuisine — 100% veg,
            fresh daily, no preservatives.
          </p>
          <div className="flex items-center gap-2 text-sm text-red-300">
            <Leaf size={14} className="text-green-400" />
            <span>Certified Pure Vegetarian</span>
          </div>
        </motion.div>

        {/* Quick links */}
        <motion.nav variants={columnVariant} aria-label="Footer navigation">
          <h3 className="font-display text-white text-sm uppercase tracking-widest mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {links.map((l, i) => (
              <motion.li
                key={l.href}
                initial={reduced ? {} : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.45, ease: EASE }}
              >
                <Link
                  href={l.href}
                  className="text-sm text-red-400 hover:text-white transition-colors duration-150 cursor-pointer inline-flex items-center gap-1 group"
                >
                  {l.label}
                  <ExternalLink size={10} className="opacity-0 group-hover:opacity-60 transition-opacity" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        {/* Contact */}
        <motion.div variants={columnVariant}>
          <h3 className="font-display text-white text-sm uppercase tracking-widest mb-4">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm text-red-400">
            <li>
              <a
                href="tel:8411066897"
                className="flex items-center gap-2 hover:text-white transition-colors duration-150 cursor-pointer"
              >
                <Phone size={14} />
                8411066897
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Clock size={14} className="mt-0.5 shrink-0" />
              <span>Mon – Sun: 11:00 AM – 11:00 PM</span>
            </li>
          </ul>
          <div className="mt-5 bg-red-950/50 border border-red-900 rounded-xl px-4 py-3 text-xs text-red-400 space-y-1">
            <p>* 5% GST applicable on all bills</p>
            <p>* Extra Cheese &amp; Butter: ₹39</p>
            <p>* Milkshake with Ice Cream: ₹49 extra</p>
            <p>* Outside eatables not allowed</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={reduced ? {} : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="border-t border-red-900/50 py-5 px-4 text-center text-xs text-red-600"
      >
        &copy; {new Date().getFullYear()} Sweet Home Pure Veg Garden Restaurant. All rights reserved.
      </motion.div>
    </footer>
  );
}
