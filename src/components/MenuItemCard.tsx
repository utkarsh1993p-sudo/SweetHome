"use client";

import type { MenuItem } from "@/lib/types";
import { categoryEmojis } from "@/lib/menuData";
import { useCartStore } from "@/store/cartStore";
import { motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.menuItem.id === item.id);
  const qty = cartItem?.quantity ?? 0;
  const reduced = useReducedMotion();

  return (
    <motion.article
      layout
      initial={reduced ? {} : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? {} : { opacity: 0, scale: 0.96 }}
      whileHover={reduced ? {} : { y: -3, boxShadow: "0 16px 32px rgba(220,38,38,0.10)" }}
      transition={{ duration: 0.22 }}
      className="bg-[--color-bg-card] rounded-2xl border border-[--color-border] overflow-hidden group"
      aria-label={`${item.name}, ₹${item.price}`}
    >
      {/* Visual area */}
      <div className="relative h-32 bg-gradient-to-br from-[#FEF2F2] to-[#FFF7ED] flex items-center justify-center overflow-hidden">
        {/* Category emoji as decorative only, not icon */}
        <span
          aria-hidden
          className="text-5xl select-none transition-transform duration-300 group-hover:scale-110"
        >
          {categoryEmojis[item.category]}
        </span>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {item.isPopular && (
            <span className="bg-[--color-primary] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-tight">
              Popular
            </span>
          )}
          {item.isSeasonal && (
            <span className="bg-[--color-accent] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-tight">
              Seasonal
            </span>
          )}
        </div>

        {/* FSSAI pure veg indicator */}
        <div
          className="absolute top-2 right-2 w-5 h-5 border-2 border-[--color-veg-green] rounded-sm flex items-center justify-center bg-white"
          title="Pure Vegetarian"
          aria-label="Pure vegetarian"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-[--color-veg-green]" />
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-[--color-fg] text-sm leading-tight line-clamp-1">
          {item.name}
        </h3>
        <p className="text-xs text-[--color-fg-muted] mt-1 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {item.priceVariant && (
          <p className="text-xs text-[--color-accent] font-semibold mt-1">
            ₹{item.priceVariant}
          </p>
        )}

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-3">
          <span className="font-display font-bold text-[--color-primary] text-base">
            ₹{item.price}
          </span>

          {qty === 0 ? (
            <motion.button
              whileTap={reduced ? {} : { scale: 0.9 }}
              onClick={() => addItem(item)}
              aria-label={`Add ${item.name} to cart`}
              className="flex items-center gap-1 bg-[--color-veg-green] hover:bg-green-700 text-white px-3 py-1.5 rounded-full text-xs font-bold transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
            >
              <Plus size={12} strokeWidth={3} />
              ADD
            </motion.button>
          ) : (
            <div className="flex items-center gap-1.5" role="group" aria-label={`${item.name} quantity`}>
              <button
                onClick={() => updateQuantity(item.id, qty - 1)}
                aria-label={`Remove one ${item.name}`}
                className="w-7 h-7 rounded-full border-2 border-[--color-veg-green] text-[--color-veg-green] hover:bg-green-50 flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <Minus size={12} strokeWidth={3} />
              </button>

              <motion.span
                key={qty}
                initial={reduced ? {} : { scale: 1.3 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="w-5 text-center font-bold text-sm text-[--color-fg]"
                aria-live="polite"
              >
                {qty}
              </motion.span>

              <button
                onClick={() => addItem(item)}
                aria-label={`Add another ${item.name}`}
                className="w-7 h-7 rounded-full bg-[--color-veg-green] hover:bg-green-700 text-white flex items-center justify-center transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              >
                <Plus size={12} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
