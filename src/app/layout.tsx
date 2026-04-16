import type { Metadata } from "next";
import { Playfair_Display_SC, Karla } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display_SC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const karla = Karla({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Sweet Home — Pure Veg Garden Restaurant",
  description:
    "Authentic pure vegetarian Indian cuisine in a warm garden setting. 150+ dishes — South Indian, Hindustani, Chinese, Sizzlers, Mastanis. Dine in, order online, or book your table.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${karla.variable} h-full`}>
      <body className="min-h-screen flex flex-col antialiased bg-[--color-bg] text-[--color-fg] font-body">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
