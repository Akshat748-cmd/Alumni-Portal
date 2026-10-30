"use client";

import React, { useState } from "react";
import {
  Building2,
  CheckCircle2,
  XCircle,
  Eye,
  Check,
  X,
  Globe,
  Tag,
  MapPin,
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

export function AdminBusinessesQueue() {
  const { submittedQueue, approveItem, rejectItem } = usePortalStore();

  const [selectedItem, setSelectedItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectingItem, setRejectingItem] = useState<SubmittedQueueItem | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const items = submittedQueue.filter((q) => q.type === "business");

  const handleApprove = (item: SubmittedQueueItem) => {
    approveItem("business", item.id);
    const bizName = item.payload?.businessName || item.payload?.name || "Business";
    toast.success(`Business listing approved!`, {
      description: `"${bizName}" is now featured in the Alumni Business Directory.`,
    });
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  const handleReject = () => {
    if (!rejectingItem) return;
    rejectItem("business", rejectingItem.id, rejectReason || "Rejected by business directory committee");
    toast.error(`Business listing rejected.`);
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
                Alumni Business & Venture Directory Queue
              </CardTitle>
              <CardDescription className="text-xs">
                Review verified enterprises, startups, and consulting firms founded by alumni offering community benefits.
              </CardDescription>
            </div>
            <Building2 className="h-5 w-5 text-teal-600" />
          </div>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2 opacity-80" />
              No business directory listings awaiting review.
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const p = item.payload || {};
                const name = p.businessName || p.name || "Alumni Business";
                const owner = p.ownerName || p.founderName || item.submittedBy || "Founder";

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
                          <StatusBadge status={item.status} size="sm" />
                          {p.category && (
                            <Badge variant="outline" className="text-[10px]">
                              {p.category}
                            </Badge>
                          )}
                        </div>

                        <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                          <span>Founded by <span className="font-semibold text-navy-900">{owner}</span></span>
                          {p.batch && <span>(Class of {p.batch})</span>}
                          {p.city && (
                            <span className="flex items-center gap-0.5">
                              • <MapPin className="h-3 w-3" /> {p.city}, {p.state || "India"}
                            </span>
                          )}
                          <span>• Submitted {item.createdAt}</span>
                        </div>

                        {p.offerText && (
                          <div className="mt-2 text-xs text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-medium">
                            <Tag className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                            <span>{p.offerText}</span>
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
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inspect Dialog */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
          <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <StatusBadge status={selectedItem.status} size="sm" />
                <Badge variant="outline" className="text-[10px]">
                  {selectedItem.payload?.category || "Business"}
                </Badge>
              </div>
              <DialogTitle className="font-serif text-xl text-navy-950 mt-1">
                {selectedItem.payload?.businessName || selectedItem.payload?.name}
              </DialogTitle>
              <DialogDescription className="text-xs">
                Founded by {selectedItem.payload?.ownerName || selectedItem.payload?.founderName} (Class of {selectedItem.payload?.batch || "N/A"})
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-2 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 border border-line">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Website URL</span>
                  <a
                    href={selectedItem.payload?.website || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline flex items-center gap-1 truncate"
                  >
                    <Globe className="h-3 w-3 shrink-0" />
                    {selectedItem.payload?.website || "None provided"}
                  </a>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block">Headquarters</span>
                  <span className="font-medium text-navy-950">
                    {selectedItem.payload?.city || "Jaipur"}, {selectedItem.payload?.state || "Rajasthan"}
                  </span>
                </div>
              </div>

              {selectedItem.payload?.description && (
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted block mb-1">Company Description</span>
                  <p className="text-ink/80 leading-relaxed bg-white p-3 rounded-xl border border-line">
                    {selectedItem.payload.description}
                  </p>
                </div>
              )}

              {selectedItem.payload?.offerText && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block mb-0.5">
                    Exclusive Alumni Discount / Privileges
                  </span>
                  <p className="font-medium">{selectedItem.payload.offerText}</p>
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
                    Approve Business Listing
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
                Reject Business Submission
              </DialogTitle>
              <DialogDescription className="text-xs">
                Provide a justification for the rejection.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 py-2">
              <label className="text-xs font-semibold text-navy-950 block">Rejection Reason</label>
              <Textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason..."
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

