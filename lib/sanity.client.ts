import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import type { Image } from "sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
});

// interface urlForImageProps {
//   source: Image;
// }

export function urlForImage(source: Image) {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return "";
  }

  return imageBuilder
    ?.image(source)
    .auto("format")
    .fit("max")
    .fit("crop")
    .url();
}
