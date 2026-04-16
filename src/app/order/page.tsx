"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { categoryLabels, categoryEmojis } from "@/lib/menuData";

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-gray-400">Loading...</div>}>
      <OrderPageContent />
    </Suspense>
  );
}

function OrderPageContent() {
  const searchParams = useSearchParams();
  const { items, tableNumber, setTableNumber, updateQuantity, removeItem, clearCart, totalAmount } =
    useCartStore();

  const [customerName, setCustomerName] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Read table number from QR scan URL param
  useEffect(() => {
    const tableParam = searchParams.get("table");
    if (tableParam) {
      const parsed = parseInt(tableParam, 10);
      if (!isNaN(parsed) && parsed > 0) {
        setTableNumber(parsed);
      }
    }
  }, [searchParams, setTableNumber]);

  const handlePlaceOrder = async () => {
    if (items.length === 0) return;

    const id = `SH-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6">✅</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-4">
          Your order <span className="font-mono font-bold text-orange-600">{orderId}</span> has been
          received.
        </p>
        {tableNumber && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 mb-6 inline-block">
            <p className="text-amber-800 font-semibold">Table {tableNumber}</p>
            <p className="text-amber-600 text-sm">We will bring your food to your table</p>
          </div>
        )}
        <p className="text-gray-500 text-sm mb-8">
          Estimated time: <strong>25–35 minutes</strong>
        </p>
        <Link
          href="/menu"
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
        >
          Order More
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Your Order</h1>

      {/* Table number badge */}
      {tableNumber ? (
        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Table {tableNumber} — detected from QR scan
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6">
          <p className="text-amber-800 text-sm font-medium mb-2">
            No table detected. Scan the QR code on your table, or enter manually:
          </p>
          <input
            type="number"
            min={1}
            max={50}
            placeholder="Table number"
            className="border border-amber-300 rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-amber-400"
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              if (!isNaN(v) && v > 0) setTableNumber(v);
            }}
          />
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Add some delicious dishes from our menu</p>
          <Link
            href="/menu"
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart items grouped by category */}
          {items.map((cartItem) => (
            <div
              key={cartItem.menuItem.id}
              className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm border border-orange-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl flex items-center justify-center text-2xl shrink-0">
                {categoryEmojis[cartItem.menuItem.category]}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{cartItem.menuItem.name}</p>
                <p className="text-sm text-gray-500">
                  {categoryLabels[cartItem.menuItem.category]}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQuantity(cartItem.menuItem.id, cartItem.quantity - 1)}
                  className="w-7 h-7 rounded-full border-2 border-orange-600 text-orange-600 font-bold hover:bg-orange-50 flex items-center justify-center text-sm"
                >
                  −
                </button>
                <span className="w-5 text-center font-semibold">{cartItem.quantity}</span>
                <button
                  onClick={() => updateQuantity(cartItem.menuItem.id, cartItem.quantity + 1)}
                  className="w-7 h-7 rounded-full bg-orange-600 text-white font-bold hover:bg-orange-700 flex items-center justify-center text-sm"
                >
                  +
                </button>
              </div>

              <div className="text-right shrink-0">
                <p className="font-bold text-orange-700">
                  ₹{cartItem.menuItem.price * cartItem.quantity}
                </p>
                <button
                  onClick={() => removeItem(cartItem.menuItem.id)}
                  className="text-xs text-red-400 hover:text-red-600 mt-0.5"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mt-6">
            <div className="flex justify-between mb-2 text-gray-600 text-sm">
              <span>Subtotal</span>
              <span>₹{totalAmount()}</span>
            </div>
            <div className="flex justify-between mb-4 text-gray-600 text-sm">
              <span>Taxes & charges</span>
              <span>₹{Math.round(totalAmount() * 0.05)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 border-t border-amber-200 pt-3">
              <span>Total</span>
              <span>₹{totalAmount() + Math.round(totalAmount() * 0.05)}</span>
            </div>
          </div>

          {/* Customer details */}
          <div className="bg-white rounded-2xl border border-orange-100 p-5 space-y-4">
            <h2 className="font-semibold text-gray-800">Your Details (optional)</h2>
            <input
              type="text"
              placeholder="Your name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              placeholder="Special instructions (e.g. less spicy, no onion)"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
            />
          </div>

          {/* Place order */}
          <button
            onClick={handlePlaceOrder}
            disabled={items.length === 0}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-300 text-white font-bold py-4 rounded-2xl text-lg transition-colors"
          >
            Place Order · ₹{totalAmount() + Math.round(totalAmount() * 0.05)}
          </button>
        </div>
      )}
    </div>
  );
}
