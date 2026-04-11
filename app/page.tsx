"use client";

import { useEffect, useState } from "react";
import { useSmoothScrollDeceleration } from "@/lib/hooks/useSmoothScrollDeceleration";
import { Navbar } from "@/lib/components/Navbar";
import { Hero } from "@/lib/sections/Hero";
import { H1 } from "@/lib/components/text";
import { Products } from "@/lib/sections/Products";

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
      <Products isDarkMode={isDarkMode} />
      <div
        className={`min-h-screen px-5 pt-[calc(56px+5vh)] sm:px-6 sm:pt-[calc(64px+5vh)] ${
          isDarkMode ? "bg-[#2b2b2b]" : "bg-white"
        }`}
      >
        <H1
          className="text-center font-bold"
          color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
        >
          Talk <em>to us</em>
        </H1>
      </div>
      <div className="h-[33.333svh] bg-[#1b1b1b]" />
    </main>
  );
}
