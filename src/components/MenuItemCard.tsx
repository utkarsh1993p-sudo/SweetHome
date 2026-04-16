"use client";

import type { MenuItem } from "@/lib/types";
import { useCartStore } from "@/store/cartStore";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { items, addItem, removeItem, updateQuantity } = useCartStore();
  const cartItem = items.find((i) => i.menuItem.id === item.id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image placeholder */}
      <div className="h-44 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center relative">
        <span className="text-5xl">
          {item.category === "starters" && "🍢"}
          {item.category === "mains" && "🍛"}
          {item.category === "breads" && "🫓"}
          {item.category === "desserts" && "🍮"}
          {item.category === "drinks" && "🥤"}
        </span>
        {item.isPopular && (
          <span className="absolute top-3 left-3 bg-orange-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            Popular
          </span>
        )}
        <span
          className={`absolute top-3 right-3 w-5 h-5 rounded-sm border-2 flex items-center justify-center text-xs font-bold ${
            item.isVeg
              ? "border-green-600 text-green-600"
              : "border-red-600 text-red-600"
          }`}
        >
          {item.isVeg ? "V" : "N"}
        </span>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-orange-700 text-lg">
            ₹{item.price}
          </span>

          {qty === 0 ? (
            <button
              onClick={() => addItem(item)}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, qty - 1)}
                className="w-8 h-8 rounded-full border-2 border-orange-600 text-orange-600 font-bold hover:bg-orange-50 flex items-center justify-center"
              >
                −
              </button>
              <span className="font-semibold w-5 text-center">{qty}</span>
              <button
                onClick={() => addItem(item)}
                className="w-8 h-8 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 flex items-center justify-center"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
