"use client";

import { useState } from "react";
import { menuItems, categoryLabels } from "@/lib/menuData";
import type { MenuCategory } from "@/lib/types";
import MenuItemCard from "@/components/MenuItemCard";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const categories: MenuCategory[] = ["starters", "mains", "breads", "desserts", "drinks"];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | "all">("all");
  const [vegOnly, setVegOnly] = useState(false);
  const totalItems = useCartStore((s) => s.totalItems());
  const totalAmount = useCartStore((s) => s.totalAmount());

  const filtered = menuItems.filter((item) => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const vegMatch = !vegOnly || item.isVeg;
    return categoryMatch && vegMatch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Our Menu</h1>
        <p className="text-gray-500 mt-2">Fresh, authentic, made with love</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-4">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-orange-600 text-white"
              : "bg-orange-50 text-orange-700 hover:bg-orange-100"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-orange-600 text-white"
                : "bg-orange-50 text-orange-700 hover:bg-orange-100"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        ))}
      </div>

      <div className="flex justify-center mb-8">
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            onClick={() => setVegOnly(!vegOnly)}
            className={`w-12 h-6 rounded-full relative transition-colors ${
              vegOnly ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                vegOnly ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </div>
          <span className="text-sm font-medium text-gray-700">Veg only</span>
        </label>
      </div>

      {/* Items grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <div className="text-5xl mb-3">🥗</div>
          <p>No items found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Floating cart bar */}
      {totalItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <Link
            href="/order"
            className="flex items-center gap-4 bg-orange-600 hover:bg-orange-700 text-white px-6 py-4 rounded-2xl shadow-xl transition-colors"
          >
            <span className="bg-white text-orange-600 font-bold rounded-full w-7 h-7 flex items-center justify-center text-sm">
              {totalItems}
            </span>
            <span className="font-semibold">View Cart</span>
            <span className="font-bold">₹{totalAmount}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
