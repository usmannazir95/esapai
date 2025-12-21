"use client";

import type { YouTubeVideoProps } from "@/types/props";

export function YouTubeVideo({ videoId, title }: YouTubeVideoProps) {
  return (
    <div className="w-full flex items-center justify-center py-8 sm:py-10 md:py-12">
      <div className="relative w-full max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Wrapper with padding to accommodate glow (glow extends 0.5rem = 8px on all sides) */}
        <div className="relative w-full" style={{ padding: '0.5rem' }}>
          {/* Aspect ratio container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {/* Multi-layer glow effect wrapping all around */}
            {/* Outer glow - largest blur */}
            <div className="absolute -inset-2 bg-[#13F584] rounded-lg opacity-60 blur-xl animate-pulse" />
            {/* Middle glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-[#13F584] via-[#8EFFC7] to-[#13F584] rounded-lg opacity-70 blur-lg" />
            {/* Inner glow - tighter blur */}
            <div className="absolute -inset-1 bg-gradient-to-br from-[#13F584] via-[#8EFFC7] to-[#13F584] rounded-lg opacity-75 blur-md" />
            {/* Close glow - sharpest */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#13F584] via-[#8EFFC7] to-[#13F584] rounded-lg opacity-80 blur-sm" />
            
            {/* Video container with perfect aspect ratio */}
            <div className="absolute inset-0 rounded-lg overflow-hidden bg-dark/50 shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title || "YouTube video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                style={{ border: 'none' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTubeVideo;
