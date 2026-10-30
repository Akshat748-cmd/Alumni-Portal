"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  Eye,
  Check,
  X,
  UserCheck,
  Send,
  Clock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { usePortalStore, SubmittedQueueItem } from "@/store/portal";
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

export function AdminMentorshipQueue() {
  const { submittedQueue, approveItem, rejectItem } = usePortalStore();

  const [activeSubTab, setActiveSubTab] = useState<"signups" | "requests">("signups");
  const [selectedItem, setSelectedItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectingItem, setRejectingItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const signups = submittedQueue.filter((q) => q.type === "mentor-signup" || q.type === "mentor");
  const requests = submittedQueue.filter((q) => q.type === "mentorship-request");

  const handleApprove = (item: SubmittedQueueItem) => {
    approveItem(item.type, item.id);
    const applicantName = item.payload?.name || item.payload?.studentName || item.submittedBy || "Applicant";
    toast.success(`Mentorship item approved!`, {
      description: item.type === "mentorship-request"
        ? `Request from ${applicantName} has been processed and forwarded to mentor.`
        : `${applicantName} is now listed as an active mentor in Find a Mentor.`,
    });
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  const handleReject = () => {
    if (!rejectingItem) return;
    rejectItem(rejectingItem.type, rejectingItem.id, rejectReason || "Rejected by mentorship secretariat");
    toast.error(`Mentorship item marked as rejected.`);
    setRejectingItem(null);
    setRejectReason("");
    if (selectedItem?.id === rejectingItem.id) setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab switcher */}
      <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
        <button
          onClick={() => setActiveSubTab("signups")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === "signups"
              ? "bg-navy-950 text-gold-300 shadow-sm"
              : "text-muted hover:text-navy-950"
          }`}
        >
          Alumni Mentor Signups ({signups.length})
        </button>
        <button
          onClick={() => setActiveSubTab("requests")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === "requests"
              ? "bg-navy-950 text-gold-300 shadow-sm"
              : "text-muted hover:text-navy-950"
          }`}
        >
          Student Mentorship Requests ({requests.length})
        </button>
      </div>

      {activeSubTab === "signups" ? (
        <Card className="border-line shadow-navy-soft rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-lg text-navy-950">
                  Alumni Volunteer Mentor Applications
                </CardTitle>
                <CardDescription className="text-xs">
                  Review alumni volunteering to guide students and early-career alumni. Approving adds them to the searchable Mentor Directory.
                </CardDescription>
              </div>
              <UserCheck className="h-5 w-5 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            {signups.length === 0 ? (
              <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
                No pending mentor applications.
              </div>
            ) : (
              <div className="space-y-4">
                {signups.map((item) => {
                  const p = item.payload || {};
                  const name = p.name || item.submittedBy || "Alumnus Mentor";

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all ${
                        item.status === "pending"
                          ? "border-amber-200/80 bg-amber-50/30"
                          : "border-line bg-card"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm text-navy-950">{name}</span>
                            <span className="text-xs text-navy-800">
                              {p.role} at {p.company}
                            </span>
                            <StatusBadge status={item.status} size="sm" />
                          </div>

                          <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                            {p.batch && <span>Class of {p.batch}</span>}
                            {p.experienceYears && <span>• {p.experienceYears} Years Exp</span>}
                            {p.domain && <span>• {p.domain}</span>}
                            <span>• Applied on {item.createdAt}</span>
                          </div>

                          {p.expertise && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {(Array.isArray(p.expertise) ? p.expertise : String(p.expertise).split(",")).map(
                                (exp: string, idx: number) => (
                                  <Badge key={idx} variant="secondary" className="text-[10px]">
                                    {exp.trim()}
                                  </Badge>
                                )
                              )}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedItem(item)}
                            className="h-8 px-2.5 text-xs rounded-lg border-line text-navy-800"
                          >
                            <Eye className="h-3.5 w-3.5 mr-1" />
                            Profile
                          </Button>

                          {item.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleApprove(item)}
                                className="h-8 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg gap-1"
                              >
                                <Check className="h-3.5 w-3.5" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setRejectingItem(item);
                                  setRejectReason("");
                                }}
                                className="h-8 px-3 text-xs text-rose-600 hover:bg-rose-50 border-rose-200 rounded-lg gap-1"
                              >
                                <X className="h-3.5 w-3.5" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-line shadow-navy-soft rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="font-serif text-lg text-navy-950">
                  Student & Alumni Mentorship Requests
                </CardTitle>
                <CardDescription className="text-xs">
                  Review mentorship booking requests. Approved inquiries are coordinated directly with the designated mentor.
                </CardDescription>
              </div>
              <Send className="h-5 w-5 text-navy-800" />
            </div>
          </CardHeader>
          <CardContent>
            {requests.length === 0 ? (
              <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
                <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
                No mentorship requests submitted.
              </div>
            ) : (
              <div className="space-y-4">
                {requests.map((item) => {
                  const p = item.payload || {};
                  const student = p.studentName || item.submittedBy || "Student";

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-xl border transition-all ${
                        item.status === "pending"
                          ? "border-amber-200/80 bg-amber-50/30"
                          : "border-line bg-card"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-sm text-navy-950">{student}</span>
                            <span className="text-xs font-semibold text-navy-800">
                              Seeking Guidance from: {p.mentorName || "Designated Mentor"}
                            </span>
                            <StatusBadge status={item.status} size="sm" />
                          </div>

                          <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                            {p.batch && <span>Class of {p.batch}</span>}
                            {p.course && <span>• {p.course}</span>}
                            {p.targetRole && <span>• Target: {p.targetRole}</span>}
                            <span>• Sent on {item.createdAt}</span>
                          </div>

                          {p.message && (
                            <p className="mt-2 text-xs text-ink/85 italic bg-slate-50 p-2.5 rounded-lg border border-line">
                              &quot;{p.message}&quot;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                          {item.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleApprove(item)}
                              className="h-8 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg gap-1"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Acknowledge & Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Detail Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedItem.status} size="sm" />
                <Badge variant="outline" className="text-[10px]">
                  {selectedItem.type}
                </Badge>
              </div>
              <DialogTitle className="font-serif text-xl text-navy-950 mt-1">
                {selectedItem.payload?.name || selectedItem.payload?.studentName}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Submission ID: {selectedItem.id} • Date: {selectedItem.createdAt}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-line">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Designation & Org</span>
                  <span className="font-medium text-navy-950">
                    {selectedItem.payload?.role || selectedItem.payload?.targetRole} @ {selectedItem.payload?.company || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Domain / Field</span>
                  <span className="font-medium text-navy-950">{selectedItem.payload?.domain || "Technology"}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Session Cadence & Mode</span>
                  <span className="font-medium text-navy-950">
                    {selectedItem.payload?.preferredFrequency || "Bi-weekly"} • {selectedItem.payload?.mode || "Virtual"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Experience</span>
                  <span className="font-medium text-navy-950">{selectedItem.payload?.experienceYears || 5} Years</span>
                </div>
              </div>

              {selectedItem.payload?.bio && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block mb-1">Mentor Statement</span>
                  <p className="text-ink/80 leading-relaxed bg-white p-3 rounded-xl border border-line">
                    {selectedItem.payload.bio}
                  </p>
                </div>
              )}
            </div>

            <DialogFooter>
              {selectedItem.status === "pending" && (
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRejectingItem(selectedItem);
                      setRejectReason("");
                    }}
                    className="text-xs text-rose-600 hover:bg-rose-50 border-rose-200"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleApprove(selectedItem)}
                    className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
                  >
                    Approve Application
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reject Modal */}
      {rejectingItem && (
        <Dialog open={!!rejectingItem} onOpenChange={(open) => !open && setRejectingItem(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg text-rose-700 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Reject Mentorship Application
              </DialogTitle>
              <DialogDescription className="text-xs">
                Specify why this mentorship entry was rejected.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <label className="text-xs font-semibold text-navy-950 block">Rejection Reason</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection..."
                className="text-xs min-h-[90px] rounded-xl"
              />
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" size="sm" onClick={() => setRejectingItem(null)} className="text-xs">
                Cancel
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleReject}
                className="text-xs bg-rose-600 hover:bg-rose-700 font-semibold"
              >
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

