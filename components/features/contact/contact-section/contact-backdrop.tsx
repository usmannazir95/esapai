"use client";

import Frame from "@/components/sections/shared/frame";

export function ContactBackdrop() {
  return (
    <>
      {/* Animated Frame Background */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-35">
          <Frame className="w-full h-full max-w-[1200px] max-h-[1600px] object-contain" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-transparent to-dark/80" />
      </div>

      {/* Green Gradient Background Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-gradient-to-b from-primary via-primary/20 to-transparent opacity-30 blur-3xl" />
      </div>
    </>
  );
}



