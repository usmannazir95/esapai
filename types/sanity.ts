/**
 * Sanity CMS type definitions
 */

export type SanityImage = {
  _key?: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
};

export type SanityImageSource = Parameters<
  ReturnType<typeof import("@sanity/image-url").createImageUrlBuilder>["image"]
>[0];
