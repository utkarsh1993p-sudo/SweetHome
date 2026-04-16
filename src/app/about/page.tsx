import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import SweetHomeLogo from "@/components/SweetHomeLogo";
import { Phone, Clock, MapPin, Leaf, UtensilsCrossed, Star, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[--color-bg]">
      {/* Page header */}
      <section
        className="py-20 px-4 text-white text-center"
        style={{ background: "linear-gradient(135deg, #1A0000 0%, #7C0A02 60%, #B91C1C 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-red-300 uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1 className="font-display text-5xl md:text-6xl text-white mb-4">
            About Sweet Home
          </h1>
          <p className="text-red-200 text-lg leading-relaxed">
            A pure vegetarian garden restaurant where every meal feels like coming home
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="mb-6">
              <SweetHomeLogo size="md" variant="color" />
            </div>
            <p className="text-[--color-fg-muted] leading-relaxed mb-4">
              Sweet Home Pure Veg Garden Restaurant was built on a simple belief —
              great vegetarian food should be joyful, honest, and feel like home.
              We opened our garden doors with a commitment to pure vegetarian cuisine
              crafted from fresh, locally sourced ingredients.
            </p>
            <p className="text-[--color-fg-muted] leading-relaxed mb-4">
              Every dish on our menu is made fresh to order. No frozen shortcuts,
              no artificial preservatives. What you taste is the result of carefully
              developed recipes and fresh produce sourced daily.
            </p>
            <p className="text-[--color-fg-muted] leading-relaxed">
              From South Indian breakfast to Hindustani main course, from Indo-Chinese
              to Continental Sizzlers, from Mastanis to Natural Ice Cream — 150+ pure
              vegetarian dishes, all served in our open garden setting.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Leaf size={26} className="text-green-600" />,                   title: "100% Pure Veg",    desc: "Certified vegetarian — every single dish" },
              { icon: <Heart size={26} className="text-[--color-primary]" />,           title: "Made with Love",   desc: "Freshly prepared to order, no batch cooking" },
              { icon: <UtensilsCrossed size={26} className="text-[--color-accent]" />,  title: "150+ Dishes",      desc: "21 categories across Indian and Chinese cuisine" },
              { icon: <Star size={26} className="text-amber-500 fill-amber-100" />,     title: "Garden Setting",   desc: "Open-air dining experience unlike any other" },
            ].map((v) => (
              <div key={v.title} className="bg-[--color-surface] border border-[--color-border] rounded-2xl p-5">
                <div className="mb-3">{v.icon}</div>
                <h3 className="font-semibold text-[--color-fg] text-sm mb-1">{v.title}</h3>
                <p className="text-xs text-[--color-fg-muted] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="py-20 px-4 bg-[--color-bg]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Hours */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Clock size={20} className="text-[--color-primary]" />
              </div>
              <h2 className="font-display text-2xl text-[--color-fg]">Opening Hours</h2>
            </div>
            <div className="bg-white border border-[--color-border] rounded-2xl overflow-hidden">
              {[
                { day: "Monday – Friday",  hours: "11:00 AM – 11:00 PM" },
                { day: "Saturday",         hours: "11:00 AM – 11:00 PM" },
                { day: "Sunday",           hours: "11:00 AM – 11:00 PM" },
              ].map((r, i) => (
                <div
                  key={r.day}
                  className={`flex justify-between items-center px-5 py-4 text-sm ${
                    i < 2 ? "border-b border-[--color-border]" : ""
                  }`}
                >
                  <span className="font-medium text-[--color-fg]">{r.day}</span>
                  <span className="font-bold text-[--color-primary]">{r.hours}</span>
                </div>
              ))}
            </div>

            {/* Business Lunch callout */}
            <div className="mt-4 bg-[--color-accent] text-white rounded-2xl px-5 py-4">
              <p className="font-bold text-sm mb-0.5">Business Lunch — ₹350</p>
              <p className="text-xs text-yellow-100">11:00 AM – 4:00 PM · Soup, 2 gravies, dal, rice, roti, papad, ice cream</p>
            </div>
          </div>

          {/* Contact */}
          <div>
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
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-20 px-4 bg-[#1A0000] text-white">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm font-semibold text-red-400 uppercase tracking-widest mb-3">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl mb-3">Send Us a Message</h2>
          <p className="text-red-300 mb-10">
            Catering inquiry, reservation help, or just want to say hello
          </p>
          <ContactForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-4 bg-white text-center">
        <p className="font-display text-2xl text-[--color-fg] mb-5">
          Ready to dine with us?
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/reservations"
            className="inline-flex items-center gap-2 bg-[--color-primary] hover:bg-[--color-primary-hover] text-white font-semibold px-7 py-3 rounded-full transition-colors duration-150 cursor-pointer"
          >
            Book a Table
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 border-2 border-[--color-border-strong] hover:border-[--color-primary] text-[--color-fg] hover:text-[--color-primary] font-semibold px-7 py-3 rounded-full transition-colors duration-150 cursor-pointer"
          >
            View Menu
          </Link>
        </div>
      </section>
    </div>
  );
}
