'use client'

import React, { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import type { Image as SanityImageType } from 'sanity'
import { imageBuilder } from 'lib/sanity.client'
import fallbackImage from '../../public/fallback.jpg'

type SanityImageProps = Omit<ImageProps, 'src'> & {
  sanitySrc?: SanityImageType
  alt?: string
  height?: number
  width?: number
  className?: string
}

export function urlForImage(source: SanityImageType) {
  // Ensure that source image contains a valid reference
  if (!source.asset?._ref) {
    return ''
  }

  return imageBuilder.image(source).url()
}

export default function SanityImage({ sanitySrc, alt, ...props }: SanityImageProps) {
  // Could use passed in height and width to pull only necessary images sizes
  const imgSrc = sanitySrc ? urlForImage(sanitySrc) : ''

  return (
    <ImageWithFallback
      alt={alt}
      src={imgSrc}
      {...props}
    />
  )
}

interface ImageWithFallbackProps extends ImageProps {
  fallback?: ImageProps['src']
}

export function ImageWithFallback({
  fallback = fallbackImage,
  alt,
  src,
  width,
  height,
  fill,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<React.SyntheticEvent<HTMLImageElement> | null>(null)
  // Reset the error when the src changes, the React-idiomatic way: adjust state
  // during render by tracking the previous src, instead of in an effect.
  const [prevSrc, setPrevSrc] = useState(src)
  if (src !== prevSrc) {
    setPrevSrc(src)
    setError(null)
  }
  const sizeProps = fill ? { fill: true } : { width: width ?? 200, height: height ?? 200 }

  return (
    <Image
      {...props}
      {...sizeProps}
      alt={alt}
      onError={setError}
      src={error ? fallback : src}
    />
  )
}
