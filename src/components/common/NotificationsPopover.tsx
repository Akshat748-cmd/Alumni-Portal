"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  Briefcase,
  UserCheck,
  MessageSquare,
  Sparkles,
  Info,
  ChevronRight,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePortalStore } from "@/store/portal";
import { cn } from "@/lib/utils";
import { PortalNotification } from "@/data/types";

export function NotificationsPopover({ className = "" }: { className?: string }) {
  const router = useRouter();
  const { currentUser, notifications, markNotificationsRead, markNotificationAsRead } = usePortalStore();
  const [open, setOpen] = useState(false);

  if (!currentUser) return null;

  const isStudent = currentUser.role === "student";

  // Strict role separation:
  // Alumnus portal: ONLY alumnus notifications (never student applications/referrals meant for students)
  // Student portal: ONLY student notifications (never employer candidate alerts)
  const userNotifs = notifications.filter((n) => {
    if (isStudent) {
      if (n.targetRole === "alumnus" || n.userId === "alm-1" || n.userId?.startsWith("alm-")) {
        return false;
      }
      return (
        n.userId === currentUser.id ||
        n.userId === "stu-1" ||
        n.userId?.startsWith("stu-") ||
        n.targetRole === "student" ||
        n.userId === "all"
      );
    } else {
      if (n.targetRole === "student" || n.userId === "stu-1" || n.userId?.startsWith("stu-")) {
        return false;
      }
      return (
        n.userId === currentUser.id ||
        n.userId === "alm-1" ||
        n.userId?.startsWith("alm-") ||
        n.targetRole === "alumnus" ||
        n.userId === "all"
      );
    }
  });

  const unreadCount = userNotifs.filter((n) => !n.read).length;

  const handleNotifClick = (notif: PortalNotification) => {
    if (!notif.read) {
      markNotificationAsRead(notif.id);
    }
    setOpen(false);
    if (notif.link) {
      router.push(notif.link);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "application":
        return <Briefcase className="h-4 w-4 text-emerald-400 shrink-0" />;
      case "referral":
        return <UserCheck className="h-4 w-4 text-gold-400 shrink-0" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-sky-400 shrink-0" />;
      case "job":
        return <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />;
      default:
        return <Info className="h-4 w-4 text-slate-400 shrink-0" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          "relative flex items-center justify-center h-9 w-9 rounded-xl bg-navy-900 border border-navy-700/80 text-ivory/80 hover:text-gold-300 hover:bg-navy-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gold-400/50 cursor-pointer",
          className
        )}
        aria-label={`Notifications (${unreadCount} unread)`}
      >
        <Bell className="h-4 w-4 text-gold-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-navy-950 shadow-xs animate-pulse">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 sm:w-96 p-0 bg-navy-900 border-navy-700 text-ivory rounded-2xl shadow-2xl z-50 overflow-hidden"
        data-lenis-prevent
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-navy-800 bg-navy-950/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-ivory">
              {isStudent ? "Student Notifications" : "Alumni Notifications"}
            </span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-gold-500/20 text-gold-300 text-[10px] font-semibold px-2 py-0.5 border border-gold-500/30">
                {unreadCount} new
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={() => markNotificationsRead()}
              className="flex items-center gap-1 text-[11px] font-medium text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
            >
              <CheckCheck className="h-3 w-3" />
              <span>Mark all read</span>
            </button>
          )}
        </div>

        <div className="max-h-[380px] overflow-y-auto overscroll-contain divide-y divide-navy-800/60 scrollbar-thin">
          {userNotifs.length === 0 ? (
            <div className="py-10 text-center px-4">
              <Bell className="h-8 w-8 text-navy-700 mx-auto mb-2" />
              <p className="text-xs font-medium text-ivory/60">No notifications yet</p>
              <p className="text-[11px] text-ivory/40 mt-0.5">
                {isStudent
                  ? "Updates on your applications, mentorship, and referrals will appear here."
                  : "Updates on candidate applications, student referrals, and messages will appear here."}
              </p>
            </div>
          ) : (
            userNotifs.map((notif) => (
              <div
                key={notif.id}
                className={cn(
                  "p-3.5 transition-colors flex items-start gap-3 hover:bg-navy-800/80 cursor-pointer group",
                  !notif.read && "bg-navy-800/40"
                )}
                onClick={() => handleNotifClick(notif)}
              >
                <div className="mt-0.5">{getIcon(notif.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="text-xs font-bold text-ivory truncate group-hover:text-gold-300 transition-colors">
                      {notif.title}
                    </h5>
                    {!notif.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-400 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-ivory/70 line-clamp-2 mt-0.5 leading-relaxed">
                    {notif.message}
                  </p>
                  {notif.link && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold text-gold-400 group-hover:text-gold-300 mt-2 transition-colors">
                      <span>View details</span>
                      <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
