import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Search,
  ExternalLink,
  Cpu,
  GraduationCap,
  TrendingUp,
  Briefcase,
  Megaphone,
  Activity,
  Sparkles,
  Info,
} from "lucide-react";

import { DOMAIN_STATS } from "@/data/domains";
import { INITIAL_ALUMNI } from "@/data/alumni";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DomainDetailClient } from "./DomainDetailClient";

interface DomainPageProps {
  params: Promise<{
    domain: string;
  }>;
}

export async function generateStaticParams() {
  return DOMAIN_STATS.map((d) => ({
    domain: d.id,
  }));
}

export default async function DomainDetailPage({ params }: DomainPageProps) {
  const { domain } = await params;

  // Match domain by id or slugified name
  const domainData = DOMAIN_STATS.find(
    (d) =>
      d.id === domain ||
      d.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === domain.toLowerCase()
  );

  if (!domainData) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* PAGE HERO */}
      <PageHero
        eyebrow={`Industry Vertical • ${domainData.name}`}
        title={`${domainData.name} Alumni`}
        subtitle={`${domainData.description} — Connecting verified leaders and graduates across this specialization.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Directory", href: "/directory" },
          { label: "Explore by Domain", href: "/directory/domains" },
          { label: domainData.name },
        ]}
        actions={
          <Link
            href="/directory/domains"
            className="inline-flex items-center gap-1.5 px-4 h-10 rounded-xl border border-navy-700 bg-navy-900/60 hover:bg-navy-800 text-ivory text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Domains
          </Link>
        }
      />

      {/* CLIENT INTERACTIVE TABLE WRAPPER */}
      <DomainDetailClient domainData={domainData} />
    </div>
  );
}

