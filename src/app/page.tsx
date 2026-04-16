"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { menuItems } from "@/lib/menuData";
import MenuItemCard from "@/components/MenuItemCard";
import SweetHomeLogo from "@/components/SweetHomeLogo";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

export default function HomePage() {
  const popular = menuItems.filter((i) => i.isPopular).slice(0, 8);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-green-900 via-teal-800 to-green-700 text-white py-24 px-4 overflow-hidden min-h-[560px] flex items-center">
        {/* Decorative background shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {["#f9a825", "#2e7d32", "#d72c2c", "#00897b", "#f57f17"].map((color, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 rounded-full opacity-20"
              style={{ background: color, top: `${15 + i * 15}%`, left: `${5 + i * 18}%` }}
              animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>

        <div className="max-w-5xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative">
          {/* Left — Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp} className="mb-6">
              <SweetHomeLogo size="lg" variant="white" />
            </motion.div>

            <motion.p variants={fadeUp} className="text-green-200 text-lg md:text-xl leading-relaxed mb-8 max-w-md">
              Pure vegetarian garden dining — authentic recipes, fresh ingredients,
              and the warmth of home in every bite.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="bg-amber-400 hover:bg-amber-300 text-green-950 font-bold px-7 py-3 rounded-full text-base transition-colors shadow-lg"
              >
                View Menu
              </Link>
              <Link
                href="/reservations"
                className="border-2 border-white/60 hover:border-white text-white px-7 py-3 rounded-full text-base transition-colors"
              >
                Book a Table
              </Link>
              <Link
                href="/order"
                className="bg-red-600 hover:bg-red-700 text-white px-7 py-3 rounded-full text-base transition-colors shadow-lg"
              >
                Order Now
              </Link>
            </motion.div>

            {/* Pure veg badge */}
            <motion.div variants={fadeUp} className="mt-6 inline-flex items-center gap-2 bg-green-800/60 border border-green-400/40 px-4 py-2 rounded-full text-sm">
              <div className="w-4 h-4 border-2 border-green-400 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-400" />
              </div>
              <span className="text-green-200 font-medium">100% Pure Vegetarian</span>
            </motion.div>
          </motion.div>

          {/* Right — Feature cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="hidden md:grid grid-cols-2 gap-4"
          >
            {[
              { emoji: "🍛", label: "150+ Dishes", sub: "Across 20 categories" },
              { emoji: "📱", label: "Scan & Order", sub: "QR code on every table" },
              { emoji: "🌿", label: "Pure Veg", sub: "No onion/garlic on request" },
              { emoji: "🏡", label: "Garden Dining", sub: "Open air seating" },
            ].map((f) => (
              <motion.div
                key={f.label}
                variants={fadeUp}
                className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20"
              >
                <div className="text-3xl mb-2">{f.emoji}</div>
                <div className="font-bold text-white">{f.label}</div>
                <div className="text-xs text-green-200 mt-0.5">{f.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORY STRIP ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white border-b border-green-100 py-5 px-4 overflow-x-auto"
      >
        <div className="max-w-6xl mx-auto flex gap-3 min-w-max mx-auto justify-center flex-wrap">
          {[
            { href: "/menu?cat=south-india", emoji: "🫓", label: "South Indian" },
            { href: "/menu?cat=hindustani", emoji: "🍛", label: "Main Course" },
            { href: "/menu?cat=chinese-starters", emoji: "🥢", label: "Chinese" },
            { href: "/menu?cat=tandoori", emoji: "🔥", label: "Tandoori" },
            { href: "/menu?cat=pizzas", emoji: "🍕", label: "Pizzas" },
            { href: "/menu?cat=sizzlers", emoji: "♨️", label: "Sizzlers" },
            { href: "/menu?cat=desserts", emoji: "🍨", label: "Desserts" },
            { href: "/menu?cat=mastanis", emoji: "🍦", label: "Mastanis" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex flex-col items-center gap-1 bg-green-50 hover:bg-green-100 border border-green-100 px-4 py-2 rounded-xl transition-colors text-center"
            >
              <span className="text-2xl">{c.emoji}</span>
              <span className="text-xs font-semibold text-green-900">{c.label}</span>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* ── POPULAR DISHES ── */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-extrabold text-gray-900">Most Loved Dishes</h2>
          <p className="text-gray-500 mt-2">Our guests keep coming back for these</p>
        </motion.div>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {popular.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link
            href="/menu"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            View Full Menu →
          </Link>
        </motion.div>
      </section>

      {/* ── QR TABLE ORDERING CALLOUT ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-teal-700 to-green-700 text-white py-14 px-4"
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-7xl"
          >
            📱
          </motion.div>
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold mb-2">Order Right From Your Table</h2>
            <p className="text-green-100 text-lg leading-relaxed">
              Scan the QR code placed on your table. The website opens with your table number
              pre-detected — just browse the menu and place your order. No waiting, no confusion.
            </p>
          </div>
          <Link
            href="/order"
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-green-950 font-bold px-6 py-3 rounded-full transition-colors whitespace-nowrap shadow-lg"
          >
            Order Now
          </Link>
        </div>
      </motion.section>

      {/* ── BUSINESS LUNCH BANNER ── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-10 px-4 bg-amber-50 border-y border-amber-200"
      >
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
              11 AM – 4 PM
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Business Lunch — ₹350</h2>
            <p className="text-gray-600 mt-1 text-sm">
              Soup · 2 Veg Gravy · Curd/Raita · Dal · Rice/Pulav · 2 Roti or Nan · Papad · Ice Cream
            </p>
          </div>
          <Link
            href="/reservations"
            className="shrink-0 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-full transition-colors"
          >
            Book Now
          </Link>
        </div>
      </motion.section>

      {/* ── ABOUT SNIPPET ── */}
      <section className="py-16 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <SweetHomeLogo size="md" variant="color" />
          <p className="text-gray-600 leading-relaxed mb-4 mt-4">
            Sweet Home Pure Veg Garden Restaurant has been serving authentic Indian cuisine
            in a warm, open-air garden setting. Every dish is made fresh to order with no
            artificial preservatives — just honest cooking with quality ingredients.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            From South Indian breakfast to Hindustani main course, from Chinese to Sizzlers,
            from Mastanis to Natural Ice Cream — we have something for everyone.
          </p>
          <div className="flex gap-4 flex-wrap text-sm">
            <a href="tel:8411066897" className="flex items-center gap-2 text-green-700 font-semibold hover:underline">
              📞 8411066897
            </a>
            <Link href="/about" className="text-red-600 font-semibold hover:underline">
              Read more →
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl h-72 flex items-center justify-center text-8xl"
        >
          🌿
        </motion.div>
      </section>

      {/* ── CATERING BANNER ── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-green-900 text-white py-12 px-4 text-center"
      >
        <h2 className="text-2xl font-extrabold mb-2">We Undertake Outdoor Catering Orders</h2>
        <p className="text-green-300 mb-4">Home delivery available · Cake orders welcome · +5% GST on all bills</p>
        <a
          href="tel:8411066897"
          className="inline-block bg-amber-400 hover:bg-amber-300 text-green-950 font-bold px-8 py-3 rounded-full text-lg transition-colors"
        >
          📞 Call 8411066897
        </a>
      </motion.section>
    </div>
  );
}
