import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";
import type { SanityImageSource } from "@/types/sanity";

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
