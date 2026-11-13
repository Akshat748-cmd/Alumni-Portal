"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  MessageSquare,
  Search,
  Send,
  MoreVertical,
  ShieldAlert,
  Lock,
  Unlock,
  ArrowLeft,
  Sparkles,
  Check,
  CheckCheck,
  Clock,
  Briefcase,
  GraduationCap,
  Plus,
  AlertCircle,
  X,
} from "lucide-react";
import { AvatarInitials } from "@/components/common/AvatarInitials";
import { EmptyState } from "@/components/common/EmptyState";
import { usePortalStore } from "@/store/portal";
import { ChatConversation, ChatMessage } from "@/data/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const REPORT_REASONS = [
  "Spam or unsolicited marketing",
  "Inappropriate or offensive behavior",
  "Misleading job vacancy details",
  "Harassment or unverified requests",
  "Other platform violation",
];

function MessagesContent() {
  const searchParams = useSearchParams();
  const startWithParam = searchParams.get("startWith");
  const nameParam = searchParams.get("name");
  const convParam = searchParams.get("conv");

  const {
    currentUser,
    conversations,
    messages,
    startConversation,
    sendMessage,
    markConversationRead,
    reportConversation,
    blockUser,
    unblockUser,
    alumni,
    students,
  } = usePortalStore();

  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Mobile navigation: whether thread is open on mobile
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false);

  // New message modal state
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [newChatSearch, setNewChatSearch] = useState("");

  // Report modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState(REPORT_REASONS[0]);
  const [reportNotes, setReportNotes] = useState("");

  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Ensure body scroll is locked and window stays at top when opening messages
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      document.body.style.overflow = prevOverflow;
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Initialize or select conversation from URL
  useEffect(() => {
    if (!currentUser) return;

    if (startWithParam) {
      const convId = startConversation(startWithParam);
      setActiveConvId(convId);
      setMobileThreadOpen(true);
    } else if (convParam) {
      setActiveConvId(convParam);
      setMobileThreadOpen(true);
    } else if (conversations.length > 0 && !activeConvId) {
      setActiveConvId(conversations[0].id);
    }
  }, [currentUser, startWithParam, convParam, conversations, activeConvId, startConversation, nameParam]);

  // Mark conversation read on selection
  useEffect(() => {
    if (activeConvId) {
      markConversationRead(activeConvId);
    }
  }, [activeConvId, markConversationRead]);

  // Scroll ONLY the internal chat container to bottom (never scroll the main window/page!)
  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages, activeConvId, isTyping]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-ivory text-ink flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-line shadow-xl text-center">
          <div className="h-14 w-14 rounded-2xl bg-navy-950 text-gold-300 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-7 w-7 text-gold-300" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-navy-950 mb-2">
            Sign In to Access Messages
          </h2>
          <p className="text-xs text-muted mb-6">
            Opportunities Network direct messaging connects students with alumni hiring mentors.
          </p>
          <Link
            href="/join/auth"
            className="w-full py-3 rounded-xl bg-navy-950 text-gold-300 font-bold text-sm block"
          >
            Sign In or Try Evaluator Demo
          </Link>
        </div>
      </div>
    );
  }

  const isStudent = currentUser.role === "student";

  // Filter conversations by search
  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const other = c.participants.find((p) => p.id !== currentUser.id);
    return (
      other?.name.toLowerCase().includes(q) ||
      other?.role.toLowerCase().includes(q) ||
      c.jobContext?.jobTitle.toLowerCase().includes(q) ||
      c.jobContext?.company.toLowerCase().includes(q) ||
      (c.lastMessage && c.lastMessage.toLowerCase().includes(q))
    );
  });

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const activeOtherParticipant = activeConversation?.participants.find(
    (p) => p.id !== currentUser.id
  );
  const activeMessages = activeConvId ? messages[activeConvId] || [] : [];
  const isBlocked = activeConversation?.isBlocked;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeConvId || !inputText.trim() || isBlocked) return;

    const textToSend = inputText.trim();
    setInputText("");
    sendMessage(activeConvId, textToSend);

    // Simulate typing indicator
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleReportSubmit = () => {
    if (!activeConvId || !activeOtherParticipant) return;
    reportConversation(
      activeConvId,
      activeOtherParticipant.id,
      reportReason,
      reportNotes.trim() || "No additional notes provided"
    );
    toast.success("Conversation reported to Alumni Secretariat for safety audit.");
    setReportModalOpen(false);
    setReportNotes("");
  };

  const handleToggleBlock = () => {
    if (!activeConvId || !activeOtherParticipant) return;
    if (isBlocked) {
      unblockUser(activeOtherParticipant.id);
      toast.success(`${activeOtherParticipant.name} unblocked.`);
    } else {
      if (confirm(`Block ${activeOtherParticipant.name}? They will no longer be able to message you.`)) {
        blockUser(activeOtherParticipant.id);
        toast.info(`${activeOtherParticipant.name} blocked.`);
      }
    }
  };

  // Directory users for New Message dialog
  // Assumption: students can message alumni; alumni can message alumni and students; students CANNOT message students.
  const eligibleRecipients = isStudent
    ? alumni.map((a) => ({ id: a.id, name: a.name, role: "alumnus" as const, subtitle: `${a.designation} @ ${a.company}` }))
    : [
        ...alumni.filter((a) => a.id !== currentUser.id).map((a) => ({ id: a.id, name: a.name, role: "alumnus" as const, subtitle: `${a.designation} @ ${a.company}` })),
        ...students.map((s) => ({ id: s.id, name: s.name, role: "student" as const, subtitle: `${s.course} (${s.yearOfStudy})` })),
      ];

  const filteredRecipients = eligibleRecipients.filter((r) =>
    r.name.toLowerCase().includes(newChatSearch.toLowerCase()) ||
    r.subtitle.toLowerCase().includes(newChatSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 top-0 pt-[68px] sm:pt-[72px] flex flex-col bg-ivory overflow-hidden z-20">
      {/* SIMULATED EVALUATION NOTICE BANNER */}
      <div className="shrink-0 bg-navy-950 border-b border-gold-500/30 px-4 py-2 text-center text-xs text-gold-300 flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-gold-400 shrink-0" />
        <span>
          <strong>Evaluation Mode:</strong> Messages receive realistic simulated alumni/student replies within 2 seconds.
        </span>
      </div>

      <div className="flex-1 min-h-0 container mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-3 max-w-7xl flex flex-col">
        {/* MAIN TWO-PANE CHAT CONTAINER (LOCKED VIEWPORT) */}
        <div className="flex-1 min-h-0 bg-white rounded-3xl border border-line shadow-xl overflow-hidden flex h-full">
          {/* LEFT PANE: CONVERSATION LIST */}
          <div
            className={`w-full md:w-80 lg:w-96 border-r border-line flex flex-col bg-ivory/30 min-h-0 h-full ${
              mobileThreadOpen ? "hidden md:flex" : "flex"
            }`}
          >
            {/* LEFT HEADER */}
            <div className="shrink-0 p-4 border-b border-line bg-white flex items-center justify-between">
              <div>
                <h1 className="text-lg font-serif font-bold text-navy-950 flex items-center gap-2">
                  <span>Direct Messages</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gold-400/20 text-navy-950 font-sans font-bold">
                    {conversations.length}
                  </span>
                </h1>
                <p className="text-[11px] text-muted">Signed in as {currentUser.name}</p>
              </div>

              <button
                type="button"
                onClick={() => setNewChatModalOpen(true)}
                className="p-2 rounded-xl bg-navy-950 text-gold-300 hover:bg-navy-900 transition-colors shadow-sm"
                title="Start a new message"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* SEARCH BOX */}
            <div className="shrink-0 p-3 border-b border-line bg-white/70">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search participants or context..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-xl border border-line bg-white text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/30"
                />
              </div>
            </div>

            {/* CONVERSATION LIST ITEMS */}
            <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-line/60">
              {filteredConversations.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted">
                  No conversations match your search.
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const other = conv.participants.find((p) => p.id !== currentUser.id);
                  const unread = conv.unreadCount[currentUser.id] || 0;
                  const isSelected = conv.id === activeConvId;

                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => {
                        setActiveConvId(conv.id);
                        setMobileThreadOpen(true);
                      }}
                      className={`w-full p-3.5 text-left transition-all flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-navy-900/5 border-l-4 border-l-gold-500"
                          : "hover:bg-ivory/80"
                      }`}
                    >
                      <AvatarInitials name={other?.name || "Member"} size="md" className="shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-xs sm:text-sm text-navy-950 truncate">
                            {other?.name}
                          </span>
                          <span suppressHydrationWarning className="text-[10px] text-muted shrink-0">
                            {conv.lastMessageAt ? new Date(conv.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                              other?.role === "student"
                                ? "bg-amber-100 text-amber-900"
                                : "bg-navy-100 text-navy-900"
                            }`}
                          >
                            {other?.role}
                          </span>
                          {conv.jobContext && (
                            <span className="text-[10px] text-muted truncate">
                              • {conv.jobContext.jobTitle}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-muted truncate leading-relaxed">
                          {conv.lastMessage || "No messages yet"}
                        </p>
                      </div>

                      {unread > 0 && (
                        <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-gold-500 text-navy-950 font-extrabold text-[10px] flex items-center justify-center shrink-0">
                          {unread}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT PANE: THREAD VIEW */}
          <div
            className={`flex-1 min-h-0 flex flex-col bg-white h-full ${
              !mobileThreadOpen ? "hidden md:flex" : "flex"
            }`}
          >
            {activeConversation && activeOtherParticipant ? (
              <>
                {/* THREAD TOP HEADER */}
                <div className="shrink-0 p-3 sm:p-4 border-b border-line bg-white flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => setMobileThreadOpen(false)}
                      className="md:hidden p-1.5 -ml-1 text-muted hover:text-navy-950"
                      aria-label="Back to conversations"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>

                    <AvatarInitials name={activeOtherParticipant.name} size="md" className="shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-serif font-bold text-sm sm:text-base text-navy-950 truncate">
                          {activeOtherParticipant.name}
                        </h2>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            activeOtherParticipant.role === "student"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-navy-100 text-navy-900"
                          }`}
                        >
                          {activeOtherParticipant.role}
                        </span>
                      </div>
                      {activeConversation.jobContext && (
                        <div className="text-[11px] text-muted truncate">
                          Context: <strong className="text-navy-950 font-semibold">{activeConversation.jobContext.jobTitle} ({activeConversation.jobContext.company})</strong>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* THREAD ACTIONS: REPORT & BLOCK */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => setReportModalOpen(true)}
                      className="p-2 rounded-xl text-muted hover:text-amber-700 hover:bg-amber-50 text-xs font-semibold flex items-center gap-1"
                      title="Report Conversation"
                    >
                      <ShieldAlert className="h-4 w-4" />
                      <span className="hidden sm:inline">Report</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleBlock}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                        isBlocked
                          ? "bg-red-50 text-red-700 border border-red-200"
                          : "text-muted hover:text-red-700 hover:bg-red-50"
                      }`}
                      title={isBlocked ? "Unblock user" : "Block user"}
                    >
                      {isBlocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                      <span className="hidden sm:inline">{isBlocked ? "Unblock" : "Block"}</span>
                    </button>
                  </div>
                </div>

                {/* BLOCKED BANNER */}
                {isBlocked && (
                  <div className="shrink-0 bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      You have blocked this conversation. Neither party can send new messages.
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleBlock}
                      className="font-bold underline hover:text-red-950"
                    >
                      Unblock
                    </button>
                  </div>
                )}

                {/* MESSAGE STREAM (INTERNAL SCROLL ONLY) */}
                <div
                  ref={messageContainerRef}
                  className="flex-1 min-h-0 p-4 sm:p-6 overflow-y-auto space-y-4 bg-ivory/20 scroll-smooth"
                  data-lenis-prevent
                >
                  {activeMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center p-8 text-muted text-xs">
                      Send a message to start this connection.
                    </div>
                  ) : (
                    activeMessages.map((msg) => {
                      const isMe = msg.senderId === currentUser.id;

                      return (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                              isMe
                                ? "bg-navy-950 text-white rounded-br-none"
                                : "bg-white text-navy-950 border border-line rounded-bl-none"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                          </div>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-muted px-1">
                            <span suppressHydrationWarning>
                              {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            {isMe && (
                              <CheckCheck className="h-3 w-3 text-gold-500 inline" />
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}

                  {/* TYPING INDICATOR */}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-xs text-muted italic">
                      <AvatarInitials name={activeOtherParticipant.name} size="sm" />
                      <div className="p-2.5 rounded-2xl bg-white border border-line text-muted flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse delay-150" />
                        <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse delay-300" />
                        <span className="ml-1 text-[11px]">{activeOtherParticipant.name} is typing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* COMPOSER (STICKY AT BOTTOM) */}
                <div className="shrink-0 p-3 sm:p-4 border-t border-line bg-white">
                  {isBlocked ? (
                    <div className="text-center p-3 text-xs text-muted bg-gray-50 rounded-xl">
                      Composer disabled because conversation is blocked.
                    </div>
                  ) : (
                    <form onSubmit={handleSendMessage} className="space-y-2">
                      <div className="relative">
                        <textarea
                          rows={2}
                          maxLength={1000}
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={`Message ${activeOtherParticipant.name}... (Press Enter to send)`}
                          className="w-full p-3 pr-20 rounded-2xl border border-line text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 resize-none bg-ivory/30"
                        />
                        <button
                          type="submit"
                          disabled={!inputText.trim()}
                          className={`absolute right-3 bottom-3 p-2 rounded-xl transition-all ${
                            inputText.trim()
                              ? "bg-navy-950 text-gold-300 hover:bg-navy-900 shadow-sm cursor-pointer"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          }`}
                          aria-label="Send message"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted px-1">
                        <span>Press Enter to send • Shift + Enter for new line</span>
                        <span>{inputText.length} / 1000</span>
                      </div>
                    </form>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <EmptyState
                  title="Select a Conversation"
                  description="Choose an existing chat thread or start a new conversation with an alumnus or candidate."
                  actionLabel="Start New Conversation"
                  onAction={() => setNewChatModalOpen(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NEW MESSAGE MODAL */}
      <Dialog open={newChatModalOpen} onOpenChange={setNewChatModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6" data-lenis-prevent>
          <DialogHeader className="border-b border-line pb-3">
            <DialogTitle className="text-lg font-serif font-bold text-navy-950">
              New Message
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              {isStudent
                ? "Connect with verified alumni for career advice or job referrals."
                : "Message alumni colleagues or student applicants."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Search member by name or role..."
                value={newChatSearch}
                onChange={(e) => setNewChatSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-gold-500/30"
              />
            </div>

            <div className="max-h-60 overflow-y-auto divide-y divide-line/60">
              {filteredRecipients.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted">
                  No matching members found.
                </div>
              ) : (
                filteredRecipients.map((rec) => (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => {
                      const convId = startConversation(rec.id);
                      setActiveConvId(convId);
                      setMobileThreadOpen(true);
                      setNewChatModalOpen(false);
                      toast.success(`Conversation ready with ${rec.name}`);
                    }}
                    className="w-full p-3 text-left hover:bg-ivory flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <AvatarInitials name={rec.name} size="sm" />
                      <div className="min-w-0">
                        <div className="font-bold text-xs text-navy-950 truncate">{rec.name}</div>
                        <div className="text-[11px] text-muted truncate">{rec.subtitle}</div>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-navy-100 text-navy-900 shrink-0">
                      {rec.role}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* REPORT CONVERSATION MODAL */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6" data-lenis-prevent>
          <DialogHeader className="border-b border-line pb-3">
            <DialogTitle className="text-lg font-serif font-bold text-navy-950 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-red-600" />
              <span>Report Conversation</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-muted">
              Reports are flagged directly to the Secretariat moderation dashboard.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                Violation Reason
              </label>
              <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-line text-xs bg-white focus:outline-none focus:ring-2 focus:ring-red-500/30"
              >
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-navy-950 uppercase tracking-wider mb-1.5">
                Additional Details (Optional)
              </label>
              <textarea
                rows={3}
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                placeholder="Describe what occurred..."
                className="w-full p-2.5 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-red-500/30"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setReportModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-navy-950"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReportSubmit}
                className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function MessagesPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-ivory flex items-center justify-center text-xs font-mono text-muted">
          Loading Opportunities Network Messages...
        </div>
      }
    >
      <MessagesContent />
    </React.Suspense>
  );
}
