"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Cpu,
  GraduationCap,
  TrendingUp,
  Briefcase,
  Megaphone,
  Activity,
  Sparkles,
  ArrowRight,
  Users,
  Compass,
  Info,
} from "lucide-react";

import { DOMAIN_STATS, TOTAL_DOMAINS_SAMPLE_COUNT, SAMPLE_COUNTS_DISCLAIMER } from "@/data/domains";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { CountUp } from "@/components/motion/CountUp";
import { TiltCard } from "@/components/motion/TiltCard";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Input } from "@/components/ui/input";

export default function ExploreDomainsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const iconMap: Record<string, any> = {
    Cpu,
    GraduationCap,
    TrendingUp,
    Briefcase,
    Megaphone,
    Activity,
    Sparkles,
  };

  const filteredDomains = useMemo(() => {
    if (!searchQuery.trim()) return DOMAIN_STATS;
    const q = searchQuery.toLowerCase();
    return DOMAIN_STATS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col">
      {/* PAGE HERO */}
      <PageHero
        eyebrow="Industry Classification • Directory"
        title="Explore Alumni by Domain"
        subtitle="Discover verified graduates categorized across key professional fields. Select any sector to explore detailed cohort rosters and connect with alumni pioneers."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Directory", href: "/directory" },
          { label: "Explore by Domain" },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 max-w-7xl">
        {/* SEARCH & FILTER BAR */}
        <div className="max-w-xl mx-auto space-y-2.5">
          <div className="relative flex items-center rounded-xl border border-line bg-card shadow-xs p-1">
            <Search className="h-4.5 w-4.5 text-gold-600 ml-2.5 shrink-0" strokeWidth={2} />
            <Input
              type="text"
              placeholder="Search Domain / Industry (e.g. IT, Finance, Fashion)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-10 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-2.5 text-navy-950 placeholder:text-muted"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1.5 text-muted hover:text-navy-950 cursor-pointer"
                aria-label="Clear domain search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted px-1.5">
            <span>Showing {filteredDomains.length} of {DOMAIN_STATS.length} industry sectors</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-gold-600 font-semibold hover:underline cursor-pointer"
              >
                Reset search
              </button>
            )}
          </div>
        </div>

        {/* DOMAIN CARDS GRID */}
        {filteredDomains.length === 0 ? (
          <EmptyState
            title="No Industry Domains Match Your Search"
            description={`We couldn't find any domains matching "${searchQuery}". Try searching for technology, healthcare, banking, or education.`}
            actionLabel="View All 7 Domains"
            onAction={() => setSearchQuery("")}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {/* Total Highlighted Summary Card */}
            {!searchQuery && (
              <div className="rounded-xl border border-gold-500/40 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 p-5 text-ivory flex flex-col justify-between shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <Compass className="h-24 w-24 text-gold-500" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-gold-400" />
                    <span className="text-[11px] uppercase font-semibold tracking-wider text-gold-400">
                      Total Active Registry
                    </span>
                  </div>

                  <div className="font-serif text-[30px] sm:text-[34px] font-semibold text-ivory tracking-tight mb-1.5 tabular-nums">
                    <CountUp end={TOTAL_DOMAINS_SAMPLE_COUNT} suffix="+" />
                  </div>

                  <p className="text-[12px] sm:text-[13px] text-ivory/70 leading-relaxed">
                    Total sample verified alumni categorized across 7 core industry domains and specialized corporate sectors.
                  </p>
                </div>

                <div className="pt-4 border-t border-navy-800 flex items-center justify-between text-xs font-semibold text-gold-400">
                  <span>Explore Search Directory</span>
                  <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}

            {/* Individual Domain Cards with Tilt and Gold Glow */}
            {filteredDomains.map((dom) => {
              const Icon = iconMap[dom.iconName] || Briefcase;

              return (
                <Link
                  key={dom.id}
                  href={`/directory/domains/${dom.id}`}
                  className="block h-full cursor-pointer select-none"
                >
                  <TiltCard
                    className="h-full p-4 sm:p-5 flex flex-col justify-between transition-all hover:border-gold-500/50 hover:shadow-gold-500/10 active:scale-98 rounded-xl"
                  >
                    <div>
                      {/* Icon + Count Header */}
                      <div className="flex items-center justify-between gap-2.5 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/30 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                          <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                        </div>

                        <span className="inline-flex items-center rounded-full bg-navy-950 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-[#F3DC9C] border border-navy-800 shadow-xs tabular-nums">
                          <CountUp end={dom.sampleCount} /> Active
                        </span>
                      </div>

                      {/* Domain Title */}
                      <h3 className="font-serif text-[16px] sm:text-[17px] font-semibold text-navy-950 mb-1.5 leading-snug">
                        {dom.name}
                      </h3>

                      {/* Description */}
                      <p className="text-[12px] sm:text-[13px] text-muted leading-relaxed line-clamp-3">
                        {dom.description}
                      </p>
                    </div>

                    {/* Footer Arrow */}
                    <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-semibold text-navy-900 group-hover:text-gold-600">
                      <span>View Domain Roster</span>
                      <ArrowRight className="h-3.5 w-3.5 text-gold-600 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </TiltCard>
                </Link>
              );
            })}
          </div>
        )}

        {/* SAMPLE FIGURES DISCLAIMER */}
        <div className="flex items-center gap-2 p-3 rounded-lg bg-card border border-line text-xs text-muted max-w-2xl mx-auto shadow-xs">
          <Info className="h-4 w-4 text-gold-600 shrink-0" />
          <span>Alumni counts are sample figures for illustration only.</span>
        </div>

        {/* PROPORTIONAL BAR VISUALIZATION (CSS Only, Responsive) */}
        <div className="rounded-xl border border-line bg-card p-5 sm:p-6 shadow-xs space-y-4 max-w-4xl mx-auto">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-600 block mb-1">
              Distribution Metrics
            </span>
            <h3 className="font-serif text-[18px] sm:text-[20px] font-semibold text-navy-950">
              Proportional Domain Distribution
            </h3>
            <p className="text-xs sm:text-[13px] text-muted mt-0.5">
              Relative representation of the 260 sample verified alumni across industry disciplines.
            </p>
          </div>

          {/* Proportional Segmented Stacked Bar */}
          <div className="space-y-3">
            <div className="h-4 w-full rounded-full overflow-hidden flex bg-ivory border border-line shadow-inner">
              {DOMAIN_STATS.map((d, idx) => {
                const percentage = (d.sampleCount / TOTAL_DOMAINS_SAMPLE_COUNT) * 100;
                // Alternate styling for segments
                const bgColors = [
                  "bg-navy-900",
                  "bg-gold-500",
                  "bg-navy-700",
                  "bg-gold-600",
                  "bg-navy-800",
                  "bg-gold-400",
                  "bg-navy-950",
                ];

                return (
                  <div
                    key={d.id}
                    style={{ width: `${percentage}%` }}
                    className={`h-full ${bgColors[idx % bgColors.length]} transition-all hover:opacity-85`}
                    title={`${d.name}: ${d.sampleCount} alumni (${percentage.toFixed(1)}%)`}
                  />
                );
              })}
            </div>

            {/* Domain Proportional Percentages Legend */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2 text-xs">
              {DOMAIN_STATS.map((d, idx) => {
                const percentage = ((d.sampleCount / TOTAL_DOMAINS_SAMPLE_COUNT) * 100).toFixed(1);
                const dotColors = [
                  "bg-navy-900",
                  "bg-gold-500",
                  "bg-navy-700",
                  "bg-gold-600",
                  "bg-navy-800",
                  "bg-gold-400",
                  "bg-navy-950",
                ];

                return (
                  <div key={d.id} className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${dotColors[idx % dotColors.length]}`} />
                    <span className="font-medium text-navy-950 truncate">{d.name}</span>
                    <span className="text-muted tabular-nums ml-auto">{percentage}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

