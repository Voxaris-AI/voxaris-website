import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Voxaris AI - Streamlining Front-Desk Operations",
  description:
    "Voxaris AI leverages advanced artificial intelligence to optimize and streamline front-desk operations for businesses, enhancing customer experience and operational efficiency.",
  keywords: [
    "Voxaris AI",
    "Artificial Intelligence",
    "Front-Desk Operations",
    "Business Solutions",
    "AI Tools",
  ],
  icons: {
    icon: [
      { url: "/assets/voxaris-logo-square.png" },
      {
        url: "/assets/voxaris-logo-square.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/assets/voxaris-logo-square.png",
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
