"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass, Home, HelpCircle } from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col">
      <PageHero
        eyebrow="404 Error"
        title="Page Not Found in Alumni Archives"
        subtitle="The destination you are seeking might have moved, been archived, or the link may be outdated."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "404 Not Found" },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col items-center justify-center text-center">
        {/* Institutional Crest / Compass SVG Illustration */}
        <div className="mb-6 flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br from-navy-900 to-navy-950 border-2 border-gold-500/40 shadow-xl">
          <Compass className="h-14 w-14 text-gold-400 animate-pulse" strokeWidth={1.5} />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mb-3">
          Looking for a specific directory or document?
        </h2>
        <p className="text-muted text-base max-w-md mx-auto mb-8 leading-relaxed">
          Our verified database contains alumni profiles, event rosters, transcripts, and job vacancies. Use the navigation above or jump straight home.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 h-12 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 font-bold text-sm shadow-md transition-colors"
          >
            <Home className="h-4 w-4" />
            Return to Homepage
          </Link>

          <Link
            href="/help-desk"
            className="flex items-center gap-2 h-12 px-6 rounded-xl border border-line text-ink hover:bg-gold-500/10 font-semibold text-sm transition-colors"
          >
            <HelpCircle className="h-4 w-4 text-gold-600" />
            Contact Help Desk
          </Link>
        </div>
      </div>
    </div>
  );
}
