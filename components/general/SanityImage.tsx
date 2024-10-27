'use client'

import React, { useEffect, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import type { Image as SanityImageType } from 'sanity'
import { imageBuilder } from 'lib/sanity.client'
import fallbackImage from '../../public/fallback.jpg'

type SanityImageProps = Omit<ImageProps, 'src'> & {
  sanitySrc?: SanityImageType;
  alt?: string;
  height?: number;
  width?: number;
  className?: string;
};

export function urlForImage(source: SanityImageType) {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return ''
  }

  return imageBuilder?.image(source).url()
}

export default function SanityImage({ sanitySrc, alt, ...props }: SanityImageProps) {
  // Could use passed in height and width to pull only necessary images sizes
  const imgSrc = sanitySrc ? urlForImage(sanitySrc) : ''

  return <ImageWithFallback alt={alt} src={imgSrc} {...props} />
}

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ImageProps['src'];
}

export function ImageWithFallback({ fallback = fallbackImage, alt, src, ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState<React.SyntheticEvent<HTMLImageElement, Event> | null>(null)
  useEffect(() => {
    setError(null)
  }, [src])
  const { height, width, fill } = props
  const default_height = fill ? height : height || 200
  const default_width = fill ? width : width || 200

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallback : src}
      width={default_width}
      height={default_height}
      {...props}
    />
  )
}
