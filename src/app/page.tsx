"use client";

import Link from "next/link";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { menuItems } from "@/lib/menuData";
import MenuItemCard from "@/components/MenuItemCard";
import SweetHomeLogo from "@/components/SweetHomeLogo";
import {
  UtensilsCrossed, Clock, Leaf, Phone, ChevronRight,
  QrCode, CalendarCheck, Star, Truck,
} from "lucide-react";

/* ── Easing ───────────────────────────────────────────────────────────── */
const EASE = [0.25, 0.1, 0.25, 1] as const;
const EASE_CINEMA = [0.76, 0, 0.24, 1] as const;

/* ── Word-split text reveal ───────────────────────────────────────────── */
function SplitText({
  text,
  delay = 0,
  className,
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className={className} style={{ perspective: "800px" }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: "0.3em", transformOrigin: "50% 100%" }}
          initial={reduced ? {} : { opacity: 0, rotateX: 90, y: 28 }}
          whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + i * 0.07,
            duration: 0.6,
            ease: EASE_CINEMA,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Shared stagger helper ────────────────────────────────────────────── */
const stagger = (delay = 0.1) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

/* ── Category shortcuts ───────────────────────────────────────────────── */
const QUICK_CATS = [
  { href: "/menu?cat=south-india",      label: "South Indian",  icon: "🫓" },
  { href: "/menu?cat=hindustani",       label: "Main Course",   icon: "🍛" },
  { href: "/menu?cat=chinese-starters", label: "Chinese",       icon: "🥢" },
  { href: "/menu?cat=tandoori",         label: "Tandoori",      icon: "🔥" },
  { href: "/menu?cat=pizzas",           label: "Pizzas",        icon: "🍕" },
  { href: "/menu?cat=sizzlers",         label: "Sizzlers",      icon: "♨️" },
  { href: "/menu?cat=desserts",         label: "Desserts",      icon: "🍨" },
  { href: "/menu?cat=mastanis",         label: "Mastanis",      icon: "🧁" },
];

export default function HomePage() {
  const reduced = useReducedMotion();
  const popular = menuItems.filter((i) => i.isPopular).slice(0, 8);

  return (
    <div>
      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section
        aria-label="Hero"
        className="relative overflow-hidden bg-[#1A0000] text-white"
        style={{ minHeight: "min(600px, 90vh)" }}
      >
        {/* Background gradients */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 60% at 60% 40%, #5C0A0A 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, #2D1500 0%, transparent 60%)",
          }}
        />

        {/* Decorative rings */}
        {!reduced && (
          <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
            {[420, 600, 780].map((size, i) => (
              <motion.div
                key={size}
                className="absolute rounded-full border border-white/5"
                style={{
                  width: size,
                  height: size,
                  top: "50%",
                  left: "55%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{
                  duration: 6 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left — explicit timed sequence */}
          <div>
            {/* Logo */}
            <motion.div
              initial={reduced ? {} : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: EASE }}
              className="mb-6"
            >
              <SweetHomeLogo size="lg" variant="white" />
            </motion.div>

            {/* Tagline — word-by-word reveal */}
            <p className="text-lg md:text-xl text-red-200 leading-relaxed max-w-md mb-8">
              <SplitText
                text="Pure vegetarian garden dining — authentic recipes, fresh ingredients, and the warmth of home in every bite."
                delay={0.3}
              />
            </p>

            {/* CTA buttons */}
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.55, ease: EASE }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[--color-primary]"
              >
                <UtensilsCrossed size={18} />
                View Menu
              </Link>
              <Link
                href="/reservations"
                className="inline-flex items-center gap-2 border-2 border-white/40 hover:border-white/80 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer"
              >
                <CalendarCheck size={18} />
                Book a Table
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.5, ease: EASE }}
              className="flex flex-wrap gap-4 text-sm text-red-300"
            >
              <span className="flex items-center gap-1.5">
                <Leaf size={14} className="text-green-400" />
                100% Pure Veg
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                Garden Dining
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={14} />
                Home Delivery
              </span>
            </motion.div>
          </div>

          {/* Right — staggered stat cards */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            animate="show"
            className="hidden md:grid grid-cols-2 gap-4"
          >
            {[
              { icon: <UtensilsCrossed size={24} />, value: "150+", label: "Pure Veg Dishes" },
              { icon: <QrCode size={24} />,          value: "Scan",  label: "Order at Table" },
              { icon: <Clock size={24} />,           value: "₹350",  label: "Business Lunch" },
              { icon: <Leaf size={24} />,            value: "100%",  label: "Vegetarian" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={cardVariant}
                whileHover={reduced ? {} : { y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white/8 backdrop-blur border border-white/10 rounded-2xl p-5 text-center"
              >
                <div className="text-red-300 flex justify-center mb-2">{s.icon}</div>
                <div className="font-display text-3xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-red-300 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CATEGORY SHORTCUTS
      ═══════════════════════════════════════════ */}
      <section aria-label="Menu categories" className="bg-white border-b border-[--color-border] py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={stagger(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
          >
            {QUICK_CATS.map((c) => (
              <motion.div key={c.href} variants={cardVariant}>
                <Link
                  href={c.href}
                  className="flex-none flex flex-col items-center gap-1.5 min-w-[72px] bg-[--color-surface] hover:bg-red-50 border border-[--color-border] hover:border-[--color-border-strong] rounded-2xl px-3 py-3 transition-colors duration-150 cursor-pointer group"
                >
                  <span className="text-2xl" role="img" aria-hidden>{c.icon}</span>
                  <span className="text-xs font-semibold text-[--color-fg-muted] group-hover:text-[--color-primary] text-center leading-tight transition-colors duration-150">
                    {c.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          POPULAR DISHES
      ═══════════════════════════════════════════ */}
      <section aria-label="Popular dishes" className="py-20 px-4 bg-[--color-bg]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <p className="text-sm font-semibold text-[--color-primary] uppercase tracking-widest mb-2">
                Guest Favourites
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-[--color-fg]">
                Most Loved Dishes
              </h2>
            </div>
            <Link
              href="/menu"
              className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-[--color-primary] hover:text-[--color-primary-hover] transition-colors duration-150 cursor-pointer"
            >
              View all <ChevronRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5"
          >
            <AnimatePresence>
              {popular.map((item) => (
                <motion.div key={item.id} variants={cardVariant}>
                  <MenuItemCard item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="text-center mt-10 md:hidden">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white px-8 py-3 rounded-full font-semibold transition-colors duration-150 cursor-pointer"
            >
              View Full Menu <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QR TABLE ORDERING
      ═══════════════════════════════════════════ */}
      <section
        aria-label="QR table ordering"
        className="py-20 px-4"
        style={{ background: "linear-gradient(135deg, #7C0A02 0%, #B91C1C 50%, #DC2626 100%)" }}
      >
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-sm font-semibold text-red-200 uppercase tracking-widest mb-3">
              Dine Smarter
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-5 leading-tight">
              Scan. Order.<br />Enjoy.
            </h2>
            <p className="text-red-100 text-lg leading-relaxed mb-8">
              Every table has a unique QR code. Scan it — the menu opens with your table
              number pre-detected. Browse, add to cart, and place your order without
              calling a waiter.
            </p>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 bg-white text-[--color-primary] hover:bg-red-50 font-bold px-7 py-3.5 rounded-full transition-colors duration-150 cursor-pointer text-base shadow-lg"
            >
              <QrCode size={20} />
              Order Now
            </Link>
          </motion.div>

          <motion.div
            initial={reduced ? {} : { opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex justify-center"
          >
            <div className="bg-white/10 border border-white/20 rounded-3xl p-8 text-center max-w-xs w-full">
              <QrCode size={80} className="text-white mx-auto mb-4" strokeWidth={1} />
              <p className="text-white font-display text-lg mb-1">Table 7</p>
              <p className="text-red-200 text-sm">Scan to order · Auto-detected</p>
              <div className="mt-5 flex justify-center gap-2 flex-wrap">
                {["Paneer Tikka", "Masala Dosa", "Veg Biryani"].map((d) => (
                  <span key={d} className="bg-white/20 text-white text-xs px-2.5 py-1 rounded-full">{d}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          BUSINESS LUNCH
      ═══════════════════════════════════════════ */}
      <motion.section
        aria-label="Business lunch offer"
        initial={reduced ? {} : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65, ease: EASE }}
        className="py-14 px-4 bg-[--color-accent] text-white"
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
              <Clock size={32} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-yellow-100 mb-1">
                11:00 AM – 4:00 PM daily
              </p>
              <h2 className="font-display text-3xl">Business Lunch — ₹350</h2>
              <p className="text-yellow-100 text-sm mt-1">
                Soup · 2 Veg Gravy · Curd/Raita · Dal · Rice/Pulav · 2 Roti or Nan · Papad · Ice Cream
              </p>
            </div>
          </div>
          <Link
            href="/reservations"
            className="shrink-0 bg-white text-[--color-accent] hover:bg-yellow-50 font-bold px-7 py-3 rounded-full transition-colors duration-150 cursor-pointer shadow-lg"
          >
            Reserve
          </Link>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════
          ABOUT SNIPPET
      ═══════════════════════════════════════════ */}
      <section aria-label="About us" className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-sm font-semibold text-[--color-primary] uppercase tracking-widest mb-3">
              Our Story
            </p>
            <h2 className="font-display text-4xl text-[--color-fg] mb-5 leading-tight">
              Pure Veg.<br />Garden Fresh.
            </h2>
            <p className="text-[--color-fg-muted] leading-relaxed mb-4">
              Sweet Home Pure Veg Garden Restaurant has been serving authentic Indian
              cuisine in a warm, open-air garden setting. Every dish is made fresh to
              order — no artificial preservatives, just honest cooking.
            </p>
            <p className="text-[--color-fg-muted] leading-relaxed mb-8">
              From South Indian breakfast to Hindustani main course, from Indo-Chinese
              to Sizzlers, Mastanis to Natural Ice Cream — all pure vegetarian, all made
              with love.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:8411066897"
                className="inline-flex items-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white font-semibold px-5 py-2.5 rounded-full transition-colors duration-150 cursor-pointer text-sm"
              >
                <Phone size={16} />
                8411066897
              </a>
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[--color-primary] hover:text-[--color-primary-hover] transition-colors duration-150 cursor-pointer"
              >
                Read more <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>

          {/* Staggered feature cards */}
          <motion.div
            variants={stagger(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: <Leaf size={28} className="text-green-600" />,                   title: "100% Veg",      desc: "Certified pure veg — no cross-contamination" },
              { icon: <UtensilsCrossed size={28} className="text-[--color-primary]" />, title: "Fresh Daily",   desc: "Produce sourced every morning" },
              { icon: <Star size={28} className="text-amber-600 fill-amber-200" />,     title: "Garden Setting", desc: "Open-air dining experience" },
              { icon: <Truck size={28} className="text-[--color-accent]" />,            title: "Home Delivery",  desc: "Call 8411066897 to order" },
            ].map((f) => (
              <motion.div
                key={f.title}
                variants={cardVariant}
                whileHover={reduced ? {} : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[--color-surface] border border-[--color-border] rounded-2xl p-5"
              >
                <div className="mb-3">{f.icon}</div>
                <h3 className="font-semibold text-[--color-fg] text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-[--color-fg-muted] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CATERING CTA
      ═══════════════════════════════════════════ */}
      <section
        aria-label="Catering and delivery"
        className="py-16 px-4 bg-[#1A0000] text-white text-center"
      >
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-sm font-semibold text-red-400 uppercase tracking-widest mb-3">
            Beyond the Restaurant
          </p>
          <h2 className="font-display text-4xl text-white mb-4">
            We Cater. We Deliver.
          </h2>
          <p className="text-red-300 mb-8 leading-relaxed">
            Outdoor catering orders · Home delivery · Cake orders · +5% GST on all bills
          </p>
          <motion.a
            href="tel:8411066897"
            whileHover={reduced ? {} : { scale: 1.04 }}
            whileTap={reduced ? {} : { scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-3 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white font-bold px-8 py-4 rounded-full text-lg transition-colors duration-200 cursor-pointer shadow-xl"
          >
            <Phone size={22} />
            Call 8411066897
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
}
