"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  X,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  GraduationCap,
  Briefcase,
  MapPin,
  ExternalLink,
  ChevronDown,
  UserCheck,
  Send,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

import { usePortalStore } from "@/store/portal";
import { AlumniProfile, DomainCategory } from "@/data/types";
import { DOMAIN_STATS } from "@/data/domains";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ResponsiveTable, ColumnDef } from "@/components/common/ResponsiveTable";
import { FilterDrawer } from "@/components/common/FilterDrawer";
import { StatusBadge } from "@/components/common/StatusBadge";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { EmptyState } from "@/components/common/EmptyState";
import { ProfileModal } from "@/components/common/ProfileModal";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

// Official LinkedIn Icon
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .88.72 1.6 1.61 1.6.88 0 1.6-.72 1.6-1.6 0-.89-.72-1.61-1.6-1.61Z" />
    </svg>
  );
}

export default function SearchAlumniPage() {
  const { alumni } = usePortalStore();

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [selectedDomain, setSelectedDomain] = useState<string>("all");
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedExpertise, setSelectedExpertise] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "batch-desc" | "batch-asc">("batch-desc");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [visibleCount, setVisibleCount] = useState(12);
  const [isLoading, setIsLoading] = useState(true);

  // Dialog and Connect State
  const [selectedProfile, setSelectedProfile] = useState<AlumniProfile | null>(null);
  const [connectedIds, setConnectedIds] = useState<Record<string, boolean>>({});

  // Debounce search term by 250ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Initial skeleton load simulation (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Approved profiles only
  const approvedAlumni = useMemo(
    () => alumni.filter((a) => a.status === "approved"),
    [alumni]
  );

  // Unique filter option values derived from data
  const batches = useMemo(() => {
    const set = new Set(approvedAlumni.map((a) => a.batch));
    return Array.from(set).sort((a, b) => b - a);
  }, [approvedAlumni]);

  const courses = useMemo(() => {
    const set = new Set(approvedAlumni.map((a) => a.course));
    return Array.from(set).sort();
  }, [approvedAlumni]);

  const cities = useMemo(() => {
    const set = new Set(approvedAlumni.map((a) => a.city));
    return Array.from(set).sort();
  }, [approvedAlumni]);

  const expertiseList = useMemo(() => {
    const set = new Set<string>();
    approvedAlumni.forEach((a) => a.expertiseTags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [approvedAlumni]);

  // Combined AND-logic filtering
  const filteredAlumni = useMemo(() => {
    return approvedAlumni.filter((person) => {
      // Free text search matching Name, Company, Designation, City
      if (debouncedSearch.trim() !== "") {
        const query = debouncedSearch.toLowerCase();
        const matchesName = person.name.toLowerCase().includes(query);
        const matchesCompany = person.company.toLowerCase().includes(query);
        const matchesDesignation = person.designation.toLowerCase().includes(query);
        const matchesCity = person.city.toLowerCase().includes(query);
        if (!matchesName && !matchesCompany && !matchesDesignation && !matchesCity) {
          return false;
        }
      }

      // Batch filter
      if (selectedBatch !== "all" && person.batch !== Number(selectedBatch)) {
        return false;
      }

      // Domain filter
      if (selectedDomain !== "all" && person.domain !== selectedDomain) {
        return false;
      }

      // Course filter
      if (selectedCourse !== "all" && person.course !== selectedCourse) {
        return false;
      }

      // City filter
      if (selectedCity !== "all" && person.city !== selectedCity) {
        return false;
      }

      // Expertise filter
      if (
        selectedExpertise !== "all" &&
        !person.expertiseTags?.includes(selectedExpertise)
      ) {
        return false;
      }

      return true;
    });
  }, [
    approvedAlumni,
    debouncedSearch,
    selectedBatch,
    selectedDomain,
    selectedCourse,
    selectedCity,
    selectedExpertise,
  ]);

  // Sorting
  const sortedAlumni = useMemo(() => {
    return [...filteredAlumni].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "batch-asc") {
        return a.batch - b.batch;
      }
      return b.batch - a.batch; // batch-desc
    });
  }, [filteredAlumni, sortBy]);

  // Active filter count for badge
  const activeFilters = useMemo(() => {
    const list: { key: string; label: string; onClear: () => void }[] = [];
    if (selectedDomain !== "all") {
      list.push({
        key: "domain",
        label: `Domain: ${selectedDomain}`,
        onClear: () => setSelectedDomain("all"),
      });
    }
    if (selectedBatch !== "all") {
      list.push({
        key: "batch",
        label: `Batch: ${selectedBatch}`,
        onClear: () => setSelectedBatch("all"),
      });
    }
    if (selectedCourse !== "all") {
      list.push({
        key: "course",
        label: `Course: ${selectedCourse}`,
        onClear: () => setSelectedCourse("all"),
      });
    }
    if (selectedCity !== "all") {
      list.push({
        key: "city",
        label: `City: ${selectedCity}`,
        onClear: () => setSelectedCity("all"),
      });
    }
    if (selectedExpertise !== "all") {
      list.push({
        key: "expertise",
        label: `Expertise: ${selectedExpertise}`,
        onClear: () => setSelectedExpertise("all"),
      });
    }
    if (searchTerm.trim() !== "") {
      list.push({
        key: "search",
        label: `Query: "${searchTerm}"`,
        onClear: () => setSearchTerm(""),
      });
    }
    return list;
  }, [
    selectedDomain,
    selectedBatch,
    selectedCourse,
    selectedCity,
    selectedExpertise,
    searchTerm,
  ]);

  const clearAllFilters = () => {
    setSelectedBatch("all");
    setSelectedDomain("all");
    setSelectedCourse("all");
    setSelectedCity("all");
    setSelectedExpertise("all");
    setSearchTerm("");
    setDebouncedSearch("");
  };

  const handleConnect = (id: string, name: string) => {
    setConnectedIds((prev) => ({ ...prev, [id]: true }));
    toast.success(`Connection request sent to ${name}!`);
  };

  // Table columns definition for Table View Mode
  const tableColumns: ColumnDef<AlumniProfile>[] = [
    {
      key: "name",
      header: "Alumnus / Batch",
      render: (row) => (
        <div
          className="flex items-center gap-3 cursor-pointer group/item"
          onClick={() => setSelectedProfile(row)}
        >
          <AvatarInitials name={row.name} src={row.avatarUrl} size="md" />
          <div>
            <div className="font-bold text-navy-950 group-hover/item:text-gold-600 transition-colors">
              {row.name}
            </div>
            <div className="text-xs text-muted">
              Class of {row.batch} • {row.course}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "company",
      header: "Company & Designation",
      render: (row) => (
        <div>
          <div className="font-semibold text-navy-900">{row.designation}</div>
          <div className="text-xs text-muted">{row.company}</div>
        </div>
      ),
    },
    {
      key: "domain",
      header: "Domain",
      render: (row) => (
        <span className="inline-block rounded-full bg-gold-500/15 px-2.5 py-0.5 text-xs font-semibold text-gold-700 border border-gold-500/30">
          {row.domain}
        </span>
      ),
    },
    {
      key: "city",
      header: "City",
      render: (row) => <span className="text-xs font-medium text-ink">{row.city}</span>,
    },
    {
      key: "actions",
      header: "Action",
      render: (row) => {
        const isConnected = !!connectedIds[row.id];
        return (
          <div className="flex items-center gap-2 justify-end md:justify-start">
            <a
              href={row.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-card hover:bg-gold-500/15 text-[#0077b5] transition-colors"
              aria-label={`LinkedIn profile for ${row.name}`}
              title="LinkedIn Profile"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>

            <Button
              size="sm"
              disabled={isConnected}
              onClick={() => handleConnect(row.id, row.name)}
              className={`h-8 px-3 rounded-lg text-xs font-semibold shadow-xs ${
                isConnected
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                  : "bg-navy-900 hover:bg-navy-800 text-gold-300"
              }`}
            >
              {isConnected ? "Request Sent" : "Connect"}
            </Button>
          </div>
        );
      },
    },
  ];

  const displayedAlumni = sortedAlumni.slice(0, visibleCount);

  return (
    <div className="flex-1 flex flex-col">
      {/* PAGE HERO */}
      <PageHero
        eyebrow="Alumni Directory • Flagship Feature"
        title="Search Verified Alumni Directory"
        subtitle="Explore our global registry of verified graduates. Filter across 47+ leaders by graduation batch, industry domain, course, expertise, and city."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Directory", href: "/directory" },
          { label: "Search Alumni" },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* MAIN SEARCH & TOP FILTER CONTROLS */}
        <div className="max-w-7xl mx-auto space-y-6">
          {/* SEARCH BAR (Large with clear button) */}
          <div className="relative flex items-center rounded-2xl border border-line bg-card shadow-navy-soft p-2 sm:p-2.5">
            <Search className="h-5 w-5 text-gold-600 ml-3 shrink-0" strokeWidth={2} />
            <Input
              type="text"
              placeholder="Search alumni by name, company, designation, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-12 border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 px-3 text-navy-950 placeholder:text-muted"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="p-2 rounded-lg text-muted hover:text-navy-950 transition-colors mr-1 cursor-pointer"
                aria-label="Clear search input"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* FILTER TOOLBAR: Result Count, Active Filter Chips, Sort & View Mode */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
            {/* Left: Result count & Mobile Drawer Trigger */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-navy-950 font-mono">
                Showing {Math.min(displayedAlumni.length, sortedAlumni.length)} of {sortedAlumni.length} verified alumni
              </span>

              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <FilterDrawer
                  title="Filter Alumni"
                  activeFilterCount={activeFilters.length}
                  onReset={clearAllFilters}
                  onApply={() => toast.success("Filters applied")}
                >
                  <div className="space-y-4">
                    {/* Domain */}
                    <div>
                      <Label className="text-xs font-bold text-navy-950 uppercase mb-1.5 block">
                        Industry Domain
                      </Label>
                      <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className="w-full h-11 px-3 rounded-lg border border-line bg-card text-sm text-ink"
                      >
                        <option value="all">All Domains ({approvedAlumni.length})</option>
                        {DOMAIN_STATS.map((d) => (
                          <option key={d.id} value={d.name}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Batch */}
                    <div>
                      <Label className="text-xs font-bold text-navy-950 uppercase mb-1.5 block">
                        Graduation Batch
                      </Label>
                      <select
                        value={selectedBatch}
                        onChange={(e) => setSelectedBatch(e.target.value)}
                        className="w-full h-11 px-3 rounded-lg border border-line bg-card text-sm text-ink"
                      >
                        <option value="all">All Batches (2005 - 2024)</option>
                        {batches.map((b) => (
                          <option key={b} value={b.toString()}>
                            Class of {b}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Course */}
                    <div>
                      <Label className="text-xs font-bold text-navy-950 uppercase mb-1.5 block">
                        Degree / Course
                      </Label>
                      <select
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                        className="w-full h-11 px-3 rounded-lg border border-line bg-card text-sm text-ink"
                      >
                        <option value="all">All Academic Programs</option>
                        {courses.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* City */}
                    <div>
                      <Label className="text-xs font-bold text-navy-950 uppercase mb-1.5 block">
                        City / Region
                      </Label>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="w-full h-11 px-3 rounded-lg border border-line bg-card text-sm text-ink"
                      >
                        <option value="all">All Cities</option>
                        {cities.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Expertise */}
                    <div>
                      <Label className="text-xs font-bold text-navy-950 uppercase mb-1.5 block">
                        Expertise Tag
                      </Label>
                      <select
                        value={selectedExpertise}
                        onChange={(e) => setSelectedExpertise(e.target.value)}
                        className="w-full h-11 px-3 rounded-lg border border-line bg-card text-sm text-ink"
                      >
                        <option value="all">All Specializations</option>
                        {expertiseList.map((tag) => (
                          <option key={tag} value={tag}>
                            #{tag}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </FilterDrawer>
              </div>
            </div>

            {/* Right: Sort controls & View Toggle */}
            <div className="flex items-center gap-3 self-end lg:self-auto">
              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-10 px-3 rounded-xl border border-line bg-card text-xs font-semibold text-navy-950 shadow-sm cursor-pointer"
                >
                  <option value="batch-desc">Batch: Newest First</option>
                  <option value="batch-asc">Batch: Oldest First</option>
                  <option value="name">Name (A–Z)</option>
                </select>
              </div>

              {/* View Mode Toggle (Card / Table) */}
              <div className="flex items-center rounded-xl border border-line bg-card p-1 shadow-sm">
                <button
                  onClick={() => setViewMode("card")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "card"
                      ? "bg-navy-900 text-gold-300"
                      : "text-muted hover:text-navy-950"
                  }`}
                  aria-label="Grid card view"
                  title="Card View"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "table"
                      ? "bg-navy-900 text-gold-300"
                      : "text-muted hover:text-navy-950"
                  }`}
                  aria-label="Table view"
                  title="Table View"
                >
                  <TableIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ACTIVE FILTER CHIPS */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-muted font-medium">Active filters:</span>
              {activeFilters.map((f) => (
                <span
                  key={f.key}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 px-3 py-1 text-xs font-semibold text-navy-950"
                >
                  {f.label}
                  <button
                    onClick={f.onClear}
                    className="hover:text-danger cursor-pointer ml-0.5"
                    aria-label={`Remove filter ${f.label}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-xs text-danger hover:underline font-semibold ml-2 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* MAIN DESKTOP FILTER BAR & RESULTS LAYOUT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start pt-2">
            {/* DESKTOP STICKY FILTER SIDEBAR (lg and up) */}
            <div className="hidden lg:block lg:col-span-1 rounded-2xl border border-line bg-card p-5 shadow-navy-soft sticky top-24 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-gold-600" />
                  <span className="font-serif font-bold text-navy-950 text-sm">Filter Criteria</span>
                </div>
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-danger hover:underline font-medium cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Industry Domain */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                  Industry Domain
                </Label>
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-line bg-card text-xs text-ink focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="all">All Domains ({approvedAlumni.length})</option>
                  {DOMAIN_STATS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.sampleCount})
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                  Graduation Batch
                </Label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-line bg-card text-xs text-ink focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="all">All Batches (2005 - 2024)</option>
                  {batches.map((b) => (
                    <option key={b} value={b.toString()}>
                      Class of {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Course */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                  Course / Degree
                </Label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-line bg-card text-xs text-ink focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="all">All Academic Programs</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                  Location / City
                </Label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-line bg-card text-xs text-ink focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="all">All Cities</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Expertise Tag */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-navy-950 uppercase tracking-wider block">
                  Specialization
                </Label>
                <select
                  value={selectedExpertise}
                  onChange={(e) => setSelectedExpertise(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-line bg-card text-xs text-ink focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="all">All Specializations</option>
                  {expertiseList.map((tag) => (
                    <option key={tag} value={tag}>
                      #{tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* RESULTS CONTENT AREA (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-8">
              {isLoading ? (
                // SKELETON LOADING GRID
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border border-line bg-card p-5 space-y-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                      <Skeleton className="h-8 w-full rounded-lg" />
                    </div>
                  ))}
                </div>
              ) : sortedAlumni.length === 0 ? (
                // EMPTY STATE
                <EmptyState
                  title="No Alumni Match Your Filters"
                  description="Try clearing specific filters such as graduation batch, city, or search terms to broaden your results across the registry."
                  actionLabel="Clear All Filters"
                  onAction={clearAllFilters}
                />
              ) : viewMode === "card" ? (
                // CARD VIEW GRID
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {displayedAlumni.map((person) => {
                    const isConnected = !!connectedIds[person.id];

                    return (
                      <div
                        key={person.id}
                        className="group flex flex-col justify-between rounded-xl border border-line bg-card p-5 shadow-navy-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-navy-hover hover:border-gold-500/40"
                      >
                        <div>
                          {/* Card Top: Avatar + Name + Batch */}
                          <div
                            className="flex items-start gap-3.5 mb-3.5 cursor-pointer"
                            onClick={() => setSelectedProfile(person)}
                          >
                            <AvatarInitials
                              name={person.name}
                              src={person.avatarUrl}
                              size="lg"
                              className="shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                              <h3 className="font-serif text-base font-bold text-navy-950 group-hover:text-gold-600 transition-colors truncate">
                                {person.name}
                              </h3>
                              <p className="text-xs text-gold-700 font-semibold truncate">
                                {person.designation}
                              </p>
                              <p className="text-xs text-muted truncate">
                                {person.company}
                              </p>
                            </div>
                          </div>

                          {/* Academic & Location meta */}
                          <div className="space-y-1.5 text-xs text-ink/75 pt-2 border-t border-line/60">
                            <div className="flex items-center gap-1.5 truncate">
                              <GraduationCap className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                              <span className="truncate">
                                Class of {person.batch} • {person.course}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 truncate">
                              <MapPin className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                              <span className="truncate">{person.city}, {person.country}</span>
                            </div>
                          </div>

                          {/* Domain tag */}
                          <div className="mt-3">
                            <span className="inline-block rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-gold-700 border border-gold-500/30 truncate max-w-full">
                              {person.domain}
                            </span>
                          </div>

                          {/* Expertise tags */}
                          {person.expertiseTags && person.expertiseTags.length > 0 && (
                            <div className="mt-2.5 flex flex-wrap gap-1">
                              {person.expertiseTags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded bg-ivory px-1.5 py-0.5 text-[10px] text-muted font-medium border border-line"
                                >
                                  #{tag}
                                </span>
                              ))}
                              {person.expertiseTags.length > 3 && (
                                <span className="text-[10px] text-muted self-center">
                                  +{person.expertiseTags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Card Footer Actions */}
                        <div className="mt-5 pt-3.5 border-t border-line flex items-center justify-between gap-2">
                          <button
                            onClick={() => setSelectedProfile(person)}
                            className="text-xs font-semibold text-navy-950 hover:text-gold-600 transition-colors cursor-pointer"
                          >
                            View Profile
                          </button>

                          <div className="flex items-center gap-2">
                            <a
                              href={person.linkedInUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-card hover:bg-gold-500/15 text-[#0077b5] transition-colors"
                              aria-label={`LinkedIn profile for ${person.name}`}
                              title="LinkedIn Profile"
                            >
                              <LinkedInIcon className="h-4 w-4" />
                            </a>

                            <Button
                              size="sm"
                              disabled={isConnected}
                              onClick={() => handleConnect(person.id, person.name)}
                              className={`h-8 px-3 rounded-lg text-xs font-semibold shadow-xs transition-all ${
                                isConnected
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                                  : "bg-navy-900 hover:bg-navy-800 text-gold-300"
                              }`}
                            >
                              {isConnected ? "Request Sent" : "Connect"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                // TABLE VIEW (ResponsiveTable: real table on desktop, stacked cards on mobile)
                <ResponsiveTable
                  columns={tableColumns}
                  data={displayedAlumni}
                  keyExtractor={(row) => row.id}
                  emptyMessage="No alumni match your criteria."
                />
              )}

              {/* LOAD MORE BUTTON */}
              {displayedAlumni.length < sortedAlumni.length && (
                <div className="text-center pt-6">
                  <Button
                    onClick={() => setVisibleCount((prev) => prev + 12)}
                    className="h-11 px-8 rounded-xl bg-card border border-line hover:bg-gold-500/10 text-navy-950 font-bold text-xs shadow-sm transition-all"
                  >
                    Load More Alumni ({sortedAlumni.length - displayedAlumni.length} remaining)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED PROFILE MODAL DIALOG */}
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

