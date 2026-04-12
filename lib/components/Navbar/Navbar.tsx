"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const [isScrolledFromHero, setIsScrolledFromHero] = useState(false);

  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-container");

    const updateScrolledState = () => {
      const currentScroll = scrollRoot ? scrollRoot.scrollTop : window.scrollY;
      setIsScrolledFromHero(currentScroll > 8);
    };

    updateScrolledState();
    const listenerTarget: HTMLElement | Window = scrollRoot ?? window;
    listenerTarget.addEventListener("scroll", updateScrolledState, {
      passive: true,
    });

    return () => {
      listenerTarget.removeEventListener("scroll", updateScrolledState);
    };
  }, []);

  const handleLogoClick = () => {
    const scrollRoot = document.getElementById("scroll-container");
    const heroSection = document.getElementById("hero-section");

    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (scrollRoot) {
      scrollRoot.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
        <Image
          src="/voxaris-logo.png"
          alt="Voxaris Logo"
          width={120}
          height={24}
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
