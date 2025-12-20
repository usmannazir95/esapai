"use client";

import type { YouTubeVideoProps } from "@/types/props";

export function YouTubeVideo({ videoId, title }: YouTubeVideoProps) {
  return (
    <div className="w-full">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || "YouTube video player"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}

export default YouTubeVideo;
