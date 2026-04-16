import Link from "next/link";
import { menuItems } from "@/lib/menuData";
import MenuItemCard from "@/components/MenuItemCard";

export default function HomePage() {
  const popular = menuItems.filter((i) => i.isPopular).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-orange-950 via-orange-900 to-amber-800 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 text-[200px] flex items-center justify-center select-none pointer-events-none">
          🏠
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-amber-400 font-medium tracking-widest text-sm mb-3 uppercase">
            Welcome to
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            Sweet<span className="text-amber-400">Home</span>
          </h1>
          <p className="text-orange-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
            Authentic Indian cuisine crafted with love, served with warmth.
            Every dish tells a story of family recipes passed down through generations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-amber-400 hover:bg-amber-300 text-orange-950 font-bold px-8 py-3 rounded-full text-lg transition-colors"
            >
              View Menu
            </Link>
            <Link
              href="/reservations"
              className="border-2 border-white/60 hover:border-white text-white px-8 py-3 rounded-full text-lg transition-colors"
            >
              Book a Table
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="bg-amber-50 border-y border-amber-200 py-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🍛", label: "100+ Dishes" },
            { icon: "📱", label: "Order at Table" },
            { icon: "🌿", label: "Fresh Ingredients" },
            { icon: "⭐", label: "500+ Reviews" },
          ].map((f) => (
            <div key={f.label}>
              <div className="text-3xl mb-1">{f.icon}</div>
              <div className="text-sm font-semibold text-orange-800">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular dishes */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Most Loved Dishes</h2>
          <p className="text-gray-500 mt-2">Our guests keep coming back for these</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popular.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/menu"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            See Full Menu →
          </Link>
        </div>
      </section>

      {/* QR Table ordering callout */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="text-7xl">📱</div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Order Right From Your Table</h2>
            <p className="text-orange-100 text-lg leading-relaxed">
              Scan the QR code on your table to instantly open the menu on your phone.
              Your table number is recorded automatically — no need to flag down a waiter.
            </p>
          </div>
          <Link
            href="/order"
            className="shrink-0 bg-white text-orange-700 hover:bg-orange-50 font-bold px-6 py-3 rounded-full transition-colors whitespace-nowrap"
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* About snippet */}
      <section className="py-16 px-4 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            SweetHome was founded in 2005 by the Sharma family with a single goal —
            to make guests feel as comfortable as they do at home. Every recipe in our
            kitchen has been refined over decades of cooking for family and friends.
          </p>
          <p className="text-gray-600 leading-relaxed mb-6">
            We source fresh, local produce daily and cook without artificial
            preservatives. What you taste is what our family has always eaten.
          </p>
          <Link
            href="/about"
            className="inline-block text-orange-600 font-semibold hover:underline"
          >
            Read more about us →
          </Link>
        </div>
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl h-72 flex items-center justify-center text-8xl">
          🍽️
        </div>
      </section>
    </div>
  );
}
