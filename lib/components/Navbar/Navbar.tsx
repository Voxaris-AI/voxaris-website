"use client";

import React, { useEffect, useState } from "react";
import {
  cancelScrollDeceleration,
  lockScrollDeceleration,
} from "@/lib/hooks/useSmoothScrollDeceleration";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const [isScrolledFromHero, setIsScrolledFromHero] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => {
      setIsScrolledFromHero(window.scrollY > 8);
    };

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  const handleLogoClick = () => {
    // Prevent custom deceleration from fighting the logo jump.
    lockScrollDeceleration(1800);
    cancelScrollDeceleration();

    const heroSection = document.getElementById("hero-section");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Smooth fallback retry if the first smooth scroll gets interrupted.
    window.setTimeout(() => {
      if (heroSection) {
        const heroTop = heroSection.getBoundingClientRect().top;
        if (Math.abs(heroTop) > 8) {
          heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (window.scrollY > 8) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 900);
  };

  return (
    <nav
      className={`${styles.navbar} ${
        isScrolledFromHero ? styles.navbarVisible : ""
      }`}
    >
      <button
        type="button"
        aria-label="Scroll to hero section"
        onClick={handleLogoClick}
        className={styles.logoButton}
      >
        <img
          src="/voxaris-logo.png"
          alt="Voxaris Logo"
          className={styles.logo}
        />
      </button>

      <div className={styles.actions}>
        <span className={styles.productsLabel}>Products</span>

        <button type="button" className={styles.contactButton}>
          <span className={styles.contactButtonText}>Contact Us</span>
        </button>
      </div>
    </nav>
  );
};
