"use client";

import React from "react";
import { COLORS, ColorKey } from "@/lib/theme";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  color?: ColorKey;
  children: React.ReactNode;
}

export const Title: React.FC<TextProps> = ({
  color = "textPrimaryDarkBg",
  children,
  style,
  ...props
}) => (
  <div
    style={{
      fontFamily: "IBM Plex Serif",
      fontSize: "85px",
      color: COLORS[color],
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);
