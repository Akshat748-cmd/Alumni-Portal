"use client";

import React from "react";
import Link from "next/link";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Send,
  X,
  Mail,
  Building,
  MessageSquare,
  Award,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

import { AlumniProfile } from "@/data/types";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePortalStore } from "@/store/portal";

// Official LinkedIn Icon
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .88.72 1.6 1.61 1.6.88 0 1.6-.72 1.6-1.6 0-.89-.72-1.61-1.6-1.61Z" />
    </svg>
  );
}

interface ProfileModalProps {
  profile: AlumniProfile | null;
  isOpen: boolean;
  onClose: () => void;
  isConnected?: boolean;
  onConnect?: (id: string) => void;
}

export function ProfileModal({
  profile,
  isOpen,
  onClose,
  isConnected = false,
  onConnect,
}: ProfileModalProps) {
  const { currentUser, jobs, alumni } = usePortalStore();

  if (!profile) return null;

  const handleConnect = () => {
    if (onConnect) {
      onConnect(profile.id);
    }
    toast.success(`Connection request sent to ${profile.name}!`);
  };

  // Find live company jobs and alumni count
  const companyJobs = jobs.filter(
    (j) =>
      j.company.toLowerCase().includes(profile.company.toLowerCase()) &&
      (j.status === "live" || j.status === "approved")
  );

  const companyAlumniCount = alumni.filter((a) =>
    a.company.toLowerCase().includes(profile.company.toLowerCase())
  ).length;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-full max-w-[500px] p-0 overflow-hidden bg-white border border-line rounded-xl shadow-lg"
        data-lenis-prevent
      >
        {/* Navy Header Banner */}
        <div className="relative bg-navy-950 p-4 sm:p-5 text-white overflow-hidden">
          <div className="absolute inset-0 bg-navy-pattern opacity-25 pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold-500/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-start gap-3.5">
            <AvatarInitials
              name={profile.name}
              src={profile.avatarUrl}
              size="xl"
              className="border-2 border-gold-400 shadow-xs shrink-0"
            />
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                <StatusBadge status={profile.status} size="sm" />
                {profile.membershipTier && (
                  <span className="text-[10px] font-semibold text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
                    {profile.membershipTier}
                  </span>
                )}
              </div>
              <h2 className="font-sans text-[18px] sm:text-[20px] font-semibold text-ivory truncate">
                {profile.name}
              </h2>
              <p className="text-[13px] text-gold-300 font-medium truncate">
                {profile.designation}
              </p>
              <p className="text-[12px] text-ivory/70 truncate">
                {profile.company}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body Details */}
        <div className="p-4 sm:p-5 space-y-4 max-h-[65vh] overflow-y-auto">
          {/* Company Network Opportunities Banner */}
          {(companyJobs.length > 0 || companyAlumniCount > 1) && (
            <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900">
                <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                <span>Opportunities Network at {profile.company}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {companyJobs.length > 0 && (
                  <Link
                    href={`/career-hub/jobs?search=${encodeURIComponent(profile.company)}`}
                    onClick={onClose}
                    className="font-medium text-navy-950 hover:underline flex items-center gap-1"
                  >
                    <span>{companyJobs.length} active opening(s)</span>
                    <ArrowRightIcon className="h-3 w-3 text-gold-600" />
                  </Link>
                )}
                {companyAlumniCount > 1 && (
                  <span className="text-muted text-[11px]">
                    • {companyAlumniCount} Poddar alumni work here
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Academic & Geographic Metadata */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-ivory border border-line">
              <GraduationCap className="h-4 w-4 text-gold-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-muted block text-[10px] uppercase font-bold">Class of {profile.batch}</span>
                <span className="font-semibold text-navy-950 truncate block">{profile.course}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-ivory border border-line">
              <MapPin className="h-4 w-4 text-gold-600 shrink-0" />
              <div className="min-w-0">
                <span className="text-muted block text-[10px] uppercase font-bold">Location</span>
                <span className="font-semibold text-navy-950 truncate block">{profile.city}, {profile.country}</span>
              </div>
            </div>
          </div>

          {/* Industry Domain */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1.5">
              Industry Vertical
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold text-gold-700 border border-gold-500/30">
              <Briefcase className="h-3 w-3" />
              {profile.domain}
            </span>
          </div>

          {/* Biography */}
          {profile.bio && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-1.5">
                Executive Profile
              </span>
              <p className="text-xs sm:text-sm text-ink/80 leading-relaxed bg-ivory/60 p-3.5 rounded-xl border border-line">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Expertise Tags */}
          {profile.expertiseTags && profile.expertiseTags.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted block mb-2">
                Specializations & Competencies
              </span>
              <div className="flex flex-wrap gap-1.5">
                {profile.expertiseTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-card px-2.5 py-1 text-xs font-medium text-navy-950 border border-line"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-line bg-ivory/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* LinkedIn Profile */}
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-line bg-white hover:bg-gold-500/10 text-xs font-semibold text-navy-950 transition-colors"
          >
            <LinkedInIcon className="h-4 w-4 text-[#0077b5]" />
            <span>LinkedIn</span>
            <ExternalLink className="h-3 w-3 text-muted" />
          </a>

          {/* OPPORTUNITIES NETWORK CHAT & CONNECT BUTTONS */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {currentUser && currentUser.id !== profile.id && (
              <Link
                href={`/messages?startWith=${profile.id}&name=${encodeURIComponent(profile.name)}`}
                scroll={false}
                onClick={onClose}
                className="h-11 px-4 rounded-xl bg-ivory border border-line text-navy-950 font-bold text-xs hover:bg-navy-50 transition-colors inline-flex items-center justify-center gap-1.5 flex-1 sm:flex-initial"
              >
                <MessageSquare className="h-3.5 w-3.5 text-gold-600" />
                <span>Message</span>
              </Link>
            )}

            <Button
              onClick={handleConnect}
              disabled={isConnected}
              className={`h-11 px-5 rounded-xl font-bold text-xs transition-all shadow-sm flex-1 sm:flex-initial ${
                isConnected
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                  : "bg-navy-950 hover:bg-navy-900 text-gold-300"
              }`}
            >
              {isConnected ? (
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Send className="h-3.5 w-3.5" />
                  Connect
                </span>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
