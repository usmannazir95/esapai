export const imageConfig = {
    // Quality settings
    quality: {
        default: 80,
        high: 90,
        low: 75,
    },

    // Breakpoints for sizes prop
    breakpoints: {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1536,
    },

    // Common sizes strings
    sizes: {
        fullWidth: "100vw",
        halfWidth: "(max-width: 768px) 100vw, 50vw",
        thirdWidth: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
        quarterWidth: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw",
        hero: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px",
    },

    // Blur placeholder generation (helper)
    shimmer: (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `,

    toBase64: (str: string) =>
        typeof window === "undefined"
            ? Buffer.from(str).toString("base64")
            : window.btoa(str),
};

export const getBlurDataURL = (w: number, h: number) => {
    return `data:image/svg+xml;base64,${imageConfig.toBase64(imageConfig.shimmer(w, h))}`;
};
