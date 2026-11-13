"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle,
  Lock,
  MessageSquare,
  Clock,
} from "lucide-react";
import { usePortalStore } from "@/store/portal";
import { EmptyState } from "@/components/common/EmptyState";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function AdminChatReports() {
  const {
    chatReports,
    messages,
    dismissReport,
    warnUserReport,
    blockUserReport,
  } = usePortalStore();

  const [activeTranscriptConvId, setActiveTranscriptConvId] = useState<string | null>(null);

  const transcriptMessages = activeTranscriptConvId
    ? (messages[activeTranscriptConvId] || []).slice(-10)
    : [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-3xl border border-line shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-navy-950 flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-600" />
            <span>Chat Safety Reports ({chatReports.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Audit reported peer conversations, review message logs, and enforce disciplinary blocks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-navy-950 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
            {chatReports.filter((r) => (r.status as string) === "pending" || r.status === "open").length} Pending Audits
          </span>
        </div>
      </div>

      {chatReports.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-line shadow-sm">
          <EmptyState
            title="No Chat Reports Filed"
            description="The Opportunities Network chat system is clean. When a user reports inappropriate messages, the transcript appears here."
          />
        </div>
      ) : (
        <div className="space-y-4">
          {chatReports.map((report) => {
            const isPending = (report.status as string) === "pending" || (report.status as string) === "open";

            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-line p-5 sm:p-6 shadow-sm space-y-4"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          isPending
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : (report.status as string) === "user_blocked"
                            ? "bg-red-100 text-red-800 border border-red-300"
                            : (report.status as string) === "warned"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {report.status.replace("_", " ")}
                      </span>
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{report.createdAt}</span>
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-navy-950">
                      Report against <span className="text-red-700">{report.reportedUserName}</span>
                    </h3>
                    <div className="text-xs text-muted mt-0.5">
                      Filed by: <strong className="text-navy-900 font-semibold">{report.reportedByName || report.reporterName || "Member"}</strong> • Reason: <strong className="text-navy-950">{report.reason}</strong>
                    </div>

                    {(report.note || report.notes) && (
                      <p className="text-xs text-navy-900 bg-ivory p-3 rounded-xl border border-line mt-2 italic">
                        &ldquo;{report.note || report.notes}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setActiveTranscriptConvId(report.conversationId)}
                      className="px-3 py-1.5 rounded-xl bg-ivory border border-line text-navy-900 font-bold text-xs hover:bg-navy-50 transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="h-3.5 w-3.5 text-gold-600" />
                      <span>View Transcript</span>
                    </button>

                    {isPending && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            dismissReport(report.id);
                            toast.info("Report dismissed.");
                          }}
                          className="px-3 py-1.5 rounded-xl text-muted hover:text-navy-950 text-xs font-semibold"
                        >
                          Dismiss
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            warnUserReport(report.id);
                            toast.warning(`Formal safety warning issued to ${report.reportedUserName}.`);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold hover:bg-amber-100"
                        >
                          Warn User
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Block user ${report.reportedUserName} from sending messages?`)) {
                              blockUserReport(report.id);
                              toast.error(`User ${report.reportedUserName} blocked permanently.`);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                        >
                          Block Account
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TRANSCRIPT MODAL */}
      <Dialog
        open={Boolean(activeTranscriptConvId)}
        onOpenChange={(open) => !open && setActiveTranscriptConvId(null)}
      >
        <DialogContent className="sm:max-w-lg bg-white rounded-3xl p-6" data-lenis-prevent>
          <DialogHeader className="border-b border-line pb-3">
            <DialogTitle className="text-lg font-serif font-bold text-navy-950 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gold-600" />
              <span>Conversation Transcript</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              Last {transcriptMessages.length} messages from conversation {activeTranscriptConvId}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-3 max-h-80 overflow-y-auto">
            {transcriptMessages.length === 0 ? (
              <div className="p-4 text-center text-xs text-muted">
                No archived messages in this conversation.
              </div>
            ) : (
              transcriptMessages.map((msg) => (
                <div key={msg.id} className="p-3 rounded-xl bg-ivory border border-line text-xs space-y-1">
                  <div className="flex items-center justify-between text-muted text-[10px]">
                    <span className="font-bold text-navy-950">
                      {msg.senderName} ({msg.senderRole})
                    </span>
                    <span>{new Date(msg.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="text-navy-950">{msg.text}</p>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
