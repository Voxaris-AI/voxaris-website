"use client";

import React, { useEffect, useState } from "react";
import { H1, H2, H4, Text } from "@/lib/components/text";
import { ScrollSection } from "@/lib/components/ScrollSection";
import styles from "./Contact.module.css";

interface ContactProps {
  isDarkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [cardVisible, setCardVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById("scroll-container");
    const section = document.getElementById("contact-section");

    if (!section || !scrollContainer) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setCardVisible(true);
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

      setCardVisible(progress > 0.22);
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
      id="contact-section"
      backgroundColor={isDarkMode ? "#252525" : "#f4f4f1"}
      contentPlacement="top"
      topOffsetMode="nav"
      visibilityThreshold={0.11}
    >
      <H1
        className="text-center font-bold"
        color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
      >
        Talk <em>to us</em>
      </H1>
      <H4
        className="mx-auto mt-0 max-w-2xl text-center"
        color={isDarkMode ? "textSecondaryDarkBg" : "textLightBg"}
      >
        Interested in learning more about our products or
        <br />
        partnering with us? We&apos;d love to hear from you
      </H4>
      <div className="flex min-h-[52svh] w-full items-center justify-center">
        <div
          className={`${styles.cardReveal} ${
            cardVisible ? styles.cardVisible : ""
          } w-[min(calc((100vw-16px)*0.8),960px)] max-w-none rounded-[28px] bg-grey-glass p-px shadow-[0_14px_30px_rgba(0,0,0,0.28),0_4px_10px_rgba(0,0,0,0.2)] sm:w-[min(72vw,960px)]`}
        >
          <div className="flex min-h-[180px] w-full flex-col items-center justify-center gap-3 rounded-[27px] bg-grey-glass px-6 py-5">
            <Text color="textPrimaryDarkBg" className="text-center">
              Email us at:
            </Text>
            <div className="flex items-center justify-center gap-2">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5 text-white"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M4 7L12 13L20 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <H2
                color="textPrimaryDarkBg"
                className="text-center font-bold italic"
              >
                team@voxaris.ai
              </H2>
            </div>
          </div>
        </div>
      </div>
    </ScrollSection>
  );
};
