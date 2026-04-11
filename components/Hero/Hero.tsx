"use client";

import { useEffect, useState } from "react";
import { H4, Title } from "@/components/text";
import { TYPING_WORDS } from "./typingWords";

const FALLBACK_WORDS = ["simplicity"];
const WORDS = TYPING_WORDS.length > 0 ? TYPING_WORDS : FALLBACK_WORDS;
const LONGEST_WORD = WORDS.reduce(
  (longest, word) => (word.length > longest.length ? word : longest),
  WORDS[0],
);

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState<string>(WORDS[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = WORDS[wordIndex];

    let delay = isDeleting ? 75 : 110;

    if (!isDeleting && displayWord === targetWord) {
      delay = 2500;
    }

    if (isDeleting && displayWord.length === 0) {
      delay = 250;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (displayWord.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % WORDS.length);
          return;
        }

        setDisplayWord((prev) => prev.slice(0, -1));
        return;
      }

      if (displayWord.length < targetWord.length) {
        setDisplayWord(targetWord.slice(0, displayWord.length + 1));
        return;
      }

      setIsDeleting(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayWord, isDeleting, wordIndex]);

  return (
    <div
      id="hero-section"
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-background.png')" }}
    >
      <div className="text-center px-6">
        <Title className="font-bold">
          We build
          <br />
          <span className="relative inline-block min-w-[12ch] text-center align-baseline">
            <span className="invisible italic">{LONGEST_WORD}</span>
            <span className="absolute inset-0 inline-flex items-baseline justify-center">
              <em className="italic">{displayWord || "\u00A0"}</em>
              <span aria-hidden="true" className="typing-caret" />
            </span>
          </span>
        </Title>
        <H4 className="mt-20 max-w-2xl mx-auto">
          We build intelligent tools and infrastructure to help people and AI{" "}
          <br />
          work together, streamlining workflows
        </H4>
      </div>

      <div
        aria-hidden="true"
        className="scroll-down-chevron pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
