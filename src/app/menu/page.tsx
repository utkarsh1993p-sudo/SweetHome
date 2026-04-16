"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { menuItems, categoryLabels, categoryEmojis, categoryGroups, allCategories } from "@/lib/menuData";
import type { MenuCategory } from "@/lib/types";
import MenuItemCard from "@/components/MenuItemCard";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, ShoppingCart, ChevronRight, X } from "lucide-react";

function MenuContent() {
  const searchParams = useSearchParams();
  const initCat = (searchParams.get("cat") as MenuCategory) || "all";
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">(initCat);
  const [search, setSearch] = useState("");
  const totalItems = useCartStore((s) => s.totalItems());
  const cartTotal = useCartStore((s) => s.totalAmount());
  const categoryBarRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const cat = searchParams.get("cat") as MenuCategory;
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filtered = menuItems.filter((item) => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const searchMatch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const selectCategory = (cat: MenuCategory | "all") => {
    setActiveCategory(cat);
    const el = categoryBarRef.current?.querySelector(`[data-cat="${cat}"]`);
    el?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="bg-[--color-bg] min-h-screen">
      {/* Page header */}
      <div className="bg-white border-b border-[--color-border] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm font-semibold text-[--color-primary] uppercase tracking-widest mb-2">
            Pure Vegetarian
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-[--color-fg]">
            Our Menu
          </h1>
          <p className="text-[--color-fg-muted] mt-2">
            150+ dishes · 21 categories · +5% GST on all items
          </p>
        </div>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur border-b border-[--color-border] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
          {/* Search */}
          <div className="relative max-w-sm">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[--color-fg-muted]" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search dishes…"
              aria-label="Search menu items"
              className="w-full border border-[--color-border] hover:border-[--color-border-strong] bg-[--color-surface] rounded-full pl-9 pr-9 py-2 text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[--color-primary] focus:border-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[--color-fg-muted] hover:text-[--color-fg] cursor-pointer"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Group pills */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-0.5">
            <button
              onClick={() => selectCategory("all")}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-150 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[--color-primary] text-white"
                  : "bg-[--color-surface] text-[--color-fg-muted] hover:bg-red-50 hover:text-[--color-primary]"
              }`}
            >
              All
            </button>
            {categoryGroups.map((grp) => {
              const isActive = grp.categories.includes(activeCategory as MenuCategory);
              return (
                <button
                  key={grp.label}
                  onClick={() => selectCategory(grp.categories[0])}
                  className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[--color-primary] text-white"
                      : "bg-[--color-surface] text-[--color-fg-muted] hover:bg-red-50 hover:text-[--color-primary]"
                  }`}
                >
                  <span aria-hidden>{grp.emoji}</span>
                  {grp.label}
                </button>
              );
            })}
          </div>

          {/* Category pills */}
          <div ref={categoryBarRef} className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
            {allCategories.map((cat) => (
              <button
                key={cat}
                data-cat={cat}
                onClick={() => selectCategory(cat)}
                className={`shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-[#450A0A] text-white"
                    : "bg-[--color-surface] text-[--color-fg-muted] hover:bg-red-50"
                }`}
              >
                <span aria-hidden>{categoryEmojis[cat]}</span>
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + search}>
            {/* Section label */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                {activeCategory !== "all" && (
                  <h2 className="font-display text-xl text-[--color-fg] flex items-center gap-2">
                    <span aria-hidden>{categoryEmojis[activeCategory as MenuCategory]}</span>
                    {categoryLabels[activeCategory as MenuCategory]}
                  </h2>
                )}
                <p className="text-sm text-[--color-fg-muted] mt-0.5">
                  {filtered.length} {filtered.length === 1 ? "item" : "items"}
                </p>
              </div>
              {search && (
                <p className="text-sm text-[--color-fg-muted]">
                  Results for <strong className="text-[--color-fg]">&ldquo;{search}&rdquo;</strong>
                </p>
              )}
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24" role="status">
                <Search size={40} className="mx-auto text-[--color-fg-muted] mb-4 opacity-30" />
                <p className="font-display text-xl text-[--color-fg]">No items found</p>
                <p className="text-sm text-[--color-fg-muted] mt-2">Try a different category or search term</p>
                <button
                  onClick={() => { setSearch(""); setActiveCategory("all"); }}
                  className="mt-5 text-sm text-[--color-primary] hover:underline cursor-pointer"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                <AnimatePresence>
                  {filtered.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating cart bar */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={reduced ? {} : { y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? {} : { y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
          >
            <Link
              href="/order"
              className="flex items-center gap-4 bg-[--color-fg] hover:bg-[#2D0A00] text-white px-6 py-4 rounded-2xl shadow-2xl transition-colors duration-150 cursor-pointer"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-[--color-primary] text-white text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <span className="font-semibold">View Cart</span>
              <span className="font-display font-bold text-[--color-accent-light]">₹{cartTotal}</span>
              <ChevronRight size={16} className="opacity-60" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32 text-[--color-fg-muted]" role="status">
        <div className="text-center">
          <div className="skeleton w-48 h-6 rounded-full mx-auto mb-3" />
          <div className="skeleton w-32 h-4 rounded-full mx-auto" />
        </div>
      </div>
    }>
      <MenuContent />
    </Suspense>
  );
}
