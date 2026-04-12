"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/lib/components/Navbar";
import { ScrollContainer } from "@/lib/components/ScrollContainer";
import { Hero } from "@/lib/sections/Hero";
import { Products } from "@/lib/sections/Products";
import { Contact } from "@/lib/sections/Contact";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <>
      <Navbar />
      <ScrollContainer>
        <Hero />
        <Products />
        <Contact isDarkMode={isDarkMode} />
      </ScrollContainer>
    </>
  );
}
