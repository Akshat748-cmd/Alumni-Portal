"use client";

import React from "react";
import Link from "next/link";
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
  className = "",
}: PageHeroProps) {
  // Filter out any duplicate Home entries (prevents "Home > Home")
  const cleanBreadcrumbs = breadcrumbs.filter(
    (crumb) => crumb.label.toLowerCase() !== "home" && crumb.href !== "/"
  );

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#0B1426] text-white pt-[64px] sm:pt-20 lg:pt-[88px] pb-4 sm:pb-7 lg:pb-12 border-b border-navy-800 min-h-0 sm:min-h-[250px] lg:min-h-[330px] flex items-center",
        className
      )}
    >
      {/* Background patterned overlay & ambient depth glow */}
      <div className="absolute inset-0 bg-navy-pattern opacity-25 pointer-events-none" />
      <div className="absolute -top-20 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
          {/* Left Content Column */}
          <div className="w-full lg:w-[58%] xl:w-[56%] max-w-2xl">
            {/* Breadcrumb nav: Ultra-compact & subtle (never distracts user focus) */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[10px] lg:text-[11px] text-white/50 mb-1 sm:mb-1.5 flex-wrap"
            >
              <Link
                href="/"
                className="flex items-center gap-1 text-white/45 hover:text-gold-300 transition-colors py-0.5"
                aria-label="Home"
              >
                <Home className="h-2 w-2 sm:h-2.5 sm:w-2.5" strokeWidth={1.5} />
              </Link>

              {cleanBreadcrumbs.map((crumb, idx) => {
                const isLast = idx === cleanBreadcrumbs.length - 1;
                return (
                  <React.Fragment key={idx}>
                    <ChevronRight className="h-1.5 w-1.5 sm:h-2 sm:w-2 text-white/30 shrink-0" strokeWidth={1.5} />
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-gold-300 transition-colors py-0.5 line-clamp-1 text-white/50"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(
                          "line-clamp-1 py-0.5",
                          isLast ? "text-white/75 font-medium" : "text-white/45"
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

            {/* Eyebrow: Tiny, subtle secondary label */}
            {eyebrow && (
              <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
                <span className="text-[8px] sm:text-[9.5px] lg:text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#D5B568]/85">
                  {eyebrow}
                </span>
                <div className="h-[1px] w-5 sm:w-8 bg-[#D5B568]/50" />
              </div>
            )}

            {/* Title in real HTML text with simple, normal, modern typography */}
            <h1 className="font-sans font-bold text-white tracking-tight text-[21px] sm:text-[25px] md:text-[30px] lg:text-[36px] xl:text-[40px] leading-[1.2] text-balance mb-1.5 sm:mb-2">
              {title === "Portal Access & Registration" ? (
                <>
                  <span className="block sm:inline">Portal Access &amp;</span>{" "}
                  <span className="block sm:inline">Registration</span>
                </>
              ) : (
                title
              )}
            </h1>

            {/* Subtitle in real HTML text: 1 compact subtle line on mobile */}
            {subtitle && (
              <p className="font-sans text-[10px] sm:text-[12.5px] lg:text-[14px] text-slate-300/75 leading-normal line-clamp-1 sm:line-clamp-none max-w-[48ch] sm:max-w-[60ch]">
                {subtitle}
              </p>
            )}

            {/* Action buttons if supplied */}
            {actions && <div className="mt-3 sm:mt-5 flex flex-wrap items-center gap-2 sm:gap-2.5">{actions}</div>}
          </div>

          {/* Right Column: Modern 3D Isometric Campus & Alumni Hub Illustration */}
          <div className="hidden lg:flex w-full lg:w-[42%] xl:w-[44%] items-center justify-center relative select-none pointer-events-none">
            {/* Soft backdrop radial bloom */}
            <div className="absolute w-72 h-72 xl:w-80 xl:h-80 rounded-full bg-gradient-to-tr from-gold-500/15 via-indigo-500/10 to-transparent blur-2xl" />

            {/* 3D Isometric Illustration */}
            <svg
              className="w-full max-w-[320px] lg:max-w-[380px] xl:max-w-[460px] h-auto max-h-[250px] drop-shadow-2xl"
              viewBox="0 0 540 380"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* 3D Golden Top / Bevel Highlight */}
                <linearGradient id="goldTopBevel" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFF2D1" />
                  <stop offset="35%" stopColor="#E5C77E" />
                  <stop offset="70%" stopColor="#D5B568" />
                  <stop offset="100%" stopColor="#9E7C30" />
                </linearGradient>

                {/* 3D Illuminated Front Facade */}
                <linearGradient id="facadeFront" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A4273" />
                  <stop offset="50%" stopColor="#1E325A" />
                  <stop offset="100%" stopColor="#13203C" />
                </linearGradient>

                {/* 3D Shaded Side Facade */}
                <linearGradient id="facadeSide" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1A2B4C" />
                  <stop offset="100%" stopColor="#0B1324" />
                </linearGradient>

                {/* 3D Glass Atrium / Portal Glow */}
                <linearGradient id="atriumLuminous" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF5DC" stopOpacity="0.95" />
                  <stop offset="40%" stopColor="#D5B568" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#B38B38" stopOpacity="0.3" />
                </linearGradient>

                {/* 3D Isometric Base Plaza Top */}
                <linearGradient id="plazaSurface" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#22365C" />
                  <stop offset="50%" stopColor="#182745" />
                  <stop offset="100%" stopColor="#0E182D" />
                </linearGradient>

                {/* 3D Pillar Cylinder Highlight */}
                <linearGradient id="pillarShine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#9C7A2E" />
                  <stop offset="40%" stopColor="#FFE8B3" />
                  <stop offset="75%" stopColor="#D5B568" />
                  <stop offset="100%" stopColor="#6E5118" />
                </linearGradient>

                {/* Glow Filter for 3D Nodes */}
                <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. TIERED 3D ISOMETRIC PLAZA BASE */}
              {/* Ground Shadow */}
              <ellipse cx="270" cy="325" rx="210" ry="40" fill="#070C17" opacity="0.6" />

              {/* Lowest Tier Facets */}
              <polygon points="270,345 470,250 270,165 70,250" fill="url(#plazaSurface)" stroke="#D5B568" strokeWidth="1.5" strokeOpacity="0.35" />
              <polygon points="70,250 270,345 270,360 70,265" fill="#13203C" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.2" />
              <polygon points="270,345 470,250 470,265 270,360" fill="#0A111F" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.2" />

              {/* Mid-Tier Elevated Plaza */}
              <polygon points="270,320 430,240 270,170 110,240" fill="#1A2B4C" stroke="#D5B568" strokeWidth="1.2" strokeOpacity="0.5" />
              <polygon points="110,240 270,320 270,330 110,250" fill="#101C33" />
              <polygon points="270,320 430,240 430,250 270,330" fill="#09101E" />

              {/* Plaza Inset Golden Grid Steps */}
              <polygon points="270,300 390,235 270,180 150,235" fill="#152442" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="175" y1="225" x2="270" y2="270" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3" />
              <line x1="365" y1="225" x2="270" y2="270" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="3 3" />

              {/* 2. LEFT 3D ACADEMIC WING */}
              <polygon points="140,195 205,160 205,230 140,265" fill="url(#facadeFront)" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.3" />
              <polygon points="140,195 205,160 240,178 175,213" fill="url(#goldTopBevel)" stroke="#D5B568" strokeWidth="0.8" />
              {/* Wing Windows */}
              <polygon points="152,212 166,204 166,228 152,236" fill="url(#atriumLuminous)" opacity="0.85" />
              <polygon points="176,198 190,190 190,214 176,222" fill="url(#atriumLuminous)" opacity="0.85" />

              {/* 3. RIGHT 3D ACADEMIC WING */}
              <polygon points="335,160 400,195 400,265 335,230" fill="url(#facadeSide)" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.3" />
              <polygon points="335,160 400,195 365,213 300,178" fill="url(#goldTopBevel)" stroke="#D5B568" strokeWidth="0.8" />
              {/* Wing Windows */}
              <polygon points="348,190 362,198 362,222 348,214" fill="url(#atriumLuminous)" opacity="0.85" />
              <polygon points="372,204 386,212 386,236 372,228" fill="url(#atriumLuminous)" opacity="0.85" />

              {/* 4. MAIN CENTRAL 3D ACADEMIC EDIFICE */}
              {/* Front Facade (Left Side of Main Block) */}
              <polygon points="195,145 270,185 270,285 195,245" fill="url(#facadeFront)" stroke="#D5B568" strokeWidth="1.2" strokeOpacity="0.5" />
              {/* Side Facade (Right Side of Main Block) */}
              <polygon points="270,185 345,145 345,245 270,285" fill="url(#facadeSide)" stroke="#D5B568" strokeWidth="1.2" strokeOpacity="0.5" />

              {/* 3D Columns / Colonnade with Rich Metallic Cylinder Shading */}
              {/* Column 1 */}
              <path d="M 215,250 L 222,254 L 222,185 L 215,181 Z" fill="url(#pillarShine)" />
              <path d="M 222,254 L 226,251 L 226,182 L 222,185 Z" fill="#0C1425" />
              {/* Column 2 */}
              <path d="M 238,262 L 245,266 L 245,197 L 238,193 Z" fill="url(#pillarShine)" />
              <path d="M 245,266 L 249,263 L 249,194 L 245,197 Z" fill="#0C1425" />
              {/* Column 3 */}
              <path d="M 291,263 L 295,266 L 295,197 L 291,194 Z" fill="url(#pillarShine)" />
              <path d="M 295,266 L 302,262 L 302,193 L 295,197 Z" fill="#0C1425" />
              {/* Column 4 */}
              <path d="M 314,251 L 318,254 L 318,185 L 314,182 Z" fill="url(#pillarShine)" />
              <path d="M 318,254 L 325,250 L 325,181 L 318,185 Z" fill="#0C1425" />

              {/* Grand Central Luminous Archway / Portal */}
              <path
                d="M 252,274 L 270,283 L 288,274 L 288,215 Q 270,198 252,215 Z"
                fill="url(#atriumLuminous)"
                stroke="#FFF2D1"
                strokeWidth="1.5"
              />
              <path d="M 270,283 L 270,205" stroke="#9E7C30" strokeWidth="1" strokeOpacity="0.6" />

              {/* 3D Angled Neoclassical Pediment (Sharp Isometric Roof Triangle) */}
              <polygon points="185,150 270,95 355,150" fill="url(#goldTopBevel)" stroke="#FFF2D1" strokeWidth="1.5" />
              <polygon points="185,150 270,95 270,105 185,160" fill="#9E7C30" />
              <polygon points="270,95 355,150 355,160 270,105" fill="#6E5118" />

              {/* Pediment Relief Seal (Poddar Monogram Crest) */}
              <circle cx="270" cy="128" r="11" fill="#101A30" stroke="#FFF2D1" strokeWidth="1.5" />
              <text
                x="270"
                y="132"
                textAnchor="middle"
                fill="#F7E4B2"
                fontSize="10"
                fontFamily="serif"
                fontWeight="bold"
              >
                P
              </text>

              {/* 5. 3D CENTRAL OBSERVATORY DOME & BEACON */}
              {/* Dome Base Drum */}
              <polygon points="252,95 270,105 288,95 270,85" fill="url(#goldTopBevel)" stroke="#FFF2D1" strokeWidth="1" />
              <polygon points="252,95 270,105 270,72 252,64" fill="url(#facadeFront)" />
              <polygon points="270,105 288,95 288,64 270,72" fill="url(#facadeSide)" />

              {/* Luminous Half-Sphere Dome */}
              <path
                d="M 248,64 C 248,38 292,38 292,64 Z"
                fill="url(#goldTopBevel)"
                stroke="#FFF2D1"
                strokeWidth="1.5"
              />

              {/* Spire with Glowing Beacon */}
              <line x1="270" y1="38" x2="270" y2="18" stroke="#FFF2D1" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="270" cy="16" r="4.5" fill="#FFF8E7" filter="url(#goldGlow)" />

              {/* 6. FLOATING 3D MODERN ACCENTS: Isometric Mortarboard & Network Constellation */}
              {/* Floating 3D Graduation Cap (Left Overhead) */}
              <g transform="translate(80, 85)">
                {/* 3D Mortarboard Top Rhombus */}
                <polygon points="32,0 64,16 32,32 0,16" fill="url(#goldTopBevel)" stroke="#FFFFFF" strokeWidth="1.2" />
                {/* Cap Base */}
                <polygon points="0,16 32,32 32,42 0,26" fill="#101A30" stroke="#D5B568" strokeWidth="1" />
                <polygon points="32,32 64,16 64,26 32,42" fill="#080E1A" stroke="#D5B568" strokeWidth="1" />
                {/* Cap Skull Under-Bevel */}
                <path d="M 18,28 Q 32,40 46,28" stroke="#D5B568" strokeWidth="1.5" fill="none" opacity="0.7" />
                {/* Gold Tassel */}
                <circle cx="32" cy="16" r="2.5" fill="#FFF" />
                <path d="M 32,16 Q 50,26 48,46" stroke="#FFF2D1" strokeWidth="1.8" fill="none" />
                <circle cx="48" cy="47" r="2.5" fill="#FFE8B3" />
              </g>

              {/* 3D Floating Alumni Network Connection Ring */}
              <ellipse
                cx="270"
                cy="190"
                rx="210"
                ry="95"
                stroke="#D5B568"
                strokeWidth="1.2"
                strokeDasharray="6 8"
                strokeOpacity="0.4"
                transform="rotate(-8 270 190)"
              />

              {/* Glowing 3D Alumni Connection Nodes */}
              <g filter="url(#goldGlow)">
                <circle cx="75" cy="205" r="5" fill="#FFF2D1" />
                <circle cx="465" cy="175" r="5" fill="#FFF2D1" />
                <circle cx="270" cy="285" r="3.5" fill="#D5B568" />
              </g>

              {/* Connecting Holographic Data Rays */}
              <line x1="75" y1="205" x2="140" y2="235" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
              <line x1="465" y1="175" x2="400" y2="215" stroke="#D5B568" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="3 3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
