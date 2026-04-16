import Link from "next/link";
import SweetHomeLogo from "./SweetHomeLogo";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="mb-4">
            <SweetHomeLogo size="sm" variant="white" />
          </div>
          <p className="text-sm text-green-400 leading-relaxed">
            Pure vegetarian garden restaurant serving authentic Indian cuisine.
            100% veg · Fresh daily · No preservatives.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-green-400">
            {[
              { href: "/menu", label: "Our Menu" },
              { href: "/order", label: "Order Online" },
              { href: "/reservations", label: "Reservations" },
              { href: "/about", label: "About Us" },
              { href: "/admin/qr-codes", label: "Table QR Codes" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-amber-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white mb-3">Contact Us</h3>
          <address className="not-italic text-sm text-green-400 space-y-2">
            <p className="flex items-start gap-2">
              <span>📞</span>
              <a href="tel:8411066897" className="hover:text-amber-400">8411066897</a>
            </p>
            <p className="flex items-start gap-2">
              <span>🏡</span>
              <span>Sweet Home Pure Veg Garden Restaurant</span>
            </p>
          </address>
          <div className="mt-4 text-sm text-green-400 space-y-1">
            <p className="font-semibold text-white">Hours</p>
            <p>Mon–Sun: 11:00 AM – 11:00 PM</p>
            <p className="text-xs mt-2 text-green-500">*5% GST applicable on all bills*</p>
            <p className="text-xs text-green-500">Outside eatables not allowed</p>
          </div>
        </div>
      </div>

      <div className="border-t border-green-800 text-center py-4 text-xs text-green-600">
        &copy; {new Date().getFullYear()} Sweet Home Pure Veg Garden Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
