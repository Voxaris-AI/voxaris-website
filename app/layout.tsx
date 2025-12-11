import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Tandem Technologies - Enabling seamless collaboration between humans and AI",
  description:
    "Tandem builds intelligent tools and infrastructure that let humans and AI work in tandem.",
  keywords: ["AI", "collaboration", "technology", "automation", "workflow"],
  icons: {
    icon: "/assets/tandem-logo-square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} font-sans`}>{children}</body>
    </html>
  );
}
