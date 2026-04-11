import React from "react";
import { H1, H4 } from "@/lib/components/text";
import { LineupCard } from "@/lib/components/LineupCard";

interface ProductsProps {
  isDarkMode: boolean;
}

export const Products: React.FC<ProductsProps> = ({ isDarkMode }) => {
  return (
    <div
      className={`flex min-h-screen flex-col px-5 pt-[calc(56px+5vh)] sm:px-6 sm:pt-[calc(64px+5vh)] ${
        isDarkMode ? "bg-[#1b1b1b]" : "bg-white"
      }`}
    >
      <H1
        className="text-center font-bold"
        color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
      >
        Our <em>lineup</em>
      </H1>
      <H4 className="mx-auto mt-6 max-w-2xl text-center">
        Our selection of voice-enabled AI tools for every industry
      </H4>
      <div className="flex flex-1 items-center justify-center">
        <div className="flex justify-center gap-[3.75vw]">
          <LineupCard variant="araGradient" />
          <LineupCard variant="ariGradient" />
        </div>
      </div>
    </div>
  );
};
