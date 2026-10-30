"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Ticket,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  PlusCircle,
  ShieldCheck,
  User,
} from "lucide-react";
import { PageHero } from "@/components/common/PageHero";
import { StatusBadge } from "@/components/common/StatusBadge";
import { EmptyState } from "@/components/common/EmptyState";
import { usePortalStore } from "@/store/portal";
import { HelpDeskTicket } from "@/data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function MyTicketsPage() {
  const { tickets, currentUser } = usePortalStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedTicket, setSelectedTicket] = useState<HelpDeskTicket | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Tickets matching user or this browser session
  const userTickets = useMemo(() => {
    if (currentUser) {
      const filtered = tickets.filter(
        (t) =>
          t.email.toLowerCase() === currentUser.email.toLowerCase() ||
          t.name.toLowerCase() === currentUser.name.toLowerCase()
      );
      // If user has filed tickets, show theirs; otherwise show all session tickets for demo convenience
      return filtered.length > 0 ? filtered : tickets;
    }
    return tickets;
  }, [tickets, currentUser]);

  // Filtered by search & status
  const filteredTickets = useMemo(() => {
    return userTickets.filter((t) => {
      if (statusFilter !== "All" && t.status !== statusFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matches =
          t.ticketNumber.toLowerCase().includes(q) ||
          t.subject.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.message.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [userTickets, statusFilter, searchQuery]);

  const handleOpenDetail = (ticket: HelpDeskTicket) => {
    setSelectedTicket(ticket);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <PageHero
        eyebrow="DISPATCH TRACKER • TICKETS"
        title="My Support Tickets"
        subtitle="Track real-time status, Secretariat remarks, and resolution timelines for your submitted inquiries and transcript requisitions."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Help Desk", href: "/help-desk" },
          { label: "My Tickets" },
        ]}
      />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          {/* TOP CONTROLS & FILTER BAR */}
          <div className="bg-white rounded-3xl p-6 border border-line shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* SEARCH */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search tickets by tracking number, subject, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-line bg-ivory/50 text-base text-navy-950 placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-gold-500/40"
                />
              </div>

              {/* STATUS FILTER BUTTONS */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {["All", "Open", "In Review", "Resolved"].map((status) => {
                  const isSelected = statusFilter === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatusFilter(status)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? "bg-navy-950 text-gold-300 shadow-sm"
                          : "bg-ivory text-muted border border-line hover:border-gold-500/40 hover:text-navy-950"
                      }`}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>

              {/* SUBMIT NEW TICKET ACTION */}
              <Link
                href="/help-desk/query"
                className="h-12 px-5 rounded-xl bg-navy-950 text-gold-300 font-bold text-xs sm:text-sm hover:bg-navy-900 transition-colors shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <PlusCircle className="h-4 w-4" />
                <span>New Ticket</span>
              </Link>
            </div>
          </div>

          {/* USER CONTEXT STRIP */}
          <div className="flex items-center justify-between text-xs text-muted mb-4 px-2">
            <div>
              {currentUser ? (
                <span>
                  Viewing tickets for <strong className="text-navy-950">{currentUser.name}</strong> ({currentUser.email})
                </span>
              ) : (
                <span>Viewing support tickets created on this device</span>
              )}
            </div>
            <div>
              Total: <strong className="text-navy-950">{filteredTickets.length}</strong>
            </div>
          </div>

          {/* TICKETS LIST */}
          {filteredTickets.length === 0 ? (
            <EmptyState
              title="No Tickets Found"
              description="No tickets match your query or filter parameters. Submit a new query or clear the filter."
              actionLabel="Submit a Support Query"
              onAction={() => {
                window.location.href = "/help-desk/query";
              }}
            />
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => handleOpenDetail(ticket)}
                  className="bg-white rounded-2xl p-5 sm:p-6 border border-line shadow-sm hover:shadow-md hover:border-gold-500/50 transition-all duration-200 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-mono font-bold text-navy-950 text-sm bg-navy-50 px-2.5 py-0.5 rounded-lg border border-navy-200">
                        {ticket.ticketNumber}
                      </span>
                      <StatusBadge status={ticket.status} size="sm" />
                      <span className="text-xs text-muted font-medium">{ticket.category}</span>
                    </div>

                    <h3 className="text-base font-bold text-navy-950 line-clamp-1">
                      {ticket.subject}
                    </h3>

                    <p className="text-xs text-muted line-clamp-1">
                      {ticket.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 sm:shrink-0 text-xs text-muted w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-0 border-line">
                    <div className="text-right">
                      <div className="text-[11px]">Logged on</div>
                      <div className="font-semibold text-navy-900">{ticket.createdAt}</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TICKET DETAIL DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-white border-line p-6 sm:p-8 rounded-3xl">
          <DialogHeader className="text-left">
            {selectedTicket && (
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold bg-navy-50 text-navy-950 px-2 py-0.5 rounded border border-navy-200">
                  {selectedTicket.ticketNumber}
                </span>
                <StatusBadge status={selectedTicket.status} size="sm" />
              </div>
            )}
            <DialogTitle className="font-serif text-xl sm:text-2xl font-bold text-navy-950">
              {selectedTicket?.subject}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              Category: {selectedTicket?.category} • Filed on {selectedTicket?.createdAt}
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-4 py-2 text-xs">
              {/* APPLICANT METADATA */}
              <div className="p-3.5 rounded-2xl bg-ivory border border-line grid grid-cols-2 gap-2 text-muted">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-navy-950">Applicant</span>
                  <span className="font-medium text-navy-900">{selectedTicket.name}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-navy-950">Contact Email</span>
                  <span className="font-medium text-navy-900 truncate block">{selectedTicket.email}</span>
                </div>
                {selectedTicket.phone && (
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-navy-950">Phone</span>
                    <span className="font-medium text-navy-900">{selectedTicket.phone}</span>
                  </div>
                )}
                {selectedTicket.batch && (
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-navy-950">Batch Cohort</span>
                    <span className="font-medium text-navy-900">Class of {selectedTicket.batch}</span>
                  </div>
                )}
              </div>

              {/* TICKET MESSAGE */}
              <div>
                <span className="block font-bold text-navy-950 uppercase tracking-wider mb-1.5 text-[10px]">
                  Requisition Message & Request Body:
                </span>
                <div className="p-3.5 rounded-xl bg-ivory/60 border border-line text-navy-900 leading-relaxed whitespace-pre-line text-xs">
                  {selectedTicket.message}
                </div>
              </div>

              {/* TIMELINE STATUS NOTE */}
              <div className="p-3 rounded-xl bg-navy-50 border border-navy-200 text-navy-950 flex items-start gap-2.5">
                <Clock className="h-4 w-4 text-gold-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="font-bold">Dispatch Status: </strong>
                  {selectedTicket.status === "Resolved"
                    ? "This request has been resolved and official records dispatched by the Secretariat."
                    : selectedTicket.status === "In Review"
                    ? "Currently under review by the Registrar's archives department."
                    : "Ticket is logged in the Secretariat queue. Our SLA guarantees a response within 2 working days."}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="w-full py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm cursor-pointer hover:bg-navy-900 transition-colors"
                >
                  Close Ticket
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
