"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
  backgroundImage?: string;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  actions,
  backgroundImage,
  className = "",
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-navy-950 text-white pt-10 pb-12 md:pt-16 md:pb-20 border-b border-navy-800 max-w-full",
        className
      )}
    >
      {/* Background photography overlay if provided */}
      {backgroundImage && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <Image
            src={backgroundImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-20 filter saturate-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/80" />
        </div>
      )}

      {/* Background patterned overlay */}
      <div className="absolute inset-0 bg-navy-pattern opacity-30 pointer-events-none" />

      {/* Decorative gradient radial glow */}
      <div className="absolute -top-32 right-0 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl pointer-events-none overflow-hidden" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb nav */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-ivory/60 mb-4 flex-wrap"
        >
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-gold-300 transition-colors py-1"
          >
            <Home className="h-3.5 w-3.5" strokeWidth={1.75} />
            <span className="sr-only md:not-sr-only">Home</span>
          </Link>

          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={idx}>
                <ChevronRight className="h-3 w-3 text-ivory/30 shrink-0" strokeWidth={1.75} />
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-gold-300 transition-colors py-1 line-clamp-1"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "line-clamp-1 py-1 font-medium",
                      isLast ? "text-gold-400" : "text-ivory/80"
                    )}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        {/* Eyebrow */}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
              {eyebrow}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif font-bold text-ivory tracking-tight max-w-4xl text-balance mb-4">
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-ivory/70 max-w-2xl leading-relaxed text-pretty">
            {subtitle}
          </p>
        )}

        {/* Action buttons if supplied */}
        {actions && <div className="mt-6 flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </section>
  );
}
