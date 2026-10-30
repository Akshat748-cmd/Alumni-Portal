"use client";

import React, { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Eye,
  Check,
  X,
  MapPin,
  Building,
  DollarSign,
  Mail,
  ExternalLink,
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

export function AdminOpportunitiesQueue() {
  const { submittedQueue, approveItem, rejectItem } = usePortalStore();

  const [selectedItem, setSelectedItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectingItem, setRejectingItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const items = submittedQueue.filter((q) => q.type === "opportunity");

  const handleApprove = (item: SubmittedQueueItem) => {
    approveItem("opportunity", item.id);
    toast.success(`Job vacancy approved!`, {
      description: `"${item.payload?.title || "Role"}" at ${item.payload?.company || "Company"} is now live on Career Hub Jobs.`,
    });
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  const handleReject = () => {
    if (!rejectingItem) return;
    rejectItem("opportunity", rejectingItem.id, rejectReason || "Rejected by placement review");
    toast.error(`Job vacancy rejected.`);
    setRejectingItem(null);
    setRejectReason("");
    if (selectedItem?.id === rejectingItem.id) setSelectedItem(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-line shadow-navy-soft rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-lg text-navy-950">
                Career Opportunities & Alumni Job Postings
              </CardTitle>
              <CardDescription className="text-xs">
                Review verified career opportunities, lateral vacancies, and student internships submitted by alumni.
              </CardDescription>
            </div>
            <Briefcase className="h-5 w-5 text-navy-800" />
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
              No job postings awaiting moderation.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const p = item.payload || {};
                const title = p.title || "Career Opening";
                const company = p.company || "Hiring Organization";

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
                          <span className="font-bold text-sm text-navy-950">{title}</span>
                          <span className="text-xs font-semibold text-navy-800">@ {company}</span>
                          <StatusBadge status={item.status} size="sm" />
                          {p.type && (
                            <Badge variant="outline" className="text-[10px]">
                              {p.type}
                            </Badge>
                          )}
                        </div>

                        <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                          {p.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {p.location}
                            </span>
                          )}
                          {p.salaryRange && <span>• {p.salaryRange}</span>}
                          {p.postedByAlumniName && (
                            <span>• Posted by {p.postedByAlumniName} ({p.postedByBatch || "Alum"})</span>
                          )}
                          <span>• Received {item.createdAt}</span>
                        </div>

                        {p.description && (
                          <p className="mt-2 text-xs text-ink/80 line-clamp-2">
                            {p.description}
                          </p>
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
                          Review
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

      {/* Detail Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedItem.status} size="sm" />
                <Badge variant="outline" className="text-[10px]">
                  {selectedItem.payload?.type || "Full-time"}
                </Badge>
              </div>
              <DialogTitle className="font-serif text-xl text-navy-950 mt-1">
                {selectedItem.payload?.title} at {selectedItem.payload?.company}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Posted by {selectedItem.payload?.postedByAlumniName || selectedItem.submittedBy} • Received on {selectedItem.createdAt}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-line">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Location / Mode</span>
                  <span className="font-medium text-navy-950">
                    {selectedItem.payload?.location || "Jaipur / Remote"} ({selectedItem.payload?.workplace || "On-site"})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Compensation / CTC</span>
                  <span className="font-medium text-navy-950">{selectedItem.payload?.salaryRange || "Industry Standard"}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Experience Level</span>
                  <span className="font-medium text-navy-950">{selectedItem.payload?.experienceLevel || "All Levels"}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Application Route</span>
                  <span className="font-medium text-navy-950 truncate block">
                    {selectedItem.payload?.contactEmail || selectedItem.payload?.applyUrl || "Email / Portal"}
                  </span>
                </div>
              </div>

              {selectedItem.payload?.description && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block mb-1">Role Description</span>
                  <p className="text-ink/80 leading-relaxed bg-white p-3 rounded-xl border border-line whitespace-pre-wrap">
                    {selectedItem.payload.description}
                  </p>
                </div>
              )}

              {selectedItem.payload?.requirements && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block mb-1.5">Key Requirements</span>
                  <ul className="list-disc pl-5 space-y-1 text-ink/85">
                    {(Array.isArray(selectedItem.payload.requirements)
                      ? selectedItem.payload.requirements
                      : String(selectedItem.payload.requirements).split("\n")
                    ).map((req: string, idx: number) => (
                      <li key={idx}>{req.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedItem.adminNote && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                  <span className="font-semibold block">Moderation Note:</span>
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
                    Approve Job Opening
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
                Reject Opportunity Posting
              </DialogTitle>
              <DialogDescription className="text-xs">
                Specify why this job opening does not meet institutional guidelines.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <label className="text-xs font-semibold text-navy-950 block">Rejection Reason</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Incomplete application instructions or unverifiable company domain."
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

