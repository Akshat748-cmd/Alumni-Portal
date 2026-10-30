"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Building2,
  ExternalLink,
  PlusCircle,
  MapPin,
  Briefcase,
  Sparkles,
  Search,
  X,
  Send,
  CheckCircle2,
  Tag,
  Handshake,
} from "lucide-react";
import { toast } from "sonner";

import { usePortalStore } from "@/store/portal";
import { AlumniBusiness, DomainCategory } from "@/data/types";
import { DOMAIN_STATS } from "@/data/domains";

import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { FilterDrawer } from "@/components/common/FilterDrawer";
import { EmptyState } from "@/components/common/EmptyState";
import { SuccessState } from "@/components/common/SuccessState";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BusinessDirectoryPage() {
  const { businesses, submitItem } = usePortalStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [collaboratedIds, setCollaboratedIds] = useState<Record<string, boolean>>({});

  // Listing Form Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [newBizRefId, setNewBizRefId] = useState("");

  // Form Fields
  const [bizName, setBizName] = useState("");
  const [founderName, setFounderName] = useState("");
  const [batch, setBatch] = useState("2018");
  const [industry, setIndustry] = useState<DomainCategory>("IT & Technology");
  const [city, setCity] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [discountOffer, setDiscountOffer] = useState("");

  // Only approved businesses displayed publicly
  const approvedBusinesses = useMemo(
    () => businesses.filter((b) => b.status === "approved"),
    [businesses]
  );

  // Filter options
  const cities = useMemo(() => {
    const set = new Set(approvedBusinesses.map((b) => b.city));
    return Array.from(set).sort();
  }, [approvedBusinesses]);

  // Filtered List
  const filteredBusinesses = useMemo(() => {
    return approvedBusinesses.filter((b) => {
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = b.name.toLowerCase().includes(q);
        const matchesFounder = b.founderName.toLowerCase().includes(q);
        const matchesDesc = b.description.toLowerCase().includes(q);
        if (!matchesName && !matchesFounder && !matchesDesc) return false;
      }

      if (selectedIndustry !== "all" && b.industry !== selectedIndustry) {
        return false;
      }

      if (selectedCity !== "all" && b.city !== selectedCity) {
        return false;
      }

      return true;
    });
  }, [approvedBusinesses, searchQuery, selectedIndustry, selectedCity]);

  const handleCollaborate = (id: string, name: string) => {
    setCollaboratedIds((prev) => ({ ...prev, [id]: true }));
    toast.success(`Collaboration request sent to ${name}!`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizName || !founderName || !city || !description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const refId = submitItem("business", {
      name: bizName,
      founderName,
      batch: Number(batch),
      industry,
      foundedYear: new Date().getFullYear(),
      website: website || "https://alumnibusiness.mock",
      city,
      description,
      logoPlaceholder: bizName.slice(0, 3).toUpperCase(),
      discountOffer: discountOffer || undefined,
    });

    setNewBizRefId(refId);
    setSubmissionSuccess(true);
    toast.success("Business profile submitted for moderation!");

    // Reset fields
    setBizName("");
    setFounderName("");
    setDescription("");
    setWebsite("");
    setDiscountOffer("");
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* PAGE HERO */}
      <PageHero
        eyebrow="Commercial Network • Directory"
        title="Alumni Business Directory"
        subtitle="Support, partner with, and procure from enterprises founded and led by Poddar graduates. Discover verified B2B solutions, artisanal creators, and startup ventures."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Alumni Directory", href: "/directory" },
          { label: "Business Directory" },
        ]}
        actions={
          <Button
            onClick={() => {
              setSubmissionSuccess(false);
              setDialogOpen(true);
            }}
            className="h-10 px-5 rounded-xl bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold text-xs shadow-md"
          >
            <PlusCircle className="h-4 w-4 mr-1.5" />
            List Your Business
          </Button>
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 max-w-7xl space-y-10">
        {/* TOP SEARCH & INLINE / DRAWER FILTERS */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input (md:col-span-6) */}
            <div className="md:col-span-6 relative flex items-center rounded-2xl border border-line bg-card shadow-navy-soft p-1.5">
              <Search className="h-5 w-5 text-gold-600 ml-3 shrink-0" strokeWidth={2} />
              <Input
                type="text"
                placeholder="Search businesses by enterprise name, founder, or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-11 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-3 text-navy-950 placeholder:text-muted"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 text-muted hover:text-navy-950"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Desktop Filters (md:col-span-6) */}
            <div className="hidden md:flex md:col-span-6 items-center gap-3 justify-end">
              {/* Industry Select */}
              <div className="w-52">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-line bg-card text-xs font-semibold text-navy-950 shadow-sm cursor-pointer"
                >
                  <option value="all">All Industries ({approvedBusinesses.length})</option>
                  {DOMAIN_STATS.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Select */}
              <div className="w-40">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-line bg-card text-xs font-semibold text-navy-950 shadow-sm cursor-pointer"
                >
                  <option value="all">All Cities</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {(selectedIndustry !== "all" || selectedCity !== "all" || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedIndustry("all");
                    setSelectedCity("all");
                    setSearchQuery("");
                  }}
                  className="text-xs text-danger hover:underline font-semibold whitespace-nowrap cursor-pointer"
                >
                  Reset
                </button>
              )}
            </div>

            {/* Mobile Filter Button (< md) */}
            <div className="md:hidden">
              <FilterDrawer
                title="Filter Businesses"
                activeFilterCount={
                  (selectedIndustry !== "all" ? 1 : 0) +
                  (selectedCity !== "all" ? 1 : 0) +
                  (searchQuery ? 1 : 0)
                }
                onReset={() => {
                  setSelectedIndustry("all");
                  setSelectedCity("all");
                  setSearchQuery("");
                }}
                onApply={() => toast.success("Filters applied")}
              >
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-bold text-navy-950 uppercase mb-1.5 block">
                      Industry Sector
                    </Label>
                    <select
                      value={selectedIndustry}
                      onChange={(e) => setSelectedIndustry(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-line bg-card text-sm text-ink"
                    >
                      <option value="all">All Industries ({approvedBusinesses.length})</option>
                      {DOMAIN_STATS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="text-xs font-bold text-navy-950 uppercase mb-1.5 block">
                      City / Headquarters
                    </Label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full h-11 px-3 rounded-lg border border-line bg-card text-sm text-ink"
                    >
                      <option value="all">All Cities</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </FilterDrawer>
            </div>
          </div>

          <div className="text-xs text-muted font-mono">
            Showing {filteredBusinesses.length} verified alumni-founded enterprise{filteredBusinesses.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* BUSINESS CARDS GRID */}
        {filteredBusinesses.length === 0 ? (
          <EmptyState
            title="No Alumni Businesses Found"
            description="No business listings match your current search and filter criteria. Try resetting filters or register your own enterprise."
            actionLabel="Reset Filters"
            onAction={() => {
              setSelectedIndustry("all");
              setSelectedCity("all");
              setSearchQuery("");
            }}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((biz) => {
              const isCollaborated = !!collaboratedIds[biz.id];

              return (
                <div
                  key={biz.id}
                  className="flex flex-col justify-between rounded-2xl border border-line bg-card p-6 shadow-navy-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-navy-hover hover:border-gold-500/40"
                >
                  <div>
                    {/* Header: Logo Initial Monogram + Name + Industry */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-gold-500/40 bg-gradient-to-br from-navy-900 to-navy-950 text-gold-300 font-serif font-bold text-lg shadow-sm shrink-0">
                        {biz.logoPlaceholder}
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="inline-block rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-700 border border-gold-500/30 mb-1">
                          {biz.industry}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-navy-950 truncate">
                          {biz.name}
                        </h3>
                        <p className="text-xs text-muted">
                          Founded {biz.foundedYear} • {biz.city}
                        </p>
                      </div>
                    </div>

                    {/* Founder Credentials */}
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-ivory border border-line text-xs mb-3.5">
                      <Briefcase className="h-3.5 w-3.5 text-gold-600 shrink-0" />
                      <span className="font-medium text-navy-950 truncate">
                        Founder: <strong>{biz.founderName}</strong> (Class of {biz.batch})
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-ink/80 leading-relaxed mb-4 line-clamp-3">
                      {biz.description}
                    </p>

                    {/* Alumni Discount Offer / Perk if available */}
                    {biz.discountOffer && (
                      <div className="flex items-start gap-2 p-3 rounded-xl bg-gold-500/10 border border-gold-500/30 text-xs text-navy-950 mb-4">
                        <Tag className="h-3.5 w-3.5 text-gold-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] font-medium leading-tight">
                          {biz.discountOffer}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-4 border-t border-line flex items-center justify-between gap-3">
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy-950 hover:text-gold-600 transition-colors"
                      aria-label={`Visit official website for ${biz.name}`}
                    >
                      <span>Visit Website</span>
                      <ExternalLink className="h-3 w-3 text-muted" />
                    </a>

                    <Button
                      size="sm"
                      disabled={isCollaborated}
                      onClick={() => handleCollaborate(biz.id, biz.name)}
                      className={`h-9 px-4 rounded-xl text-xs font-semibold shadow-xs transition-all ${
                        isCollaborated
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                          : "bg-navy-900 hover:bg-navy-800 text-gold-300"
                      }`}
                    >
                      {isCollaborated ? (
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          Requested
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <Handshake className="h-3.5 w-3.5" />
                          Collaborate
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CLOSING CTA BAND: List Your Business */}
        <div className="rounded-2xl border border-navy-800 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-8 sm:p-12 text-ivory text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-navy-pattern opacity-20 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-gold-400 block">
              Entrepreneurship & Enterprise Network
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ivory">
              Own a Business? List it in the Directory
            </h2>
            <p className="text-xs sm:text-sm text-ivory/80 leading-relaxed text-pretty">
              Gain visibility across 260+ alumni professionals, offer exclusive alumni discounts, and unlock B2B procurement opportunities with fellow graduates.
            </p>

            <div className="pt-2">
              <Button
                onClick={() => {
                  setSubmissionSuccess(false);
                  setDialogOpen(true);
                }}
                className="h-12 px-7 rounded-xl bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600 hover:from-gold-300 hover:to-gold-500 text-navy-950 font-bold text-sm shadow-md"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                List Your Business Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SUBMISSION MODAL DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-full max-w-lg p-0 overflow-hidden bg-card border border-line rounded-2xl shadow-2xl">
          {submissionSuccess ? (
            <div className="p-8">
              <SuccessState
                title="Business Submitted for Review"
                message="Your enterprise profile has been routed to the Alumni Secretariat queue. Once verified, it will be published to the official Alumni Business Directory."
                referenceId={newBizRefId}
                actionLabel="Done"
                onAction={() => setDialogOpen(false)}
                secondaryActionLabel="Submit Another"
                onSecondaryAction={() => setSubmissionSuccess(false)}
              />
            </div>
          ) : (
            <div>
              <div className="bg-navy-950 p-6 text-white border-b border-navy-800">
                <span className="text-[10px] uppercase font-bold text-gold-400 tracking-widest block mb-1">
                  Directory Enrollment
                </span>
                <h3 className="font-serif text-xl font-bold text-ivory">
                  Register Your Alumni Enterprise
                </h3>
                <p className="text-xs text-ivory/70 mt-1">
                  Submissions are reviewed by the secretariat within 24 hours.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-navy-950">Enterprise Name *</Label>
                  <Input
                    placeholder="e.g. Apex Tech Ventures"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    required
                    className="h-11 border-line rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-navy-950">Founder Name *</Label>
                    <Input
                      placeholder="e.g. Vikramaditya"
                      value={founderName}
                      onChange={(e) => setFounderName(e.target.value)}
                      required
                      className="h-11 border-line rounded-xl text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-navy-950">Graduation Batch *</Label>
                    <Input
                      type="number"
                      min={1998}
                      max={2026}
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      required
                      className="h-11 border-line rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-navy-950">Industry *</Label>
                    <select
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value as DomainCategory)}
                      className="w-full h-11 px-3 rounded-xl border border-line bg-card text-xs text-ink"
                    >
                      {DOMAIN_STATS.map((d) => (
                        <option key={d.id} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-navy-950">Headquarters City *</Label>
                    <Input
                      placeholder="e.g. Jaipur, Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                      className="h-11 border-line rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-navy-950">Website URL</Label>
                  <Input
                    placeholder="https://yourcompany.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="h-11 border-line rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-navy-950">Business Description *</Label>
                  <Textarea
                    placeholder="Describe your company's core services, products, and target audience..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    rows={3}
                    className="border-line rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-navy-950">
                    Alumni Discount / Exclusive Offer (Optional)
                  </Label>
                  <Input
                    placeholder="e.g. 15% discount for fellow Poddar alumni"
                    value={discountOffer}
                    onChange={(e) => setDiscountOffer(e.target.value)}
                    className="h-11 border-line rounded-xl text-sm"
                  />
                </div>

                <div className="pt-4 border-t border-line flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                    className="h-11 px-5 rounded-xl border-line text-muted"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="h-11 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-300 font-bold text-xs"
                  >
                    Submit for Approval
                  </Button>
                </div>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

