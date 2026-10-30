"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { INITIAL_BUSINESSES } from "@/data/spotlight";
import { AlumniBusiness } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Rocket,
  Search,
  ExternalLink,
  Tag,
  Building,
  Sparkles,
  ArrowRight,
  PlusCircle,
} from "lucide-react";

export default function EntrepreneursPage() {
  const [businesses, setBusinesses] = useState<AlumniBusiness[]>(INITIAL_BUSINESSES);
  const [search, setSearch] = useState("");

  const filtered = businesses.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.founderName.toLowerCase().includes(search.toLowerCase()) ||
      b.industry.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Entrepreneurs & Startups"
        subtitle="From visionary incubation capstones to high-growth enterprises — discover ventures founded and spearheaded by Poddar alumni."
        eyebrow="Venture Ecosystem"
        backgroundImage={IMAGES.hero.campusMain.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Spotlight", href: "/spotlight" },
          { label: "Entrepreneurs & Startups", href: "/spotlight/entrepreneurs" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Metric Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Alumni Startups", value: "85+ Ventures" },
            { label: "Jobs Created", value: "3,200+ Roles" },
            { label: "Venture Sectors", value: "Multi-Industry" },
            { label: "Alumni Discount Offers", value: "100% Verified" },
          ].map((m) => (
            <div
              key={m.label}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm"
            >
              <div className="text-xs text-slate-500 font-medium">{m.label}</div>
              <div className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-slate-100 mt-0.5">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-6 shadow-md border border-slate-200/80 dark:border-slate-800 mb-10 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company name, founder, or industry..."
              className="pl-10 text-base sm:text-sm h-11 bg-slate-50 dark:bg-slate-800"
            />
          </div>

          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-navy-950 font-bold shrink-0">
            <Link href="/directory/businesses">
              <PlusCircle className="w-4 h-4 mr-2" />
              Register Your Business
            </Link>
          </Button>
        </div>

        {/* Ventures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((biz, idx) => (
            <Reveal key={biz.id} delay={idx * 0.05}>
              <Card className="border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-xl transition-all h-full flex flex-col justify-between group overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-950 text-amber-400 font-serif font-bold text-lg flex items-center justify-center shrink-0 border border-amber-500/30">
                      {biz.logoPlaceholder || biz.name.substring(0, 2).toUpperCase()}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {biz.industry}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 transition-colors">
                    {biz.name}
                  </h3>

                  <div className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
                    Founded by {biz.founderName} (Batch of {biz.batch})
                  </div>

                  <div className="text-xs text-slate-500 mt-0.5">
                    Est. {biz.foundedYear} • {biz.city}
                  </div>

                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                    {biz.description}
                  </p>

                  {biz.discountOffer && (
                    <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                      <Tag className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{biz.discountOffer}</span>
                    </div>
                  )}
                </CardContent>

                <div className="px-6 pb-6 pt-0 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Verified Alumni Venture</span>
                  {biz.website && (
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-600 hover:text-amber-700 font-semibold flex items-center gap-1"
                    >
                      Visit Website
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

