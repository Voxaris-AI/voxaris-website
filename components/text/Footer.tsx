"use client";

import React from "react";
import { COLORS, ColorKey } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const Footer: React.FC<TextProps> = ({
  color = "textSecondaryDarkBg",
  children,
  style,
  ...props
}) => (
  <footer
    style={{
      fontFamily: "IBM Plex Sans",
      fontSize: "10px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </footer>
);
