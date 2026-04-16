"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { menuItems, categoryLabels, categoryEmojis, categoryGroups, allCategories } from "@/lib/menuData";
import type { MenuCategory } from "@/lib/types";
import MenuItemCard from "@/components/MenuItemCard";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";

function MenuContent() {
  const searchParams = useSearchParams();
  const initCat = (searchParams.get("cat") as MenuCategory) || "all";
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">(initCat);
  const [search, setSearch] = useState("");
  const totalItems = useCartStore((s) => s.totalItems());
  const cartTotal = useCartStore((s) => s.totalAmount());
  const categoryBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cat = searchParams.get("cat") as MenuCategory;
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = menuItems.filter((item) => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const searchMatch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const scrollCategoryIntoView = (cat: MenuCategory | "all") => {
    setActiveCategory(cat);
    const el = categoryBarRef.current?.querySelector(`[data-cat="${cat}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-extrabold text-gray-900">Our Menu</h1>
        <p className="text-green-700 font-semibold mt-1">Pure Veg · 150+ Dishes · +5% GST applicable</p>
      </motion.div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes..."
            className="w-full border border-green-200 rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Group nav */}
      <div className="flex flex-wrap justify-center gap-2 mb-3">
        <button
          onClick={() => scrollCategoryIntoView("all")}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            activeCategory === "all"
              ? "bg-green-700 text-white"
              : "bg-green-50 text-green-800 hover:bg-green-100"
          }`}
        >
          All
        </button>
        {categoryGroups.map((grp) => (
          <button
            key={grp.label}
            onClick={() => scrollCategoryIntoView(grp.categories[0])}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1 ${
              grp.categories.includes(activeCategory as MenuCategory)
                ? "bg-green-700 text-white"
                : "bg-green-50 text-green-800 hover:bg-green-100"
            }`}
          >
            <span>{grp.emoji}</span> {grp.label}
          </button>
        ))}
      </div>

      {/* Scrollable category pills */}
      <div ref={categoryBarRef} className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
        {allCategories.map((cat) => (
          <button
            key={cat}
            data-cat={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? "bg-teal-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{categoryEmojis[cat]}</span>
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      {/* Active category heading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="mb-6"
        >
          {activeCategory !== "all" && (
            <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
              <span className="text-2xl">{categoryEmojis[activeCategory as MenuCategory]}</span>
              {categoryLabels[activeCategory as MenuCategory]}
            </h2>
          )}
          <p className="text-sm text-gray-400 mt-1">{filtered.length} items</p>
        </motion.div>
      </AnimatePresence>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <div className="text-5xl mb-3">🔍</div>
          <p>No items found. Try a different search or category.</p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <AnimatePresence>
            {filtered.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Floating cart bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <Link
              href="/order"
              className="flex items-center gap-4 bg-green-700 hover:bg-green-800 text-white px-6 py-4 rounded-2xl shadow-2xl transition-colors"
            >
              <span className="bg-amber-400 text-green-900 font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm">
                {totalItems}
              </span>
              <span className="font-bold">View Cart</span>
              <span className="font-extrabold text-amber-300">₹{cartTotal}</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-gray-400">Loading menu...</div>}>
      <MenuContent />
    </Suspense>
  );
}
