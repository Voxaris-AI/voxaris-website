"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const [isScrolledFromHero, setIsScrolledFromHero] = useState(false);
  const [isProductsActive, setIsProductsActive] = useState(false);

  useEffect(() => {
    const scrollRoot = document.getElementById("scroll-container");
    const productsSection = document.getElementById("products-section");

    const updateScrolledState = () => {
      const currentScroll = scrollRoot ? scrollRoot.scrollTop : window.scrollY;
      setIsScrolledFromHero(currentScroll > 8);

      if (!productsSection) {
        setIsProductsActive(false);
        return;
      }

      const productsTop = productsSection.offsetTop;
      const productsBottom = productsTop + productsSection.offsetHeight;
      const viewportHeight = scrollRoot
        ? scrollRoot.clientHeight
        : window.innerHeight;
      const probeY = currentScroll + viewportHeight * 0.42;

      setIsProductsActive(probeY >= productsTop && probeY < productsBottom);
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

  const scrollToSectionEnd = (sectionId: string) => {
    const scrollRoot = document.getElementById("scroll-container");
    const section = document.getElementById(sectionId);

    if (section && scrollRoot) {
      const sectionTop = section.offsetTop;
      const maxSectionScroll = Math.max(
        0,
        section.offsetHeight - scrollRoot.clientHeight,
      );
      const targetTop = Math.min(
        sectionTop + maxSectionScroll,
        scrollRoot.scrollHeight - scrollRoot.clientHeight,
      );

      scrollRoot.scrollTo({ top: targetTop, behavior: "smooth" });
      return;
    }

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const handleProductsClick = () => {
    scrollToSectionEnd("products-section");
  };

  const handleContactClick = () => {
    scrollToSectionEnd("contact-section");
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
        <span className={styles.logoStack}>
          <Image
            src="/voxaris-logo.png"
            alt="Voxaris Logo"
            width={120}
            height={24}
            className={`${styles.logo} ${styles.logoBase}`}
          />
          <Image
            src="/voxaris-logo-glow.png"
            alt=""
            aria-hidden="true"
            width={120}
            height={24}
            className={`${styles.logo} ${styles.logoGlow}`}
          />
        </span>
      </button>

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleProductsClick}
          className={`${styles.productsButton} ${
            isProductsActive ? styles.productsButtonActive : ""
          }`}
          aria-current={isProductsActive ? "page" : undefined}
        >
          Products
        </button>

        <button
          type="button"
          onClick={handleContactClick}
          className={styles.contactButton}
        >
          <span className={styles.contactButtonText}>Contact Us</span>
        </button>
      </div>
    </nav>
  );
};
