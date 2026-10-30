import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";

import { MAIN_NAVIGATION } from "@/data/nav";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";

interface SectionPageProps {
  params: Promise<{
    section: string;
  }>;
}

export async function generateStaticParams() {
  return MAIN_NAVIGATION.map((item) => ({
    section: item.href.replace("/", ""),
  }));
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params;
  const sectionHref = `/${section}`;

  const navItem = MAIN_NAVIGATION.find(
    (item) => item.href === sectionHref || item.id === section
  );

  if (!navItem) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* PAGE HERO */}
      <PageHero
        eyebrow={`Section 0${navItem.order} • Institutional Portal`}
        title={navItem.title}
        subtitle={navItem.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: navItem.title },
        ]}
      />

      {/* SUB-SECTIONS CONTENT GRID */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <SectionHeader
          eyebrow="Explore Directory & Features"
          title={`${navItem.title} Modules`}
          subtitle="Select a specialized sub-module below or explore recent updates from the alumni association."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {navItem.items.map((sub, idx) => (
            <Link
              key={sub.href}
              href={sub.href}
              className="group flex flex-col justify-between rounded-xl border border-line bg-card p-6 shadow-navy-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-navy-hover hover:border-gold-500/40 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-900 to-gold-500 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                <span className="text-xs font-mono font-bold text-gold-600 block mb-2">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-lg font-bold text-navy-950 group-hover:text-gold-600 transition-colors mb-2">
                  {sub.title}
                </h3>
                {sub.description && (
                  <p className="text-sm text-muted leading-relaxed">
                    {sub.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-line/60 flex items-center justify-between text-xs font-bold text-navy-900 group-hover:text-gold-600">
                <span>Access Module</span>
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

