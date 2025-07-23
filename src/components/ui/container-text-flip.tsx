"use client";

import React, { useState, useEffect, useId } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
  /** Delay in milliseconds after completing the entire array before restarting */
  postArrayDelay?: number;
  /** Multiplier to slow down animation duration for the last word */
  lastWordAnimationSpeed?: number;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
  postArrayDelay = 1000,
  lastWordAnimationSpeed = 2,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(100);
  const textRef = React.useRef(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Add some padding to the text width (30px on each side)
      // @ts-ignore
      const textWidth = textRef.current.scrollWidth + 30;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    // Update width whenever the word changes
    updateWidthForWord();
  }, [currentWordIndex]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (words.length === 0) return;
    // If we're at the last word, pause for interval + postArrayDelay, else just interval
    if (currentWordIndex === words.length - 1) {
      timeoutId = setTimeout(() => {
        setCurrentWordIndex(0);
      }, interval + postArrayDelay);
    } else {
      timeoutId = setTimeout(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
      }, interval);
    }
    return () => clearTimeout(timeoutId);
  }, [words, interval, postArrayDelay, currentWordIndex]);

  return (
    <motion.div
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{
        duration:
          (currentWordIndex === words.length - 1
            ? animationDuration * lastWordAnimationSpeed
            : animationDuration) / 1000,
        ease: "easeInOut",
      }}
      className={cn(
        "relative inline-block rounded-lg pt-2 pb-3 text-center text-4xl font-bold text-black md:text-7xl dark:text-white",
        
        className,
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration:
            (currentWordIndex === words.length - 1
              ? animationDuration * lastWordAnimationSpeed
              : animationDuration) / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay:
                  index *
                  (currentWordIndex === words.length - 1
                    ? 0.02 * lastWordAnimationSpeed
                    : 0.02),
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
