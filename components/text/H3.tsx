"use client";

import React from "react";
import { COLORS, ColorKey } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const H3: React.FC<TextProps> = ({
  color = "textPrimaryDarkBg",
  children,
  style,
  ...props
}) => (
  <h3
    style={{
      fontFamily: "IBM Plex Serif",
      fontSize: "20px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </h3>
);
