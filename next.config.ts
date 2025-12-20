import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TypeScript configuration
  typescript: {
    // Enable type checking during build for production
    ignoreBuildErrors: false,
  },

  // Image optimization configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Optimize image quality and formats
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // React Compiler (requires babel-plugin-react-compiler)
  // Disabled for now - can be enabled later by installing:
  // pnpm add -D babel-plugin-react-compiler
  // reactCompiler: true,

  // Output file tracing (moved to top level in Next.js 16)
  outputFileTracingIncludes: {
    "/": ["./public/**/*"],
  },

  // Enable experimental features
  experimental: {
    // Optimize CSS
    optimizeCss: true,
  },

  // Turbopack configuration (empty to silence webpack warning)
  turbopack: {},

  // Compression
  compress: true,

  // Security and performance headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/(.*)\\.(jpg|jpeg|png|gif|svg|webp|avif|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)\\.(js|css|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Webpack configuration for bundle analysis
  // Only used when explicitly running with --webpack flag or ANALYZE=true
  webpack: (config, { isServer }) => {
    // Bundle analyzer (enabled via ANALYZE=true env variable)
    if (process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: isServer
            ? "../analyze/server.html"
            : "./analyze/client.html",
          openAnalyzer: true,
        })
      );
    }

    return config;
  },
} as NextConfig;

export default nextConfig;
