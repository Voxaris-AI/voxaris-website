"use client";

import { useEffect, useState } from "react";
import { COLORS } from "@/lib/theme";
import { useSmoothScrollDeceleration } from "@/lib/hooks/useSmoothScrollDeceleration";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useSmoothScrollDeceleration();

  useEffect(() => {
    // Check system preference
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener("change", handleChange);

    return () => darkModeQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <main>
      <Navbar />
      <Hero />
      <div
        className="min-h-screen"
        style={{
          backgroundColor: isDarkMode
            ? COLORS.darkerGrey
            : COLORS.navbarButtonBg,
        }}
      ></div>
    </main>
  );
}
