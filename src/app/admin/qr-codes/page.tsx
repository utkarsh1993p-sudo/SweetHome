"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const TOTAL_TABLES = 20;
const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "https://sweethome.in";

export default function QRCodesPage() {
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const tables = Array.from({ length: TOTAL_TABLES }, (_, i) => i + 1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Table QR Codes</h1>
        <p className="text-gray-500 mt-1">
          Print and place each QR code on the corresponding table. Guests scan it to
          open the ordering page with their table number pre-filled.
        </p>
      </div>

      {/* Selected table — full preview */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl">
            <p className="text-sm text-gray-400 mb-1 uppercase tracking-widest">Table</p>
            <p className="text-5xl font-extrabold text-orange-700 mb-4">{selectedTable}</p>
            <div className="inline-block p-4 bg-white border-4 border-orange-600 rounded-2xl">
              <QRCodeSVG
                value={`${BASE_URL}/order?table=${selectedTable}`}
                size={220}
                level="H"
                includeMargin={false}
              />
            </div>
            <p className="text-xs text-gray-400 mt-3 break-all">
              {BASE_URL}/order?table={selectedTable}
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 rounded-xl transition-colors"
              >
                Print
              </button>
              <button
                onClick={() => setSelectedTable(null)}
                className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of all tables */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-5">
        {tables.map((n) => (
          <button
            key={n}
            onClick={() => setSelectedTable(n)}
            className="bg-white border border-orange-100 rounded-2xl p-4 flex flex-col items-center gap-3 hover:shadow-md hover:border-orange-300 transition-all"
          >
            <QRCodeSVG
              value={`${BASE_URL}/order?table=${n}`}
              size={100}
              level="M"
              includeMargin={false}
            />
            <span className="font-bold text-orange-700">Table {n}</span>
          </button>
        ))}
      </div>

      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
        <p className="font-semibold mb-2">How it works</p>
        <ol className="list-decimal list-inside space-y-1 text-amber-700">
          <li>Click any table to see its full-size QR code</li>
          <li>Print it and laminate it for the table</li>
          <li>When a guest scans it, they land on the order page with the table number automatically detected</li>
          <li>Their order is submitted with the correct table number — no confusion, no missed orders</li>
        </ol>
      </div>
    </div>
  );
}
