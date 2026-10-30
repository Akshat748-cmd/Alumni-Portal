"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  MapPin,
  Briefcase,
  GraduationCap,
  ExternalLink,
  Send,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Megaphone,
  Activity,
  Sparkles,
  Info,
} from "lucide-react";
import { toast } from "sonner";

import { usePortalStore } from "@/store/portal";
import { AlumniProfile, DomainStat } from "@/data/types";
import { ResponsiveTable, ColumnDef } from "@/components/common/ResponsiveTable";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { ProfileModal } from "@/components/common/ProfileModal";
import { EmptyState } from "@/components/common/EmptyState";
import { CountUp } from "@/components/motion/CountUp";
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

interface DomainDetailClientProps {
  domainData: DomainStat;
}

export function DomainDetailClient({ domainData }: DomainDetailClientProps) {
  const { alumni } = usePortalStore();

  const [tableSearch, setTableSearch] = useState("");
  const [selectedProfile, setSelectedProfile] = useState<AlumniProfile | null>(null);
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});

  const iconMap: Record<string, any> = {
    Cpu,
    GraduationCap,
    TrendingUp,
    Briefcase,
    Megaphone,
    Activity,
    Sparkles,
  };
  const DomainIcon = iconMap[domainData.iconName] || Briefcase;

  // Filter approved alumni for this domain
  const domainAlumni = useMemo(() => {
    return alumni.filter(
      (a) => a.status === "approved" && a.domain === domainData.name
    );
  }, [alumni, domainData.name]);

  // Live in-table search
  const filteredAlumni = useMemo(() => {
    if (!tableSearch.trim()) return domainAlumni;
    const q = tableSearch.toLowerCase();
    return domainAlumni.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.company.toLowerCase().includes(q) ||
        a.designation.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.batch.toString().includes(q)
    );
  }, [domainAlumni, tableSearch]);

  const handleConnect = (id: string, name: string) => {
    setConnectedIds((prev) => ({ ...prev, [id]: true }));
    toast.success(`Connection request sent to ${name}!`);
  };

  // EXACT COLUMNS: Name | Batch | Company/Business | Designation | City | LinkedIn | Connect
  const columns: ColumnDef<AlumniProfile>[] = [
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setSelectedProfile(row)}
        >
          <AvatarInitials name={row.name} src={row.avatarUrl} size="md" />
          <div>
            <div className="font-bold text-navy-950 group-hover:text-gold-600 transition-colors">
              {row.name}
            </div>
            <div className="text-xs text-muted font-normal">{row.course}</div>
          </div>
        </div>
      ),
    },
    {
      key: "batch",
      header: "Batch",
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-navy-900 bg-ivory px-2 py-1 rounded-md border border-line">
          {row.batch}
        </span>
      ),
    },
    {
      key: "company",
      header: "Company / Business",
      render: (row) => (
        <span className="font-semibold text-navy-950 text-xs sm:text-sm">
          {row.company}
        </span>
      ),
    },
    {
      key: "designation",
      header: "Designation",
      render: (row) => (
        <span className="text-xs text-gold-700 font-medium">
          {row.designation}
        </span>
      ),
    },
    {
      key: "city",
      header: "City",
      render: (row) => <span className="text-xs text-ink">{row.city}</span>,
    },
    {
      key: "linkedIn",
      header: "LinkedIn",
      render: (row) => (
        <a
          href={row.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-card hover:bg-gold-500/15 text-[#0077b5] transition-colors"
          aria-label={`LinkedIn profile for ${row.name}`}
          title="Open LinkedIn"
        >
          <LinkedInIcon className="h-4 w-4" />
        </a>
      ),
    },
    {
      key: "connect",
      header: "Connect",
      render: (row) => {
        const isConnected = !!connectedIds[row.id];
        return (
          <Button
            size="sm"
            disabled={isConnected}
            onClick={() => handleConnect(row.id, row.name)}
            className={`w-full sm:w-auto h-8 px-3.5 rounded-lg text-xs font-semibold shadow-xs transition-all ${
              isConnected
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                : "bg-navy-900 hover:bg-navy-800 text-gold-300"
            }`}
          >
            {isConnected ? "Request Sent" : "Connect"}
          </Button>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 max-w-7xl space-y-8">
      {/* DOMAIN SUMMARY HEADER CARD */}
      <div className="rounded-2xl border border-line bg-card p-6 md:p-8 shadow-navy-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600 border border-gold-500/30 shrink-0">
            <DomainIcon className="h-8 w-8" strokeWidth={1.75} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                Industry Domain Cohort
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
              {domainData.name}
            </h2>
            <p className="text-xs text-muted mt-1 max-w-xl">
              {domainData.description}
            </p>
          </div>
        </div>

        {/* Counter Badge */}
        <div className="rounded-xl bg-ivory border border-line p-4 text-center shrink-0 w-full sm:w-auto">
          <div className="font-serif text-3xl font-bold text-navy-950 leading-none">
            <CountUp end={domainData.sampleCount} />
          </div>
          <span className="text-[11px] uppercase font-bold text-muted tracking-wider block mt-1">
            Registered Alumni
          </span>
        </div>
      </div>

      {/* SEARCH AND ROSTER TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* In-table Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted" />
          <Input
            type="text"
            placeholder={`Search ${domainData.name} alumni...`}
            value={tableSearch}
            onChange={(e) => setTableSearch(e.target.value)}
            className="pl-10 h-10 border-line rounded-xl text-xs bg-card"
          />
          {tableSearch && (
            <button
              onClick={() => setTableSearch("")}
              className="absolute right-3 top-2.5 text-muted hover:text-navy-950"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="text-xs text-muted font-mono self-end sm:self-auto">
          Displaying {filteredAlumni.length} verified {domainData.name} profile{filteredAlumni.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* STAGGERED REVEAL RESPONSIVE TABLE */}
      <Reveal>
        {filteredAlumni.length === 0 ? (
          <EmptyState
            title="No Matching Alumni Found in this Domain"
            description={`No alumni profiles match "${tableSearch}". Clear your search query to view the full ${domainData.name} cohort.`}
            actionLabel="Reset Search"
            onAction={() => setTableSearch("")}
          />
        ) : (
          <ResponsiveTable
            columns={columns}
            data={filteredAlumni}
            keyExtractor={(row) => row.id}
            emptyMessage="No profiles available in this domain yet."
          />
        )}
      </Reveal>

      {/* MANDATORY NOTICE (Per Master Brief) */}
      <div className="flex items-center gap-2.5 p-4 rounded-xl bg-ivory border border-line text-xs text-muted max-w-2xl mx-auto shadow-xs">
        <Info className="h-4 w-4 text-gold-600 shrink-0" />
        <span>
          Showing profiles of verified alumni. More profiles appear as alumni join and get approved.
        </span>
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

