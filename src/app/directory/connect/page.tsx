"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Send,
  ShieldCheck,
  Search,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Briefcase,
  GraduationCap,
  MapPin,
  Lock,
  Globe,
} from "lucide-react";
import { toast } from "sonner";

import { usePortalStore } from "@/store/portal";
import { AlumniProfile } from "@/data/types";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { ProfileModal } from "@/components/common/ProfileModal";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// LinkedIn Icon
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .88.72 1.6 1.61 1.6.88 0 1.6-.72 1.6-1.6 0-.89-.72-1.61-1.6-1.61Z" />
    </svg>
  );
}

export default function ConnectPage() {
  const { alumni } = usePortalStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<AlumniProfile | null>(null);
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});

  // Approved profiles only
  const approvedAlumni = useMemo(
    () => alumni.filter((a) => a.status === "approved"),
    [alumni]
  );

  const filteredAlumni = useMemo(() => {
    if (!searchQuery.trim()) return approvedAlumni;
    const q = searchQuery.toLowerCase();
    return approvedAlumni.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q) ||
        a.designation.toLowerCase().includes(q) ||
        a.domain.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q)
    );
  }, [approvedAlumni, searchQuery]);

  const handleConnect = (id: string, name: string) => {
    setConnectedIds((prev) => ({ ...prev, [id]: true }));
    toast.success(`Connection request sent to ${name}!`);
  };

  // 3-step connecting infographic steps
  const connectSteps = [
    {
      step: "01",
      title: "Discover Alumni",
      subtitle: "Target by Domain & Skill",
      description:
        "Filter by graduation batch, industry domain, corporate designation, or location to discover peers matching your goals.",
      icon: Search,
    },
    {
      step: "02",
      title: "Send Portal Intro",
      subtitle: "One-Click Request",
      description:
        "Tap 'Connect' to transmit an official greeting and introductory message through the alumni network verification gateway.",
      icon: Send,
    },
    {
      step: "03",
      title: "Engage Professionally",
      subtitle: "LinkedIn & Collaboration",
      description:
        "Transition conversations to LinkedIn, schedule 1-on-1 career clinics, or explore commercial business alliances.",
      icon: Globe,
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* PAGE HERO */}
      <PageHero
        eyebrow="Global Networking • Directory"
        title="Connect With Fellow Alumni"
        subtitle="Forge professional relationships, schedule mentorship sessions, and exchange career opportunities with verified graduates across the world."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Directory", href: "/directory" },
          { label: "Connect" },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 max-w-7xl space-y-16">
        {/* ========================================================
            1. 3-STEP ANIMATED INFOGRAPHIC (Horizontal desktop, vertical mobile)
        ======================================================== */}
        <section className="rounded-2xl border border-line bg-card p-6 md:p-10 shadow-navy-soft">
          <SectionHeader
            eyebrow="Structured Networking"
            title="How Connecting Works"
            subtitle="A transparent three-step protocol designed to foster professional etiquette and protect alumni privacy."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mt-8">
            {connectSteps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.step}
                  className="relative flex flex-col items-center md:items-start text-center md:text-left p-6 rounded-xl bg-ivory/60 border border-line group hover:border-gold-500/40 transition-colors"
                >
                  {/* Step Monogram Header */}
                  <div className="flex items-center justify-between w-full mb-4">
                    <span className="font-mono text-2xl font-bold text-gold-600">
                      {s.step}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 text-gold-600 border border-gold-500/30 group-hover:bg-navy-900 group-hover:text-gold-300 transition-colors">
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-navy-950 mb-1">
                    {s.title}
                  </h3>
                  <span className="text-xs font-semibold text-gold-700 block mb-2.5">
                    {s.subtitle}
                  </span>
                  <p className="text-xs text-muted leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            2. PRIVACY REASSURANCE STRIP
        ======================================================== */}
        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-navy-950 to-navy-900 text-ivory border border-navy-800 shadow-md">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400 border border-gold-500/40">
            <Lock className="h-5 w-5" />
          </div>
          <div className="text-xs text-ivory/80 text-center sm:text-left">
            <strong className="text-gold-300 font-semibold block sm:inline mr-1">
              Privacy Guarantee:
            </strong>
            Only verified and approved alumni profiles are visible in the network directory. Direct personal contact details remain protected and are disclosed solely via mutual consent.
          </div>
        </div>

        {/* ========================================================
            3. APPROVED ALUMNI ROSTER GRID
        ======================================================== */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <SectionHeader
                eyebrow="Verified Registry"
                title="Active Alumni Open to Connect"
                subtitle="Reach out to senior leaders, domain founders, and peer classmates."
                align="left"
                className="mb-0"
              />
            </div>

            {/* Quick Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted" />
              <Input
                placeholder="Search alumni by name, org, or domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 border-line rounded-xl text-xs bg-card"
              />
            </div>
          </div>

          <Reveal staggerChildren={0.06} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredAlumni.slice(0, 16).map((person) => {
              const isConnected = !!connectedIds[person.id];

              return (
                <RevealItem key={person.id}>
                  <div className="flex flex-col justify-between h-full rounded-xl border border-line bg-card p-5 shadow-navy-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-navy-hover hover:border-gold-500/40">
                    <div>
                      {/* Avatar + Basic Details */}
                      <div
                        className="flex items-start gap-3 mb-3 cursor-pointer"
                        onClick={() => setSelectedProfile(person)}
                      >
                        <AvatarInitials name={person.name} src={person.avatarUrl} size="md" />
                        <div className="min-w-0 flex-1">
                          <h4 className="font-serif text-sm font-bold text-navy-950 truncate hover:text-gold-600 transition-colors">
                            {person.name}
                          </h4>
                          <p className="text-[11px] text-gold-700 font-semibold truncate">
                            {person.designation}
                          </p>
                          <p className="text-[11px] text-muted truncate">
                            {person.company}
                          </p>
                        </div>
                      </div>

                      {/* Domain and Batch */}
                      <div className="flex items-center justify-between gap-2 text-[11px] text-muted pt-2 border-t border-line/60 mb-3">
                        <span className="font-mono">Class of {person.batch}</span>
                        <span className="truncate max-w-[120px] text-navy-900 font-medium">
                          {person.city}
                        </span>
                      </div>

                      <span className="inline-block rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[10px] font-bold text-gold-700 border border-gold-500/30 truncate max-w-full">
                        {person.domain}
                      </span>
                    </div>

                    {/* Social and Connect Actions */}
                    <div className="mt-4 pt-3 border-t border-line flex items-center justify-between gap-2">
                      <a
                        href={person.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-card hover:bg-gold-500/15 text-[#0077b5] transition-colors"
                        aria-label={`LinkedIn for ${person.name}`}
                        title="LinkedIn Profile"
                      >
                        <LinkedInIcon className="h-4 w-4" />
                      </a>

                      <Button
                        size="sm"
                        disabled={isConnected}
                        onClick={() => handleConnect(person.id, person.name)}
                        className={`flex-1 h-8 px-3 rounded-lg text-xs font-semibold shadow-xs transition-all ${
                          isConnected
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                            : "bg-navy-900 hover:bg-navy-800 text-gold-300"
                        }`}
                      >
                        {isConnected ? "Request Sent" : "Connect"}
                      </Button>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </Reveal>
        </section>
      </div>

      {/* PROFILE DETAIL MODAL */}
      <ProfileModal
        profile={selectedProfile}
        isOpen={!!selectedProfile}
        onClose={() => setSelectedProfile(null)}
        isConnected={selectedProfile ? !!connectedIds[selectedProfile.id] : false}
        onConnect={(id) => {
          if (selectedProfile) {
            handleConnect(selectedProfile.id, selectedProfile.name);
          }
        }}
      />
    </div>
  );
}
