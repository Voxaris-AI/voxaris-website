"use client";

import { useEffect, useState } from "react";
import { COLORS } from "@/lib/theme";
import { useSmoothScrollDeceleration } from "@/lib/hooks/useSmoothScrollDeceleration";

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
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-background.png')" }}
      ></div>
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
