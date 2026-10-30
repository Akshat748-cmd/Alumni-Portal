"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { IMAGES, DEFAULT_BLUR_DATA_URL } from "@/data/images";
import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
  overlay?: boolean;
  aspectRatio?: "16/9" | "4/3" | "1/1" | "auto";
  containerClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = IMAGES.placeholders.navyGoldFallback,
  overlay = false,
  aspectRatio = "auto",
  containerClassName = "",
  className = "",
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  const aspectClasses = {
    "16/9": "aspect-[16/9]",
    "4/3": "aspect-[4/3]",
    "1/1": "aspect-square",
    auto: "",
  }[aspectRatio];

  const isSafeSrc =
    typeof src === "string" &&
    (src.startsWith("https://images.unsplash.com") ||
      src.startsWith("data:") ||
      src.startsWith("/"));

  const currentSrc = error || !src || !isSafeSrc ? fallbackSrc : src;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-navy-950",
        aspectClasses,
        containerClassName
      )}
    >
      <Image
        {...props}
        src={currentSrc}
        alt={alt || "Poddar Alumni Network"}
        placeholder="blur"
        blurDataURL={DEFAULT_BLUR_DATA_URL}
        onError={() => setError(true)}
        className={cn(
          "object-cover transition-transform duration-500 hover:scale-105",
          className
        )}
      />

      {/* Subtle navy overlay for readability and branded look */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent pointer-events-none" />
      )}
    </div>
  );
}
