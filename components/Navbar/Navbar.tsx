"use client";

import React from "react";
import { COLORS } from "@/lib/theme";
import { Text } from "@/components/text";
import {
  cancelScrollDeceleration,
  lockScrollDeceleration,
} from "@/lib/hooks/useSmoothScrollDeceleration";
import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
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
      className={styles.navbar}
      style={{
        background: COLORS.greyGlassGradient,
        width: "90vw",
        height: "7.5vh",
        borderRadius: "50px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.4)",
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        paddingLeft: "2vw",
        paddingRight: "2vw",
      }}
    >
      <button
        type="button"
        aria-label="Scroll to hero section"
        onClick={handleLogoClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="/voxaris-logo.png"
          alt="Voxaris Logo"
          style={{
            height: "35%",
            objectFit: "contain",
          }}
        />
      </button>

      <div
        style={{
          marginLeft: "auto",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <Text
          color="textPrimaryDarkBg"
          style={{
            margin: 0,
          }}
        >
          Products
        </Text>

        <button
          type="button"
          style={{
            background: COLORS.navbarButtonBg,
            border: "none",
            borderRadius: "999px",
            padding: "10px 16px",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            color="textLightBg"
            style={{
              margin: 0,
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            Contact Us
          </Text>
        </button>
      </div>
    </nav>
  );
};
