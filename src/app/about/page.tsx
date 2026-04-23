"use client";

import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import SweetHomeLogo from "@/components/SweetHomeLogo";
import { Phone, Clock, MapPin, Leaf, UtensilsCrossed, Star, Heart } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const EASE_CINEMA = [0.76, 0, 0.24, 1] as const;

const stagger = (delay = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay } },
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: EASE } },
};

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <span style={{ perspective: "800px" }}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ marginRight: "0.3em", transformOrigin: "50% 100%" }}
          initial={reduced ? {} : { opacity: 0, rotateX: 90, y: 28 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ delay: delay + i * 0.07, duration: 0.6, ease: EASE_CINEMA }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function AboutPage() {
  const reduced = useReducedMotion();

  return (
    <div className="bg-[--color-bg]">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="py-20 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #1A0000 0%, #7C0A02 60%, #B91C1C 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-sm font-semibold text-red-300 uppercase tracking-widest mb-4"
          >
            Our Story
          </motion.p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">
            <SplitText text="About Sweet Home" delay={0.15} />
          </h1>
          <motion.p
            initial={reduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: EASE }}
            className="text-red-200 text-lg leading-relaxed"
          >
            A pure vegetarian garden restaurant where every meal feels like coming home
          </motion.p>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={fadeLeft} className="mb-6">
              <SweetHomeLogo size="md" variant="color" />
            </motion.div>
            <motion.p variants={fadeLeft} className="text-[--color-fg-muted] leading-relaxed mb-4">
              Sweet Home Pure Veg Garden Restaurant was built on a simple belief —
              great vegetarian food should be joyful, honest, and feel like home.
              We opened our garden doors with a commitment to pure vegetarian cuisine
              crafted from fresh, locally sourced ingredients.
            </motion.p>
            <motion.p variants={fadeLeft} className="text-[--color-fg-muted] leading-relaxed mb-4">
              Every dish on our menu is made fresh to order. No frozen shortcuts,
              no artificial preservatives. What you taste is the result of carefully
              developed recipes and fresh produce sourced daily.
            </motion.p>
            <motion.p variants={fadeLeft} className="text-[--color-fg-muted] leading-relaxed">
              From South Indian breakfast to Hindustani main course, from Indo-Chinese
              to Continental Sizzlers, from Mastanis to Natural Ice Cream — 150+ pure
              vegetarian dishes, all served in our open garden setting.
            </motion.p>
          </motion.div>

          {/* Feature cards — staggered */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: <Leaf size={26} className="text-green-600" />,                    title: "100% Pure Veg",  desc: "Certified vegetarian — every single dish" },
              { icon: <Heart size={26} className="text-[--color-primary]" />,            title: "Made with Love", desc: "Freshly prepared to order, no batch cooking" },
              { icon: <UtensilsCrossed size={26} className="text-[--color-accent]" />,   title: "150+ Dishes",   desc: "21 categories across Indian and Chinese cuisine" },
              { icon: <Star size={26} className="text-amber-500 fill-amber-100" />,      title: "Garden Setting", desc: "Open-air dining experience unlike any other" },
            ].map((v) => (
              <motion.div
                key={v.title}
                variants={fadeRight}
                whileHover={reduced ? {} : { y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[--color-surface] border border-[--color-border] rounded-2xl p-5"
              >
                <div className="mb-3">{v.icon}</div>
                <h3 className="font-semibold text-[--color-fg] text-sm mb-1">{v.title}</h3>
                <p className="text-xs text-[--color-fg-muted] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Hours & Location ──────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[--color-bg]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Hours */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-[--color-primary]" />
              </div>
              <h2 className="font-display text-2xl text-[--color-fg]">Opening Hours</h2>
            </div>
            <motion.div
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="bg-white border border-[--color-border] rounded-2xl overflow-hidden"
            >
              {[
                { day: "Monday – Friday",  hours: "11:00 AM – 11:00 PM" },
                { day: "Saturday",         hours: "11:00 AM – 11:00 PM" },
                { day: "Sunday",           hours: "11:00 AM – 11:00 PM" },
              ].map((r, i) => (
                <motion.div
                  key={r.day}
                  variants={fadeUp}
                  className={`flex justify-between items-center px-5 py-4 text-sm ${
                    i < 2 ? "border-b border-[--color-border]" : ""
                  }`}
                >
                  <span className="font-medium text-[--color-fg]">{r.day}</span>
                  <span className="font-bold text-[--color-primary]">{r.hours}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={reduced ? {} : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.55, ease: EASE }}
              className="mt-4 bg-[--color-accent] text-white rounded-2xl px-5 py-4"
            >
              <p className="font-bold text-sm mb-0.5">Business Lunch — ₹350</p>
              <p className="text-xs text-yellow-100">11:00 AM – 4:00 PM · Soup, 2 gravies, dal, rice, roti, papad, ice cream</p>
            </motion.div>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={reduced ? {} : { opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <MapPin size={20} className="text-[--color-primary]" />
              </div>
              <h2 className="font-display text-2xl text-[--color-fg]">Contact Us</h2>
            </div>

            <div className="bg-white border border-[--color-border] rounded-2xl p-5 space-y-4 mb-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[--color-primary] shrink-0" />
                <a
                  href="tel:8411066897"
                  className="text-sm font-semibold text-[--color-fg] hover:text-[--color-primary] transition-colors duration-150 cursor-pointer"
                >
                  8411066897
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[--color-primary] shrink-0 mt-0.5" />
                <p className="text-sm text-[--color-fg-muted] leading-relaxed">
                  Sweet Home Pure Veg Garden Restaurant
                </p>
              </div>
            </div>

            <div className="bg-[--color-surface] border border-[--color-border] rounded-2xl p-5 text-xs text-[--color-fg-muted] space-y-1">
              <p className="font-semibold text-[--color-fg] text-sm mb-2">Important Notes</p>
              <p>* 5% GST applicable on total bill</p>
              <p>* Extra Cheese &amp; Butter: ₹39</p>
              <p>* Milkshake with Ice Cream: ₹49 extra</p>
              <p>* Outside eatables not allowed</p>
              <p>* Dishes served within 15–20 minutes</p>
              <p>* Rights of admission reserved</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Contact form ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#1A0000] text-white">
        <motion.div
          initial={reduced ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: EASE }}
          className="max-w-xl mx-auto text-center"
        >
          <p className="text-sm font-semibold text-red-400 uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl mb-3">Send Us a Message</h2>
          <p className="text-red-300 mb-10">
            Catering inquiry, reservation help, or just want to say hello
          </p>
          <ContactForm />
        </motion.div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <motion.section
        initial={reduced ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className="py-14 px-4 bg-white text-center"
      >
        <p className="font-display text-2xl text-[--color-fg] mb-5">
          Ready to dine with us?
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.div whileHover={reduced ? {} : { scale: 1.04 }} whileTap={reduced ? {} : { scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white font-semibold px-7 py-3 rounded-full transition-colors duration-150 cursor-pointer"
            >
              Book a Table
            </Link>
          </motion.div>
          <motion.div whileHover={reduced ? {} : { scale: 1.04 }} whileTap={reduced ? {} : { scale: 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 border-2 border-[--color-border-strong] hover:border-[--color-primary] text-[--color-fg] hover:text-[--color-primary] font-semibold px-7 py-3 rounded-full transition-colors duration-150 cursor-pointer"
            >
              View Menu
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
