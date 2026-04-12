"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ScrollSection.module.css";

interface ScrollSectionProps {
  id: string;
  children: React.ReactNode;
  overlay?: React.ReactNode;
  className?: string;
  backgroundColor?: string;
  contentPlacement?: "center" | "top";
  topOffsetMode?: "default" | "nav";
}

const BACKGROUND_CLASS_MAP: Record<string, string> = {
  "#101010": "bgDark",
  "#f4f4f1": "bgLight",
  "#252525": "bgCharcoal",
};

export function ScrollSection({
  id,
  children,
  overlay,
  className,
  backgroundColor,
  contentPlacement = "center",
  topOffsetMode = "default",
}: ScrollSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting && entry.intersectionRatio > 0.45);
      },
      {
        threshold: [0.25, 0.45, 0.7],
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const sectionChildren = React.Children.toArray(children);
  const backgroundClass = backgroundColor
    ? styles[BACKGROUND_CLASS_MAP[backgroundColor] ?? ""]
    : "";
  const placementClass = contentPlacement === "top" ? styles.topAligned : "";
  const offsetClass = topOffsetMode === "nav" ? styles.navOffsetTop : "";

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`${styles.section} ${backgroundClass} ${className ?? ""}`}
    >
      <div className={`${styles.stickyFrame} ${placementClass} ${offsetClass}`}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
          {sectionChildren.map((child, index) => (
            <div key={index} className={styles.revealItem}>
              {child}
            </div>
          ))}
        </div>
        {overlay}
      </div>
    </section>
  );
}
