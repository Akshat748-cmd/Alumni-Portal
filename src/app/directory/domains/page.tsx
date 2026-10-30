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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12 max-w-7xl">
        {/* SEARCH & FILTER BAR */}
        <div className="max-w-xl mx-auto space-y-3">
          <div className="relative flex items-center rounded-2xl border border-line bg-card shadow-navy-soft p-1.5">
            <Search className="h-5 w-5 text-gold-600 ml-3 shrink-0" strokeWidth={2} />
            <Input
              type="text"
              placeholder="Search Domain / Industry (e.g. IT, Finance, Fashion)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 h-11 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-3 text-navy-950 placeholder:text-muted"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-2 text-muted hover:text-navy-950 cursor-pointer"
                aria-label="Clear domain search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-muted px-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {/* Total Highlighted Summary Card */}
            {!searchQuery && (
              <div className="rounded-xl border border-gold-500/40 bg-gradient-to-br from-navy-900 via-navy-950 to-navy-900 p-6 text-ivory flex flex-col justify-between shadow-navy-hover relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Compass className="h-28 w-28 text-gold-500" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-2 w-2 rounded-full bg-gold-400" />
                    <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
                      Total Active Registry
                    </span>
                  </div>

                  <div className="font-serif text-4xl sm:text-5xl font-bold text-ivory tracking-tight mb-2">
                    <CountUp end={TOTAL_DOMAINS_SAMPLE_COUNT} suffix="+" />
                  </div>

                  <p className="text-xs text-ivory/70 leading-relaxed">
                    Total sample verified alumni categorized across 7 core industry domains and specialized corporate sectors.
                  </p>
                </div>

                <div className="pt-6 border-t border-navy-800 flex items-center justify-between text-xs font-bold text-gold-400">
                  <span>Explore Search Directory</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
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
                    className="h-full p-6 flex flex-col justify-between transition-all hover:border-gold-500/50 hover:shadow-gold-500/10 active:scale-98"
                  >
                    <div>
                      {/* Icon + Count Header */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 border border-gold-500/30 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                          <Icon className="h-6 w-6" strokeWidth={1.75} />
                        </div>

                        <span className="inline-flex items-center rounded-full bg-navy-950 px-2.5 py-0.5 text-xs font-semibold text-[#F3DC9C] border border-navy-800 shadow-xs">
                          <CountUp end={dom.sampleCount} /> Active
                        </span>
                      </div>

                      {/* Domain Title */}
                      <h3 className="font-serif text-lg font-bold text-navy-950 mb-2 leading-snug">
                        {dom.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-muted leading-relaxed line-clamp-3">
                        {dom.description}
                      </p>
                    </div>

                    {/* Footer Arrow */}
                    <div className="mt-6 pt-3.5 border-t border-line/60 flex items-center justify-between text-xs font-bold text-navy-900 group-hover:text-gold-600">
                      <span>View Domain Roster</span>
                      <ArrowRight className="h-4 w-4 text-gold-600 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </TiltCard>
                </Link>
              );
            })}
          </div>
        )}

        {/* SAMPLE FIGURES DISCLAIMER */}
        <div className="flex items-center gap-2 p-3.5 rounded-xl bg-card border border-line text-xs text-muted max-w-2xl mx-auto shadow-xs">
          <Info className="h-4 w-4 text-gold-600 shrink-0" />
          <span>Alumni counts are sample figures for illustration only.</span>
        </div>

        {/* PROPORTIONAL BAR VISUALIZATION (CSS Only, Responsive) */}
        <div className="rounded-2xl border border-line bg-card p-6 md:p-8 shadow-navy-soft space-y-6 max-w-4xl mx-auto">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-1">
              Distribution Metrics
            </span>
            <h3 className="font-serif text-xl font-bold text-navy-950">
              Proportional Domain Distribution
            </h3>
            <p className="text-xs text-muted mt-1">
              Relative representation of the 260 sample verified alumni across industry disciplines.
            </p>
          </div>

          {/* Proportional Segmented Stacked Bar */}
          <div className="space-y-4">
            <div className="h-5 w-full rounded-full overflow-hidden flex bg-ivory border border-line shadow-inner">
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
                    <span className="text-muted font-mono ml-auto">{percentage}%</span>
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

