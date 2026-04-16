import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-950 to-amber-800 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-4">About SweetHome</h1>
        <p className="text-orange-200 text-lg max-w-2xl mx-auto">
          A family restaurant where every meal feels like coming home
        </p>
      </section>

      {/* Story */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl h-80 flex items-center justify-center text-9xl">
          👨‍👩‍👧‍👦
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            SweetHome was born out of a simple idea: great Indian food should feel like a
            hug. In 2005, Rajesh and Sunita Sharma opened our doors in Pune with twelve
            tables, six recipes, and a dream.
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            Two decades later, we seat over 80 guests, have welcomed thousands of
            families, and still cook every curry, biryani, and dessert using the
            same recipes — slightly tweaked after much debate at the family dinner table.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Every ingredient is sourced fresh, every dish is made to order, and every
            guest leaves a little fuller and a little happier. That is the SweetHome promise.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-amber-50 border-y border-amber-100 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">What We Stand For</h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: "🌿", title: "Fresh Every Day", desc: "Vegetables and proteins sourced from local farmers each morning. No frozen shortcuts." },
              { icon: "❤️", title: "Cooked with Love", desc: "Family recipes refined over 20 years of cooking for people who matter." },
              { icon: "🏡", title: "Feel at Home", desc: "Warm, unhurried dining where you are never made to feel like a number." },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <div className="text-5xl mb-4">{v.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hours & Location */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Opening Hours</h2>
          <table className="w-full text-sm">
            <tbody>
              {[
                { day: "Monday – Friday", hours: "12:00 PM – 11:00 PM" },
                { day: "Saturday", hours: "11:00 AM – 11:30 PM" },
                { day: "Sunday", hours: "11:00 AM – 11:00 PM" },
              ].map((r) => (
                <tr key={r.day} className="border-b border-gray-100">
                  <td className="py-3 font-medium text-gray-700">{r.day}</td>
                  <td className="py-3 text-right text-orange-700 font-semibold">{r.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Us</h2>
          <div className="bg-orange-50 border border-orange-100 rounded-2xl p-5 text-sm text-gray-700 space-y-3">
            <p className="flex items-start gap-2">
              <span className="text-xl">📍</span>
              <span>
                123 Residency Road, Near FC Road,<br />
                Pune, Maharashtra 411001
              </span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-xl">📞</span>
              <a href="tel:+912012345678" className="text-orange-600 hover:underline">
                +91 20 1234 5678
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-xl">✉️</span>
              <a href="mailto:hello@sweethome.in" className="text-orange-600 hover:underline">
                hello@sweethome.in
              </a>
            </p>
          </div>

          {/* Map placeholder */}
          <div className="mt-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl h-40 flex items-center justify-center text-gray-400 text-sm">
            <div className="text-center">
              <div className="text-4xl mb-1">🗺️</div>
              <p>Map integration coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="bg-orange-950 text-white py-14 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">Get in Touch</h2>
          <p className="text-orange-300 mb-8">
            Have a question, a catering inquiry, or just want to say hello?
          </p>
          <ContactForm />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 text-center">
        <Link
          href="/reservations"
          className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold px-10 py-4 rounded-full text-lg transition-colors"
        >
          Book a Table
        </Link>
      </section>
    </div>
  );
}

