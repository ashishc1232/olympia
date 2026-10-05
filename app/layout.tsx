import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-barlow" });
const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700", "800"], style: ["italic", "normal"], variable: "--font-barlow-condensed" });

export const metadata: Metadata = {
  title: "Olympia | Sports flooring binders & industrial polymers",
  description: "Olympia makes sports flooring binders, polymer chemicals and industrial gum for track and sports surface manufacturers.",
  icons:{
    icon:"/favicon.png"
  }
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>{children}</body>
    </html>
  );
}
