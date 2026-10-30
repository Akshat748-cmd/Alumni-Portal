"use client";

import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  XCircle,
  Eye,
  Check,
  X,
  Quote,
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

export function AdminAchievementsQueue() {
  const { submittedQueue, approveItem, rejectItem } = usePortalStore();

  const [selectedItem, setSelectedItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectingItem, setRejectingItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const items = submittedQueue.filter((q) => q.type === "achievement");

  const handleApprove = (item: SubmittedQueueItem) => {
    approveItem("achievement", item.id);
    toast.success(`Achievement story approved!`, {
      description: `"${item.payload?.title || "Story"}" has been published to Alumni Spotlight.`,
    });
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  const handleReject = () => {
    if (!rejectingItem) return;
    rejectItem("achievement", rejectingItem.id, rejectReason || "Rejected by editorial moderation");
    toast.error(`Achievement story rejected.`, {
      description: rejectReason || "Marked as rejected.",
    });
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
                Alumni Spotlight & Achievement Stories
              </CardTitle>
              <CardDescription className="text-xs">
                Editorial submissions celebrating alumni breakthroughs, venture milestones, and awards. Approved stories publish immediately to Alumni Spotlight.
              </CardDescription>
            </div>
            <Award className="h-5 w-5 text-gold-500" />
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
              No achievement stories in the queue.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const p = item.payload || {};
                const title = p.title || "Distinguished Alumni Milestone";
                const author = p.alumniName || p.name || item.submittedBy || "Alumnus";

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
                          <StatusBadge status={item.status} size="sm" />
                          {p.category && (
                            <Badge variant="outline" className="text-[10px] text-gold-800 border-gold-300">
                              {p.category}
                            </Badge>
                          )}
                        </div>

                        <div className="text-xs text-muted mt-1">
                          By <span className="font-semibold text-navy-900">{author}</span>
                          {p.batch && <span> • Class of {p.batch}</span>}
                          {p.degree && <span> • {p.degree}</span>}
                          <span> • Submitted on {item.createdAt}</span>
                        </div>

                        {p.pullQuote && (
                          <div className="mt-2 text-xs italic text-ink/80 flex items-start gap-1.5 bg-slate-50 p-2 rounded-lg border border-line/60">
                            <Quote className="h-3 w-3 text-gold-500 shrink-0 mt-0.5" />
                            <span>&quot;{p.pullQuote}&quot;</span>
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
                          Preview
                        </Button>

                        {item.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(item)}
                              className="h-8 px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-lg gap-1"
                            >
                              <Check className="h-3.5 w-3.5" />
                              Publish
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

      {/* Inspect & Preview Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedItem.status} size="sm" />
                {selectedItem.payload?.category && (
                  <Badge variant="outline" className="text-[10px]">
                    {selectedItem.payload.category}
                  </Badge>
                )}
              </div>
              <DialogTitle className="font-serif text-xl text-navy-950 mt-1">
                {selectedItem.payload?.title || "Alumni Achievement"}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Submitted by {selectedItem.payload?.alumniName || selectedItem.submittedBy} • Received on {selectedItem.createdAt}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              {selectedItem.payload?.pullQuote && (
                <div className="p-3 rounded-xl bg-gold-50/60 border border-gold-200 text-navy-950 italic flex items-start gap-2">
                  <Quote className="h-4 w-4 text-gold-600 shrink-0 mt-0.5" />
                  <p className="font-serif font-medium">{selectedItem.payload.pullQuote}</p>
                </div>
              )}

              {selectedItem.payload?.summary && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block mb-1">Executive Summary</span>
                  <p className="text-ink/90 leading-relaxed bg-slate-50 p-3 rounded-xl border border-line">
                    {selectedItem.payload.summary}
                  </p>
                </div>
              )}

              {selectedItem.payload?.story && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block mb-1">Full Story Narrative</span>
                  <p className="text-ink/80 leading-relaxed bg-white p-3 rounded-xl border border-line whitespace-pre-wrap">
                    {selectedItem.payload.story}
                  </p>
                </div>
              )}

              {selectedItem.adminNote && (
                <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                  <span className="font-semibold block">Editorial Note:</span>
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
                    Publish to Spotlight
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
                Reject Achievement Story
              </DialogTitle>
              <DialogDescription className="text-xs">
                Provide editorial feedback on why this story cannot be published in its current form.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <label className="text-xs font-semibold text-navy-950 block">Editorial Reason</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="e.g. Requires additional verification of award cohort or higher resolution photograph."
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

