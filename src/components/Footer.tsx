import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-950 text-orange-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🏠</span>
            <span className="font-bold text-xl text-white">
              Sweet<span className="text-amber-400">Home</span>
            </span>
          </div>
          <p className="text-sm text-orange-300 leading-relaxed">
            A family restaurant serving authentic Indian cuisine with love and warmth
            since 2005.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-orange-300">
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
          <h3 className="font-semibold text-white mb-3">Visit Us</h3>
          <address className="not-italic text-sm text-orange-300 space-y-1">
            <p>123 Residency Road</p>
            <p>Pune, Maharashtra 411001</p>
            <p className="mt-2">
              <a href="tel:+912012345678" className="hover:text-amber-400">
                +91 20 1234 5678
              </a>
            </p>
            <p>
              <a href="mailto:hello@sweethome.in" className="hover:text-amber-400">
                hello@sweethome.in
              </a>
            </p>
          </address>
          <div className="mt-3 text-sm text-orange-300">
            <p>Mon–Sun: 12:00 PM – 11:00 PM</p>
          </div>
        </div>
      </div>

      <div className="border-t border-orange-800 text-center py-4 text-xs text-orange-400">
        &copy; {new Date().getFullYear()} SweetHome Restaurant. All rights reserved.
      </div>
    </footer>
  );
}
