import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ChevronRight, FileText, Sparkles } from "lucide-react";

import { MAIN_NAVIGATION } from "@/data/nav";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Button } from "@/components/ui/button";

interface SlugPageProps {
  params: Promise<{
    section: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const params: { section: string; slug: string }[] = [];

  for (const item of MAIN_NAVIGATION) {
    const section = item.href.replace("/", "");
    for (const sub of item.items) {
      const parts = sub.href.split("/").filter(Boolean);
      if (parts.length === 2) {
        params.push({
          section: parts[0],
          slug: parts[1],
        });
      }
    }
  }

  return params;
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { section, slug } = await params;
  const currentHref = `/${section}/${slug}`;

  // Find parent navigation item
  const parentNav = MAIN_NAVIGATION.find(
    (item) => item.href === `/${section}` || item.id === section
  );

  // Find sub-navigation item
  const subItem = parentNav?.items.find((sub) => sub.href === currentHref);

  if (!parentNav || !subItem) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* PAGE HERO BANNER */}
      <PageHero
        eyebrow={`${parentNav.title} • Official Portal`}
        title={subItem.title}
        subtitle={
          subItem.description ||
          `Dedicated portal interface for ${subItem.title} within the Poddar Alumni Association network.`
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: parentNav.title, href: parentNav.href },
          { label: subItem.title },
        ]}
        actions={
          <Link
            href={parentNav.href}
            className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-ivory text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All {parentNav.title} Modules
          </Link>
        }
      />

      {/* INNER CONTENT CONTAINER */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-4xl mx-auto space-y-10">
          <SectionHeader
            eyebrow="Active Portal Service"
            title={subItem.title}
            subtitle={subItem.description}
            align="left"
          />

          {/* Institutional Service Details Card */}
          <div className="rounded-2xl border border-line bg-card p-6 md:p-8 shadow-navy-soft space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-line">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600">
                <FileText className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-navy-950">
                  {subItem.title} Overview
                </h3>
                <span className="text-xs text-muted">
                  Managed by Poddar Alumni Relations & Secretariat
                </span>
              </div>
            </div>

            <p className="text-sm text-ink/80 leading-relaxed">
              Welcome to the official <strong>{subItem.title}</strong> module. This facility enables verified graduates, faculty, and industry partners to interact directly with the alumni database, submit updates, and coordinate with campus committees.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-ivory border border-line">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-navy-950 block">Instant Verification</span>
                  <span className="text-muted">Linked to student enrollment register</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-ivory border border-line">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-navy-950 block">Executive Moderation</span>
                  <span className="text-muted">Reviewed by Alumni Office within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-muted">
                Need guidance or document assistance for this service?
              </span>
              <Link
                href="/help-desk"
                className="inline-flex items-center justify-center h-10 px-5 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 font-semibold text-xs transition-colors shadow-sm"
              >
                Contact Alumni Secretariat
              </Link>
            </div>
          </div>

          {/* Quick links to sibling sub-items */}
          {parentNav.items.length > 1 && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted">
                Related in {parentNav.title}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {parentNav.items
                  .filter((s) => s.href !== currentHref)
                  .map((sibling) => (
                    <Link
                      key={sibling.href}
                      href={sibling.href}
                      className="p-3.5 rounded-xl border border-line bg-card hover:bg-gold-500/10 transition-colors text-xs font-semibold text-navy-950 flex items-center justify-between group"
                    >
                      <span>{sibling.title}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted group-hover:text-gold-600 transition-colors" />
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
