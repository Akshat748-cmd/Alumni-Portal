"use client";

import React, { useState } from "react";
import {
  Users,
  CheckCircle2,
  XCircle,
  Eye,
  Filter,
  Check,
  X,
  ExternalLink,
  MapPin,
  Building,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { usePortalStore, SubmittedQueueItem } from "@/store/portal";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

export function AdminProfilesQueue() {
  const { submittedQueue, approveItem, rejectItem } = usePortalStore();

  const [filterType, setFilterType] = useState<"all" | "registration" | "profile-update">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedItem, setSelectedItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectingItem, setRejectingItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const profileQueue = submittedQueue.filter(
    (q) => q.type === "registration" || q.type === "profile-update" || q.type === "alumni"
  );

  const filteredItems = profileQueue.filter((item) => {
    if (filterType !== "all" && item.type !== filterType) return false;
    if (filterStatus !== "all" && item.status !== filterStatus) return false;
    return true;
  });

  const handleApprove = (item: SubmittedQueueItem) => {
    approveItem(item.type, item.id);
    const applicantName = item.payload?.name || item.payload?.fullName || item.submittedBy || "Alumnus";
    toast.success(`Profile approved for ${applicantName}!`, {
      description: "Record has been updated and is now visible in the Public Alumni Directory.",
    });
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    }
  };

  const handleReject = () => {
    if (!rejectingItem) return;
    rejectItem(rejectingItem.type, rejectingItem.id, rejectReason || "Rejected by administrator review");
    toast.error(`Submission marked as rejected.`, {
      description: rejectReason ? `Reason: ${rejectReason}` : "Notification logged in secretariat record.",
    });
    setRejectingItem(null);
    setRejectReason("");
    if (selectedItem?.id === rejectingItem.id) {
      setSelectedItem(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Filter Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-line shadow-navy-soft">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-muted flex items-center gap-1.5 mr-2">
            <Filter className="h-3.5 w-3.5" /> Filter by:
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterType("all")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === "all" ? "bg-white text-navy-950 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilterType("registration")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === "registration" ? "bg-white text-navy-950 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
              }`}
            >
              Registrations
            </button>
            <button
              onClick={() => setFilterType("profile-update")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === "profile-update" ? "bg-white text-navy-950 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
              }`}
            >
              Updates
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setFilterStatus("all")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === "all" ? "bg-white text-navy-950 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setFilterStatus("pending")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === "pending" ? "bg-amber-100 text-amber-900 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilterStatus("approved")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === "approved" ? "bg-emerald-100 text-emerald-900 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilterStatus("rejected")}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterStatus === "rejected" ? "bg-rose-100 text-rose-900 font-semibold shadow-xs" : "text-muted hover:text-navy-950"
              }`}
            >
              Rejected
            </button>
          </div>
        </div>

        <span className="text-xs font-mono text-muted">
          Showing {filteredItems.length} of {profileQueue.length} records
        </span>
      </div>

      {/* Profile Submissions List */}
      <Card className="border-line shadow-navy-soft rounded-2xl">
        <CardHeader>
          <CardTitle className="font-serif text-lg text-navy-950">
            Alumni Registration & Profile Update Queue
          </CardTitle>
          <CardDescription className="text-xs">
            Review applicant identities, academic records, and career advancements. Approved profiles are immediately indexed in the public Directory.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
              No profile submissions matching current filter criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const p = item.payload || {};
                const name = p.name || p.fullName || item.submittedBy || "Alumnus Applicant";
                const isUpdate = item.type === "profile-update";

                return (
                  <div
                    key={item.id}
                    className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                      item.status === "pending"
                        ? "border-amber-200/80 bg-amber-50/30 hover:border-amber-300"
                        : "border-line bg-card hover:border-navy-200"
                    }`}
                  >
                    <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                      <AvatarInitials name={name} src={p.avatarUrl} size="md" className="shrink-0 mt-1 sm:mt-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-navy-950 truncate">{name}</span>
                          <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                            {isUpdate ? "Profile Update" : "New Registration"}
                          </Badge>
                          <StatusBadge status={item.status} size="sm" />
                        </div>

                        <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                          {p.batch && <span>Class of {p.batch}</span>}
                          {p.course && <span>• {p.course}</span>}
                          {p.city && <span>• {p.city}</span>}
                          <span>• Submitted {item.createdAt}</span>
                        </div>

                        {isUpdate ? (
                          <div className="text-xs text-ink/80 mt-1 font-medium bg-white/70 p-1.5 rounded-lg border border-line/60">
                            <span className="text-navy-900 font-semibold">Update details: </span>
                            {typeof p.changesSummary === "string"
                              ? p.changesSummary
                              : JSON.stringify(p.changesSummary || p.note || "Career and contact details")}
                          </div>
                        ) : (
                          <div className="text-xs text-ink/80 mt-1">
                            {p.designation} at <span className="font-semibold">{p.company}</span>
                            {p.domain && <span className="text-gold-700 ml-1.5">({p.domain})</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedItem(item)}
                        className="h-8 px-2.5 text-xs rounded-lg border-line text-navy-800 hover:bg-slate-100"
                      >
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Details
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
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Inspection Modal */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedItem.status} size="sm" />
                <Badge variant="outline" className="text-[10px] uppercase font-semibold">
                  {selectedItem.type}
                </Badge>
              </div>
              <DialogTitle className="font-serif text-xl text-navy-950 mt-1">
                {selectedItem.payload?.name || selectedItem.payload?.fullName || selectedItem.submittedBy}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Submission ID: {selectedItem.id} • Received on {selectedItem.createdAt}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-line">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Email Address</span>
                  <span className="font-medium text-navy-950">{selectedItem.payload?.email || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Contact Phone</span>
                  <span className="font-medium text-navy-950">{selectedItem.payload?.phone || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Graduation Batch</span>
                  <span className="font-medium text-navy-950">{selectedItem.payload?.batch || "N/A"}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Degree / Course</span>
                  <span className="font-medium text-navy-950">
                    {selectedItem.payload?.course || selectedItem.payload?.degree || "Graduate"}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-line space-y-2">
                <span className="text-[10px] uppercase font-semibold text-muted block">Professional Record</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-muted block text-[11px]">Designation</span>
                    <span className="font-semibold text-navy-950">{selectedItem.payload?.designation || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-muted block text-[11px]">Company / Organization</span>
                    <span className="font-semibold text-navy-950">{selectedItem.payload?.company || "Independent"}</span>
                  </div>
                  <div>
                    <span className="text-muted block text-[11px]">Domain / Specialization</span>
                    <span className="font-semibold text-navy-950">{selectedItem.payload?.domain || "General"}</span>
                  </div>
                  <div>
                    <span className="text-muted block text-[11px]">Location</span>
                    <span className="font-semibold text-navy-950">
                      {selectedItem.payload?.city || selectedItem.payload?.currentCity || "Jaipur"},{" "}
                      {selectedItem.payload?.state || selectedItem.payload?.country || "India"}
                    </span>
                  </div>
                </div>
              </div>

              {selectedItem.payload?.skills && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block mb-1.5">Skills & Expertise</span>
                  <div className="flex flex-wrap gap-1">
                    {(Array.isArray(selectedItem.payload.skills)
                      ? selectedItem.payload.skills
                      : String(selectedItem.payload.skills).split(",")
                    ).map((sk: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-[11px]">
                        {sk.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.payload?.bio && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block mb-1">Professional Bio</span>
                  <p className="text-ink/80 leading-relaxed bg-white p-2.5 rounded-lg border border-line">
                    {selectedItem.payload.bio}
                  </p>
                </div>
              )}

              {selectedItem.payload?.changesSummary && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-amber-800 block mb-1">
                    Proposed Profile Modification Diff
                  </span>
                  <pre className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200 text-amber-950 font-mono text-[11px] whitespace-pre-wrap">
                    {typeof selectedItem.payload.changesSummary === "string"
                      ? selectedItem.payload.changesSummary
                      : JSON.stringify(selectedItem.payload.changesSummary, null, 2)}
                  </pre>
                </div>
              )}

              {selectedItem.adminNote && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                  <span className="font-semibold block">Secretariat Note:</span>
                  {selectedItem.adminNote}
                </div>
              )}
            </div>

            <DialogFooter className="gap-2 sm:gap-0">
              {selectedItem.status === "pending" && (
                <div className="flex items-center gap-2 w-full justify-end">
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
                    Approve Profile
                  </Button>
                </div>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Rejection Note Dialog */}
      {rejectingItem && (
        <Dialog open={!!rejectingItem} onOpenChange={(open) => !open && setRejectingItem(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg text-rose-700 flex items-center gap-2">
                <XCircle className="h-5 w-5" />
                Reject Submission
              </DialogTitle>
              <DialogDescription className="text-xs">
                Provide an administrative note explaining why this profile submission was not approved.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <label className="text-xs font-semibold text-navy-950 block">Rejection Reason / Note</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Incomplete batch information or verification credentials could not be validated."
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

