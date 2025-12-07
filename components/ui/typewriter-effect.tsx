"use client";

import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/utils/performance-utils";

gsap.registerPlugin(ScrollTrigger);

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const cursorTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      // Respect reduced motion
      if (prefersReducedMotion()) {
        // Just show all characters immediately
        gsap.set(".char", {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
          // Optimize ScrollTrigger performance
          markers: false,
          refreshPriority: -1,
        },
      });

      tl.to(".char", {
        display: "inline-block",
        opacity: 1,
        width: "fit-content",
        duration: 0.3,
        stagger: 0.1,
        ease: "power2.inOut",
      });

      // Cursor blinking - only if not reduced motion
      cursorTweenRef.current = gsap.to(".cursor", {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
      
      // Cleanup
      return () => {
        if (cursorTweenRef.current) {
          cursorTweenRef.current.kill();
          cursorTweenRef.current = null;
        }
      };
    },
    { scope: containerRef }
  );
  
  // Cleanup on unmount
  useEffect(() => {
    const container = containerRef.current;
    return () => {
      if (cursorTweenRef.current) {
        cursorTweenRef.current.kill();
      }
      if (container) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === container) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  const renderWords = () => {
    return (
      <div className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(
                    `char dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <span
        className={cn(
          "cursor inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);

  const cursorTweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      // Respect reduced motion
      if (prefersReducedMotion()) {
        if (textWrapperRef.current) {
          gsap.set(textWrapperRef.current, { width: "fit-content" });
        }
        return;
      }

      gsap.to(textWrapperRef.current, {
        width: "fit-content",
        duration: 2,
        ease: "linear",
        delay: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
          markers: false,
          refreshPriority: -1,
        },
      });

      // Cursor blinking
      cursorTweenRef.current = gsap.to(".cursor", {
        opacity: 0,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
      
      // Cleanup
      return () => {
        if (cursorTweenRef.current) {
          cursorTweenRef.current.kill();
          cursorTweenRef.current = null;
        }
      };
    },
    { scope: containerRef }
  );
  
  // Cleanup on unmount
  useEffect(() => {
    const container = containerRef.current;
    return () => {
      if (cursorTweenRef.current) {
        cursorTweenRef.current.kill();
      }
      if (container) {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars.trigger === container) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div ref={containerRef} className={cn("flex space-x-1 my-6", className)}>
      <div
        ref={textWrapperRef}
        className="overflow-hidden pb-2 w-0"
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </div>
      <span
        className={cn(
          "cursor block rounded-sm w-[4px] h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></span>
    </div>
  );
};
