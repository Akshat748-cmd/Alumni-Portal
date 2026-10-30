"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  AlertCircle,
  Eye,
  ChevronRight,
  User,
  History,
} from "lucide-react";
import { toast } from "sonner";
import { usePortalStore } from "@/store/portal";
import { HelpDeskTicket } from "@/data/types";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function AdminTicketsQueue() {
  const { tickets, setTicketStatus } = usePortalStore();

  const [statusFilter, setStatusFilter] = useState<"all" | "Open" | "In Review" | "Resolved">("all");
  const [activeTicket, setActiveTicket] = useState<HelpDeskTicket | null>(null);
  const [replyNote, setReplyNote] = useState("");
  const [selectedNewStatus, setSelectedNewStatus] = useState<"Open" | "In Review" | "Resolved">("In Review");

  const filteredTickets = tickets.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    return true;
  });

  const handleUpdateStatus = (ticket: HelpDeskTicket, status: "Open" | "In Review" | "Resolved", note?: string) => {
    setTicketStatus(ticket.id, status, note);
    toast.success(`Ticket ${ticket.ticketNumber} updated to ${status}!`, {
      description: note ? `Note logged: "${note}"` : "User will see updated status in My Tickets.",
    });
    if (activeTicket?.id === ticket.id) {
      setActiveTicket({
        ...ticket,
        status,
        adminNote: note !== undefined ? note : ticket.adminNote,
        statusHistory: [
          ...(ticket.statusHistory || []),
          { status, date: new Date().toISOString().split("T")[0], note: note || `Status updated to ${status}` },
        ],
      });
      setReplyNote("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-line shadow-navy-soft">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === "all" ? "bg-white text-navy-950 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
            }`}
          >
            All Tickets ({tickets.length})
          </button>
          <button
            onClick={() => setStatusFilter("Open")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === "Open" ? "bg-amber-100 text-amber-900 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
            }`}
          >
            Open ({tickets.filter((t) => t.status === "Open").length})
          </button>
          <button
            onClick={() => setStatusFilter("In Review")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === "In Review" ? "bg-blue-100 text-blue-900 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
            }`}
          >
            In Review ({tickets.filter((t) => t.status === "In Review").length})
          </button>
          <button
            onClick={() => setStatusFilter("Resolved")}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              statusFilter === "Resolved" ? "bg-emerald-100 text-emerald-900 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
            }`}
          >
            Resolved ({tickets.filter((t) => t.status === "Resolved").length})
          </button>
        </div>

        <span className="text-xs font-mono text-muted">
          Showing {filteredTickets.length} of {tickets.length} tickets
        </span>
      </div>

      {/* Ticket List */}
      <Card className="border-line shadow-navy-soft rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-lg text-navy-950">
                Help Desk & Secretariat Support Inquiries
              </CardTitle>
              <CardDescription className="text-xs">
                Official grievance, verification, and transcript requests submitted via Help Desk. Status transitions update in the user&apos;s &quot;My Tickets&quot; view in real-time.
              </CardDescription>
            </div>
            <HelpCircle className="h-5 w-5 text-gold-600" />
          </div>
        </CardHeader>
        <CardContent>
          {filteredTickets.length === 0 ? (
            <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
              No support tickets found for the selected status.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`p-4 rounded-xl border transition-all ${
                    ticket.status === "Open"
                      ? "border-amber-200/90 bg-amber-50/40"
                      : ticket.status === "In Review"
                      ? "border-blue-200/90 bg-blue-50/30"
                      : "border-line bg-card"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-navy-950">
                          {ticket.ticketNumber}
                        </span>
                        <StatusBadge status={ticket.status} size="sm" />
                        <Badge variant="outline" className="text-[10px]">
                          {ticket.category}
                        </Badge>
                      </div>

                      <h4 className="font-bold text-sm text-navy-950 mt-1">
                        {ticket.subject}
                      </h4>

                      <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                        <span>Submitted by <span className="font-medium text-navy-900">{ticket.name}</span></span>
                        {ticket.batch && <span>(Class of {ticket.batch})</span>}
                        <span>• {ticket.email}</span>
                        <span>• {ticket.createdAt}</span>
                      </div>

                      <p className="mt-2 text-xs text-ink/80 line-clamp-2 bg-white/70 p-2 rounded-lg border border-line/60">
                        {ticket.message}
                      </p>

                      {ticket.adminNote && (
                        <div className="mt-2 text-xs text-blue-900 bg-blue-50/70 p-2 rounded-lg border border-blue-200 flex items-start gap-1.5">
                          <MessageSquare className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold">Secretariat Response:</span> {ticket.adminNote}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setActiveTicket(ticket);
                          setSelectedNewStatus(ticket.status === "Open" ? "In Review" : ticket.status);
                          setReplyNote(ticket.adminNote || "");
                        }}
                        className="h-8 px-3 text-xs rounded-lg border-line text-navy-800"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Manage Ticket
                      </Button>

                      {ticket.status === "Open" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(ticket, "In Review", "Ticket acknowledged and assigned to secretariat officer.")}
                          className="h-8 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg"
                        >
                          Mark In Review
                        </Button>
                      )}

                      {ticket.status !== "Resolved" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(ticket, "Resolved", "Ticket successfully addressed and closed.")}
                          className="h-8 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg"
                        >
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ticket Management Dialog */}
      {activeTicket && (
        <Dialog open={!!activeTicket} onOpenChange={(open) => !open && setActiveTicket(null)}>
          <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-navy-950">
                  {activeTicket.ticketNumber}
                </span>
                <StatusBadge status={activeTicket.status} size="sm" />
                <Badge variant="outline" className="text-[10px]">
                  {activeTicket.category}
                </Badge>
              </div>
              <DialogTitle className="font-serif text-lg text-navy-950 mt-1">
                {activeTicket.subject}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Filed on {activeTicket.createdAt} by {activeTicket.name} ({activeTicket.email})
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-line space-y-1">
                <span className="text-[10px] uppercase font-semibold text-muted block">Query Description</span>
                <p className="text-ink/90 leading-relaxed whitespace-pre-wrap">
                  {activeTicket.message}
                </p>
              </div>

              {/* Status Update & Secretariat Note Section */}
              <div className="p-4 rounded-xl bg-slate-50 border border-line space-y-3">
                <span className="text-xs font-bold text-navy-950 block">Update Ticket Status & Note</span>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedNewStatus("Open")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition-all ${
                      selectedNewStatus === "Open"
                        ? "bg-amber-100 border-amber-300 text-amber-900 ring-2 ring-amber-400/50"
                        : "bg-white border-line text-muted hover:text-navy-950"
                    }`}
                  >
                    Open
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedNewStatus("In Review")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition-all ${
                      selectedNewStatus === "In Review"
                        ? "bg-blue-100 border-blue-300 text-blue-900 ring-2 ring-blue-400/50"
                        : "bg-white border-line text-muted hover:text-navy-950"
                    }`}
                  >
                    In Review
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedNewStatus("Resolved")}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold border text-center transition-all ${
                      selectedNewStatus === "Resolved"
                        ? "bg-emerald-100 border-emerald-300 text-emerald-900 ring-2 ring-emerald-400/50"
                        : "bg-white border-line text-muted hover:text-navy-950"
                    }`}
                  >
                    Resolved
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-navy-950 block">
                    Administrative Note / Response to Alumnus
                  </label>
                  <Textarea
                    value={replyNote}
                    onChange={(e) => setReplyNote(e.target.value)}
                    placeholder="Enter official status remarks or resolution notes..."
                    className="text-xs min-h-[80px] bg-white rounded-xl"
                  />
                </div>

                <Button
                  onClick={() => handleUpdateStatus(activeTicket, selectedNewStatus, replyNote)}
                  className="w-full text-xs font-semibold bg-navy-900 hover:bg-navy-950 text-white rounded-xl h-9"
                >
                  <Send className="h-3.5 w-3.5 mr-1.5" />
                  Save Status & Dispatch Note
                </Button>
              </div>

              {/* Status History Audit Log */}
              {activeTicket.statusHistory && activeTicket.statusHistory.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-semibold text-muted flex items-center gap-1">
                    <History className="h-3 w-3" /> Audit Trail & History
                  </span>
                  <div className="space-y-1.5">
                    {activeTicket.statusHistory.map((h, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-white border border-line text-[11px] flex justify-between gap-2">
                        <div>
                          <span className="font-semibold text-navy-900">{h.status}</span>
                          {h.note && <p className="text-muted mt-0.5">{h.note}</p>}
                        </div>
                        <span className="text-muted font-mono text-[10px] shrink-0">{h.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" size="sm" onClick={() => setActiveTicket(null)} className="text-xs">
                Close Window
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

