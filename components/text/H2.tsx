"use client";

import React from "react";
import { COLORS, ColorKey } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const H2: React.FC<TextProps> = ({
  color = "textPrimaryDarkBg",
  children,
  style,
  ...props
}) => (
  <h2
    style={{
      fontFamily: "IBM Plex Serif",
      fontSize: "25px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </h2>
);
