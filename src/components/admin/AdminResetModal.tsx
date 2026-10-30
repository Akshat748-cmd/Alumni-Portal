"use client";

import React from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { usePortalStore } from "@/store/portal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface AdminResetModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminResetModal({ open, onOpenChange }: AdminResetModalProps) {
  const { resetDemo } = usePortalStore();

  const handleConfirmReset = () => {
    resetDemo();
    toast.success("Demo environment restored to initial state!", {
      description: "All pending queues, initial datasets, counters, and tickets have been re-seeded.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Secretariat Demonstration Control
            </span>
          </div>
          <DialogTitle className="font-serif text-xl text-navy-950">
            Reset All Prototype Data?
          </DialogTitle>
          <DialogDescription className="text-xs leading-relaxed pt-2">
            This will purge in-browser localStorage changes, restoring original sample alumni, mock jobs, pending moderation queues, tickets, and default footer links.
          </DialogDescription>
        </DialogHeader>

        <div className="p-3 rounded-xl bg-slate-50 border border-line text-xs text-muted">
          Recommended before conducting a fresh end-to-end client walkthrough or regression verification.
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs rounded-xl"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleConfirmReset}
            className="text-xs rounded-xl bg-rose-600 hover:bg-rose-700 font-semibold gap-1.5"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Confirm & Reset Data
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

