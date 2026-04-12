"use client";

import React, { useEffect, useState } from "react";
import { H1, H4 } from "@/lib/components/text";
import { LineupCard } from "@/lib/components/LineupCard";
import { ScrollSection } from "@/lib/components/ScrollSection";
import { COLORS } from "@/lib/theme";
import styles from "./Products.module.css";

export const Products: React.FC = () => {
  const [firstCardVisible, setFirstCardVisible] = useState(false);
  const [secondCardVisible, setSecondCardVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const section = document.getElementById("products-section");

    if (!section || !scrollContainer) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setFirstCardVisible(true);
      setSecondCardVisible(true);
      return;
    }

    let rafId = 0;

    const updateRevealState = () => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = scrollContainer.clientHeight;
      const scrollTop = scrollContainer.scrollTop;
      const scrollableSectionDistance = Math.max(
        1,
        sectionHeight - viewportHeight,
      );
      const rawProgress = (scrollTop - sectionTop) / scrollableSectionDistance;
      const progress = Math.max(0, Math.min(1, rawProgress));

      setFirstCardVisible(progress > 0.1);
      setSecondCardVisible(progress > 0.4);
      rafId = 0;
    };

    const onScrollOrResize = () => {
      if (rafId !== 0) {
        return;
      }

      rafId = window.requestAnimationFrame(updateRevealState);
    };

    updateRevealState();
    scrollContainer.addEventListener("scroll", onScrollOrResize, {
      passive: true,
    });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }

      scrollContainer.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  return (
    <ScrollSection
      id="products-section"
      className={styles.extendedScrollRoom}
      backgroundColor={COLORS.darkerGrey}
      contentPlacement="top"
      topOffsetMode="nav"
      visibilityThreshold={0.11}
    >
      <H1 className="text-center font-bold text-white">
        Our <em>lineup</em>
      </H1>
      <H4 className="mx-auto mt-0 max-w-2xl text-center text-white/85">
        Our selection of voice-enabled AI tools for every industry
      </H4>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-10">
        <div
          className={`${styles.cardReveal} ${
            firstCardVisible ? styles.cardVisible : ""
          }`}
        >
          <LineupCard variant="araGradient" />
        </div>
        <div
          className={`${styles.cardReveal} ${
            secondCardVisible ? styles.cardVisible : ""
          }`}
        >
          <LineupCard variant="ariGradient" />
        </div>
      </div>
    </ScrollSection>
  );
};
