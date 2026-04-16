"use client";

import type { MenuItem } from "@/lib/types";
import { categoryEmojis } from "@/lib/menuData";
import { useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.menuItem.id === item.id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.10)" }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl border border-green-100 overflow-hidden"
    >
      {/* Image / icon area */}
      <div className="h-36 bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center relative">
        <span className="text-5xl select-none">{categoryEmojis[item.category]}</span>
        <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-2">
          {item.isPopular && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              Popular
            </span>
          )}
          {item.isSeasonal && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto">
              Seasonal
            </span>
          )}
        </div>
        {/* Pure veg dot */}
        <div className="absolute bottom-2 right-2 w-5 h-5 border-2 border-green-600 rounded-sm flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-sm leading-tight">{item.name}</h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>

        {item.priceVariant && (
          <p className="text-xs text-teal-600 font-medium mt-1">₹{item.priceVariant}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-red-700 text-base">₹{item.price}</span>

          {qty === 0 ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => addItem(item)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors"
            >
              ADD
            </motion.button>
          ) : (
            <div className="flex items-center gap-1.5">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => updateQuantity(item.id, qty - 1)}
                className="w-7 h-7 rounded-full border-2 border-green-600 text-green-700 font-bold hover:bg-green-50 flex items-center justify-center text-sm"
              >
                −
              </motion.button>
              <motion.span
                key={qty}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                className="font-bold w-5 text-center text-sm"
              >
                {qty}
              </motion.span>
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => addItem(item)}
                className="w-7 h-7 rounded-full bg-green-600 text-white font-bold hover:bg-green-700 flex items-center justify-center text-sm"
              >
                +
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
