"use client";

export default function ContactForm() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-4 text-left"
    >
      <input
        type="text"
        placeholder="Your name"
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <input
        type="email"
        placeholder="Email address"
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
      />
      <textarea
        placeholder="Your message"
        rows={4}
        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
      />
      <button
        type="submit"
        className="w-full bg-amber-400 hover:bg-amber-300 text-orange-950 font-bold py-3 rounded-xl transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
