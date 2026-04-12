import React from "react";
import { H1, H4 } from "@/lib/components/text";
import { ScrollSection } from "@/lib/components/ScrollSection";

interface ContactProps {
  isDarkMode: boolean;
}

export const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  return (
    <ScrollSection
      id="contact-section"
      backgroundColor={isDarkMode ? "#252525" : "#f4f4f1"}
    >
      <H1
        className="text-center font-bold"
        color={isDarkMode ? "textPrimaryDarkBg" : "textLightBg"}
      >
        Talk <em>to us</em>
      </H1>
      <H4
        className="mx-auto mt-2 max-w-xl text-center"
        color={isDarkMode ? "textSecondaryDarkBg" : "textLightBg"}
      >
        Share your product vision and we will design the right AI system for
        your workflow.
      </H4>
      <button
        type="button"
        className="mt-3 rounded-full border border-black/20 bg-black px-7 py-3 text-sm font-semibold text-white transition hover:opacity-85"
      >
        Start a conversation
      </button>
    </ScrollSection>
  );
};
