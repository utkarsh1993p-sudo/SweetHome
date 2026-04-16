"use client";

import { useState } from "react";
import type { Reservation } from "@/lib/types";

const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

export default function ReservationsPage() {
  const [form, setForm] = useState<Reservation>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2,
    specialRequests: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof Reservation, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof Reservation, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.phone.trim() || !/^\+?[0-9\s\-]{8,15}$/.test(form.phone))
      newErrors.phone = "Valid phone number is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.time) newErrors.time = "Time slot is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="text-7xl mb-6">🎉</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h1>
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 text-left mt-6 space-y-2">
          <Detail label="Name" value={form.name} />
          <Detail label="Date" value={form.date} />
          <Detail label="Time" value={form.time} />
          <Detail label="Guests" value={String(form.guests)} />
          {form.specialRequests && (
            <Detail label="Notes" value={form.specialRequests} />
          )}
        </div>
        <p className="text-gray-500 text-sm mt-4">
          A confirmation has been sent to <strong>{form.email}</strong>
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", date: "", time: "", guests: 2, specialRequests: "" }); }}
          className="mt-6 text-orange-600 font-semibold hover:underline"
        >
          Make another reservation
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900">Book a Table</h1>
        <p className="text-gray-500 mt-2">Reserve your spot for a memorable dining experience</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5 bg-white rounded-3xl border border-orange-100 shadow-sm p-8">
        {/* Name + Phone */}
        <div className="grid sm:grid-cols-2 gap-5">
          <Field
            label="Full Name"
            required
            error={errors.name}
          >
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Priya Sharma"
              className={inputCls(errors.name)}
            />
          </Field>
          <Field label="Phone Number" required error={errors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className={inputCls(errors.phone)}
            />
          </Field>
        </div>

        {/* Email */}
        <Field label="Email Address" required error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="priya@example.com"
            className={inputCls(errors.email)}
          />
        </Field>

        {/* Date + Guests */}
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Date" required error={errors.date}>
            <input
              type="date"
              min={today}
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className={inputCls(errors.date)}
            />
          </Field>
          <Field label="Number of Guests" required>
            <select
              value={form.guests}
              onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value, 10) })}
              className={inputCls()}
            >
              {GUEST_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "guest" : "guests"}
                </option>
              ))}
              <option value={9}>9+ guests (call us)</option>
            </select>
          </Field>
        </div>

        {/* Time slot */}
        <Field label="Preferred Time" required error={errors.time}>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setForm({ ...form, time: slot })}
                className={`py-2 px-1 text-sm rounded-xl border-2 transition-colors ${
                  form.time === slot
                    ? "border-orange-600 bg-orange-600 text-white font-medium"
                    : "border-gray-200 hover:border-orange-300 text-gray-700"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
        </Field>

        {/* Special requests */}
        <Field label="Special Requests">
          <textarea
            value={form.specialRequests}
            onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
            placeholder="Allergies, dietary preferences, occasion details..."
            rows={3}
            className={`${inputCls()} resize-none`}
          />
        </Field>

        <button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl text-lg transition-colors"
        >
          Confirm Reservation
        </button>
      </form>

      {/* Info */}
      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-900">
        <p className="font-semibold mb-2">Good to know</p>
        <ul className="list-disc list-inside space-y-1 text-amber-700">
          <li>We hold tables for 15 minutes past your reservation time</li>
          <li>For large groups (9+), please call us directly</li>
          <li>Cancellations accepted up to 2 hours before your booking</li>
        </ul>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
}

function inputCls(error?: string) {
  return `w-full border ${
    error ? "border-red-400" : "border-gray-200"
  } rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400`;
}
