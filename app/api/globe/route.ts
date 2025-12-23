import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { unstable_cache } from "next/cache";

const readGlobeJson = unstable_cache(
  async () => {
    const globePath = path.join(process.cwd(), "data", "globe.json");
    const raw = await readFile(globePath, "utf8");
    return JSON.parse(raw) as unknown;
  },
  ["globe-geojson-v1"],
  {
    revalidate: 60 * 60 * 24 * 30, // 30 days
  }
);

export async function GET() {
  const data = await readGlobeJson();
  return NextResponse.json(data, {
    headers: {
      // Cache at CDN/edge + allow browser caching
      "Cache-Control": "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400",
    },
  });
}

