"use client";

import { useEffect, useState } from "react";
import { H4, Title } from "@/components/text";

const WORDS = ["simplicity", "intelligence"] as const;

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayWord, setDisplayWord] = useState<string>(WORDS[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = WORDS[wordIndex];

    let delay = isDeleting ? 75 : 110;

    if (!isDeleting && displayWord === targetWord) {
      delay = 1400;
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
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/hero-background.png')" }}
    >
      <div className="text-center px-6">
        <Title className="font-bold">
          We build
          <br />
          <em>{displayWord}</em>
        </Title>
        <H4 className="mt-20 max-w-2xl mx-auto">
          We build intelligent tools and infrastructure to help people and AI{" "}
          <br />
          work together, streamlining workflows
        </H4>
      </div>
    </div>
  );
}
