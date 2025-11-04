"use client";

interface YouTubeVideoProps {
  videoId: string;
  title?: string;
}

export function YouTubeVideo({
  videoId,
  title = "Products That Work for You",
}: YouTubeVideoProps) {
  return (
    <section className="relative w-full py-20 px-4 overflow-hidden bg-dark">
      <div className="relative container mx-auto max-w-7xl z-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-12 text-center text-gradient-radial-white leading-tight">
            {title}
          </h2>

          {/* YouTube Video Embed */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl video-glow">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

