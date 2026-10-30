"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Check,
  Copy,
  CheckCircle2,
  Clock,
  ArrowRight,
  Home,
  Ticket,
  ShieldCheck,
} from "lucide-react";
import { fireConfettiBurst } from "@/components/motion/ConfettiBurst";

export const HELP_DESK_RESPONSE_PROMISE = "We usually respond within 2 working days";

interface TicketSuccessStateProps {
  ticketNumber: string;
  category: string;
  subject?: string;
  name?: string;
  onReset?: () => void;
}

export function TicketSuccessState({
  ticketNumber,
  category,
  subject,
  name,
  onReset,
}: TicketSuccessStateProps) {
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    fireConfettiBurst();
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(ticketNumber);
    setCopied(true);
    toast.success("Ticket number copied to clipboard!");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-2xl text-center relative overflow-hidden max-w-2xl mx-auto">
      <div className="relative z-10">
        <div className="inline-flex p-4 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-3">
          Support Request Logged
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-navy-950 mb-2">
          Ticket Filed Successfully
        </h2>

        <p className="text-sm text-muted max-w-md mx-auto mb-8 leading-relaxed">
          {name ? `Thank you, ${name}. ` : ""}Your request has been registered in the Alumni Help Desk dispatch system.
        </p>

        {/* TICKET NUMBER BADGE WITH COPY ACTION */}
        <div className="p-6 rounded-2xl bg-navy-950 text-ivory max-w-md mx-auto mb-8 text-left shadow-lg border border-navy-800">
          <div className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Official Tracking Number</span>
            <Ticket className="h-4 w-4 text-gold-400" />
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white">
              {ticketNumber}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-gold-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-navy-700"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy ID</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-navy-800 text-xs text-ivory/70 space-y-1">
            <div>Category: <span className="text-white font-medium">{category}</span></div>
            {subject && <div className="truncate">Subject: <span className="text-white font-medium">{subject}</span></div>}
          </div>
        </div>

        {/* RESPONSE PROMISE NOTE */}
        <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 text-xs text-navy-950 max-w-md mx-auto mb-8 flex items-center gap-3 text-left">
          <Clock className="h-5 w-5 text-gold-700 shrink-0" />
          <div>
            <strong className="font-bold text-navy-950">Service Level Commitment: </strong>
            <span>{HELP_DESK_RESPONSE_PROMISE}. Official updates will be transmitted to your email.</span>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/help-desk/tickets"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm hover:bg-navy-900 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Ticket className="h-4 w-4 text-gold-400" />
            <span>Track in My Tickets</span>
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-ivory border border-line text-navy-900 font-semibold text-sm hover:bg-navy-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            <span>Return to Home</span>
          </Link>

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="w-full sm:w-auto px-4 py-3.5 text-xs text-muted hover:text-navy-950 font-medium underline cursor-pointer"
            >
              Submit Another Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
