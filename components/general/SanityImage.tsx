import fallbackImage from "../../public/fallback.jpg";
import React, { useEffect, useState } from "react";
import Image, { ImageProps } from "next/image";
import type { Image as SanityImageType } from "sanity";
import { urlForImage } from "lib/sanity.client";

interface SanityImageProps {
  sanitySrc: SanityImageType;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

export default function SanityImage({
  sanitySrc,
  height,
  width,
  alt,
  ...props
}: SanityImageProps) {
  //   console.log("h", height);
  const imgSrc = urlForImage(sanitySrc);

  return (
    <ImageWithFallback
      alt={alt}
      src={imgSrc}
      height={height}
      width={width}
      {...props}
    />
  );
}

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ImageProps["src"];
}

export const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  height,
  width,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<React.SyntheticEvent<
    HTMLImageElement,
    Event
  > | null>(null);
  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallbackImage : src}
      height={height}
      width={width}
      {...props}
    />
  );
};
