"use client";

import { useEffect, useState } from "react";
import { COLORS } from "@/lib/theme";
import { useSmoothScrollDeceleration } from "@/lib/hooks/useSmoothScrollDeceleration";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { H1, H4 } from "@/components/text";
import { LineupCard } from "@/components/LineupCard";

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
        className="min-h-screen px-5 pt-[calc(56px+5vh)] sm:px-6 sm:pt-[calc(64px+5vh)]"
        style={{
          backgroundColor: isDarkMode
            ? COLORS.darkerGrey
            : COLORS.navbarButtonBg,
        }}
      >
        <H1
          className="text-center font-bold"
          color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
        >
          Our <em>lineup</em>
        </H1>
        <H4
          className="mx-auto mt-3 max-w-2xl text-center"
        >
          Our selection of voice-enabled AI tools for every industry
        </H4>
        <div className="mt-8 flex justify-center gap-[5vw]">
          <LineupCard variant="araGradient" />
          <LineupCard variant="ariGradient" />
        </div>
      </div>
    </main>
  );
}
