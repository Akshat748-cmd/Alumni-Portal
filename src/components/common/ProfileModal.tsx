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
  DialogClose,
} from "@/components/ui/dialog";

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
  if (!profile) return null;

  const handleConnect = () => {
    if (onConnect) {
      onConnect(profile.id);
    }
    toast.success(`Connection request sent to ${profile.name}!`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-lg p-0 overflow-hidden bg-card border border-line rounded-2xl shadow-2xl">
        {/* Navy Header Banner */}
        <div className="relative bg-navy-950 p-6 text-white overflow-hidden">
          <div className="absolute inset-0 bg-navy-pattern opacity-25 pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-gold-500/15 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex items-start gap-4">
            <AvatarInitials
              name={profile.name}
              src={profile.avatarUrl}
              size="xl"
              className="border-2 border-gold-400 shadow-md shrink-0"
            />
            <div className="flex-1 min-w-0 pr-6">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <StatusBadge status={profile.status} size="sm" />
                {profile.membershipTier && (
                  <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
                    {profile.membershipTier}
                  </span>
                )}
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-ivory truncate">
                {profile.name}
              </h2>
              <p className="text-xs text-gold-300 font-medium">
                {profile.designation}
              </p>
              <p className="text-xs text-ivory/70 truncate">
                {profile.company}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body Details */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Academic & Geographic Metadata */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-ivory border border-line">
              <GraduationCap className="h-4 w-4 text-gold-600 shrink-0" />
              <div>
                <span className="text-muted block text-[10px] uppercase font-bold">Class of {profile.batch}</span>
                <span className="font-semibold text-navy-950 truncate block">{profile.course}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-ivory border border-line">
              <MapPin className="h-4 w-4 text-gold-600 shrink-0" />
              <div>
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
          {/* LinkedIn Profile External Link */}
          <a
            href={profile.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl border border-line bg-card hover:bg-gold-500/10 text-xs font-semibold text-navy-950 transition-colors"
            aria-label={`View ${profile.name}'s verified profile on LinkedIn`}
          >
            <LinkedInIcon className="h-4 w-4 text-[#0077b5]" />
            <span>View on LinkedIn</span>
            <ExternalLink className="h-3 w-3 text-muted" />
          </a>

          {/* Connect Action Button */}
          <Button
            onClick={handleConnect}
            disabled={isConnected}
            className={`w-full sm:w-auto h-11 px-6 rounded-xl font-bold text-xs transition-all shadow-sm ${
              isConnected
                ? "bg-emerald-50 text-emerald-700 border border-emerald-300"
                : "bg-navy-900 hover:bg-navy-800 text-gold-300"
            }`}
          >
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Request Sent
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5">
                <Send className="h-3.5 w-3.5" />
                Connect With Alumnus
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

