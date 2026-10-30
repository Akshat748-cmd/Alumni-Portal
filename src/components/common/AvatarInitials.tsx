"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface AvatarInitialsProps {
  name: string;
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export function AvatarInitials({
  name,
  src,
  size = "md",
  className = "",
}: AvatarInitialsProps) {
  const [imageError, setImageError] = useState(false);

  // Extract initials (e.g. "Vikramaditya Rathore" -> "VR")
  const getInitials = (n: string) => {
    if (!n) return "PA";
    const parts = n.trim().split(" ");
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  };

  const initials = getInitials(name);

  const sizeClasses = {
    sm: "h-9 w-9 text-xs",
    md: "h-11 w-11 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl",
  }[size];

  return (
    <div
      className={cn(
        "relative shrink-0 rounded-full overflow-hidden border-2 border-gold-500/40 shadow-sm",
        sizeClasses,
        className
      )}
    >
      {src && !imageError ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 768px) 48px, 64px"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-900 via-navy-800 to-navy-950 font-serif font-bold text-gold-300 select-none">
          {initials}
        </div>
      )}
    </div>
  );
}

