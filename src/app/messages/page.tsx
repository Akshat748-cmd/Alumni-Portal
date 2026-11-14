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
  Briefcase,
  GraduationCap,
  Plus,
  AlertCircle,
  X,
  Smile,
  Paperclip,
  Mic,
  Phone,
  Video,
  FileText,
  UserCheck,
  CornerDownLeft,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const REPORT_REASONS = [
  "Spam or unsolicited marketing",
  "Inappropriate or offensive behavior",
  "Misleading job vacancy details",
  "Harassment or unverified requests",
  "Other platform violation",
];

const QUICK_EMOJIS = ["👍", "👋", "🎓", "💼", "🙏", "😊", "🔥", "✨", "🤝", "🚀"];

function formatMessageTime(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function formatGroupDate(dateStr: string) {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    if (isToday) return "Today";
    if (isYesterday) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return "Earlier";
  }
}

function MessagesContent() {
  const searchParams = useSearchParams();
  const startWithParam = searchParams.get("startWith");
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const urlParamConsumedRef = useRef<string | null>(null);

  // Ensure body scroll is locked and window stays at top when opening messages
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Auto-resize textarea to fit content (up to max 120px)
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputText]);

  // Initialize or select conversation from URL
  useEffect(() => {
    if (!currentUser) return;

    const currentParamKey = startWithParam ? `startWith:${startWithParam}` : convParam ? `conv:${convParam}` : null;

    if (currentParamKey && urlParamConsumedRef.current !== currentParamKey) {
      urlParamConsumedRef.current = currentParamKey;
      if (startWithParam) {
        const convId = startConversation(startWithParam);
        setActiveConvId(convId);
        setMobileThreadOpen(true);
      } else if (convParam) {
        setActiveConvId(convParam);
        setMobileThreadOpen(true);
      }
    } else if (!activeConvId && conversations.length > 0) {
      setActiveConvId(conversations[0].id);
    }
  }, [currentUser, startWithParam, convParam, conversations, activeConvId, startConversation]);

  // Mark conversation read on selection
  useEffect(() => {
    if (activeConvId) {
      markConversationRead(activeConvId);
    }
  }, [activeConvId, markConversationRead]);

  // Scroll internal chat container to bottom
  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeConvId, isTyping]);

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#efeae2] text-navy-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-line shadow-2xl text-center">
          <div className="h-14 w-14 rounded-2xl bg-[#00a884] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <MessageSquare className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-sans font-bold text-navy-950 mb-2">
            Sign In to Access Messages
          </h2>
          <p className="text-xs text-muted mb-6">
            Opportunities Network direct messaging connects students with alumni mentors in real time.
          </p>
          <Link
            href="/join/auth"
            className="w-full py-3 rounded-xl bg-[#00a884] hover:bg-[#008f6f] text-white font-bold text-sm block transition-colors shadow-md"
          >
            Sign In or Try Evaluator Demo
          </Link>
        </div>
      </div>
    );
  }

  const isStudent = currentUser.role === "student";

  // Helper to determine if a participant is the logged-in user (handles ID mismatch or name variations)
  const isMeMatch = (p: { id: string; name: string }) => {
    if (!currentUser) return false;
    if (p.id === currentUser.id) return true;
    const curName = currentUser.name.toLowerCase().replace(/[^a-z]/g, "");
    const pName = p.name.toLowerCase().replace(/[^a-z]/g, "");
    if (curName && pName && (curName === pName || (curName.includes("vikram") && pName.includes("vikram")))) {
      return true;
    }
    return false;
  };

  // Helper to get the OTHER person in a 2-person conversation
  const getOtherParticipant = (conv: ChatConversation) => {
    const found = conv.participants.find((p) => !isMeMatch(p));
    return found || conv.participants[1] || conv.participants[0];
  };

  // Filter conversations by search
  const filteredConversations = conversations.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const other = getOtherParticipant(c);
    return (
      other?.name.toLowerCase().includes(q) ||
      other?.role.toLowerCase().includes(q) ||
      c.jobContext?.jobTitle.toLowerCase().includes(q) ||
      c.jobContext?.company.toLowerCase().includes(q) ||
      (c.lastMessage && c.lastMessage.toLowerCase().includes(q))
    );
  });

  const activeConversation = conversations.find((c) => c.id === activeConvId);
  const activeOtherParticipant = activeConversation ? getOtherParticipant(activeConversation) : undefined;
  const activeMessages = activeConvId ? messages[activeConvId] || [] : [];
  const isBlocked = activeConversation?.isBlocked;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeConvId || !inputText.trim() || isBlocked) return;

    const textToSend = inputText.trim();
    setInputText("");
    setShowEmojiPicker(false);
    sendMessage(activeConvId, textToSend);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

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

  const handleAddEmoji = (emoji: string) => {
    setInputText((prev) => prev + emoji);
    textareaRef.current?.focus();
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
    <div className="fixed inset-0 top-0 pt-14 lg:pt-16 flex flex-col bg-[#efeae2] overflow-hidden z-20">
      {/* WRAPPER: Edge-to-edge on mobile, sleek WhatsApp Web container on laptop */}
      <div className="flex-1 min-h-0 w-full md:max-w-[1600px] md:mx-auto md:p-3 lg:p-4 flex flex-col">
        {/* MAIN TWO-PANE CHAT CONTAINER */}
        <div className="flex-1 min-h-0 bg-white md:rounded-2xl border-0 md:border md:border-[#d1d7db] md:shadow-xl overflow-hidden flex h-full">
          {/* ========================================================= */}
          {/* LEFT PANE: CONVERSATION LIST (WHATSAPP SIDEBAR)           */}
          {/* ========================================================= */}
          <div
            className={`w-full md:w-80 lg:w-96 shrink-0 border-r border-[#e9edef] flex flex-col bg-white min-h-0 h-full ${
              mobileThreadOpen ? "hidden md:flex" : "flex"
            }`}
          >
            {/* SIDEBAR HEADER */}
            <div className="shrink-0 h-16 px-3.5 sm:px-4 bg-[#f0f2f5] border-b border-[#e9edef] flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <AvatarInitials name={currentUser.name} size="sm" className="ring-2 ring-white shrink-0" />
                <div className="min-w-0">
                  <h1 className="text-sm font-bold text-[#111b21] truncate flex items-center gap-1.5">
                    <span>Chats</span>
                    <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#00a884]/15 text-[#00a884] font-bold tabular-nums">
                      {conversations.length}
                    </span>
                  </h1>
                  <p className="text-[10px] text-[#667781] truncate">Signed in as {currentUser.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setNewChatModalOpen(true)}
                  className="h-9 w-9 rounded-full hover:bg-black/5 text-[#54656f] hover:text-[#111b21] flex items-center justify-center transition-colors cursor-pointer"
                  title="New chat"
                  aria-label="Start new chat"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* SEARCH BOX */}
            <div className="shrink-0 px-3 py-2 bg-white border-b border-[#f0f2f5]">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-4 w-4 text-[#54656f] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search or start new chat"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-8 rounded-lg bg-[#f0f2f5] text-xs text-[#111b21] placeholder:text-[#54656f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#00a884] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-2.5 text-[#54656f] hover:text-[#111b21]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* CONVERSATION LIST ITEMS */}
            <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-[#f0f2f5]">
              {filteredConversations.length === 0 ? (
                <div className="p-8 text-center text-xs text-[#667781]">
                  No chats match your search.
                </div>
              ) : (
                filteredConversations.map((conv) => {
                  const other = getOtherParticipant(conv);
                  const unread = conv.unreadCount[currentUser.id] || 0;
                  const isSelected = conv.id === activeConvId;

                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => {
                        setActiveConvId(conv.id);
                        setMobileThreadOpen(true);
                        if (typeof window !== "undefined") {
                          window.history.replaceState({}, "", `/messages?conv=${conv.id}`);
                        }
                      }}
                      className={`w-full px-3.5 py-3 text-left transition-colors flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#f0f2f5]"
                          : "hover:bg-[#f5f6f6]"
                      }`}
                    >
                      <div className="relative shrink-0">
                        <AvatarInitials name={other?.name || "Member"} size="md" />
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#25d366] border-2 border-white ring-1 ring-black/5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs sm:text-sm text-[#111b21] truncate">
                            {other?.name}
                          </span>
                          <span suppressHydrationWarning className="text-[10px] sm:text-[11px] text-[#667781] shrink-0 tabular-nums">
                            {conv.lastMessageAt ? formatMessageTime(conv.lastMessageAt) : ""}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs text-[#667781] truncate leading-tight flex items-center gap-1">
                            {conv.lastMessage ? (
                              <>
                                <CheckCheck className="h-3 w-3 text-[#53bdeb] shrink-0 inline" />
                                <span className="truncate">{conv.lastMessage}</span>
                              </>
                            ) : (
                              <span className="italic text-[#8696a0]">Tap to chat</span>
                            )}
                          </p>

                          {unread > 0 && (
                            <span className="h-4.5 min-w-[18px] px-1.5 rounded-full bg-[#25d366] text-white font-bold text-[10px] flex items-center justify-center shrink-0 tabular-nums shadow-xs">
                              {unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT PANE: WHATSAPP ACTIVE THREAD VIEW                    */}
          {/* ========================================================= */}
          <div
            className={`flex-1 min-h-0 flex flex-col bg-[#efeae2] relative h-full ${
              !mobileThreadOpen ? "hidden md:flex" : "flex"
            }`}
          >
            {activeConversation && activeOtherParticipant ? (
              <>
                {/* WHATSAPP CHAT HEADER */}
                <div className="shrink-0 h-16 px-3 sm:px-4 bg-[#f0f2f5] border-b border-[#e9edef] flex items-center justify-between gap-2 z-10 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      type="button"
                      onClick={() => setMobileThreadOpen(false)}
                      className="md:hidden p-1.5 -ml-1 text-[#54656f] hover:text-[#111b21] hover:bg-black/5 rounded-full transition-colors"
                      aria-label="Back to chats"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </button>

                    <div className="relative shrink-0">
                      <AvatarInitials name={activeOtherParticipant.name} size="md" />
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-[#25d366] border-2 border-white ring-1 ring-black/5" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-sm sm:text-base text-[#111b21] truncate">
                          {activeOtherParticipant.name}
                        </h2>
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                            activeOtherParticipant.role === "student"
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-[#00a884]/15 text-[#00a884] border border-[#00a884]/30"
                          }`}
                        >
                          {activeOtherParticipant.role}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#667781] truncate flex items-center gap-1.5">
                        <span className="text-[#00a884] font-medium">online</span>
                        {activeConversation.jobContext && (
                          <>
                            <span>•</span>
                            <span className="truncate">
                              Context: <strong className="text-[#111b21] font-medium">{activeConversation.jobContext.jobTitle}</strong>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* HEADER ACTIONS MENU */}
                  <div className="flex items-center gap-1 shrink-0">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        type="button"
                        className="h-9 w-9 rounded-full hover:bg-black/5 text-[#54656f] hover:text-[#111b21] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="More options"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 bg-white rounded-xl shadow-xl border border-line p-1">
                        <DropdownMenuItem
                          onClick={() => setReportModalOpen(true)}
                          className="text-xs font-medium text-amber-700 focus:bg-amber-50 cursor-pointer flex items-center gap-2"
                        >
                          <ShieldAlert className="h-4 w-4" />
                          <span>Report Chat</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={handleToggleBlock}
                          className={`text-xs font-medium cursor-pointer flex items-center gap-2 ${
                            isBlocked ? "text-emerald-700 focus:bg-emerald-50" : "text-red-700 focus:bg-red-50"
                          }`}
                        >
                          {isBlocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                          <span>{isBlocked ? "Unblock Contact" : "Block Contact"}</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* BLOCKED BANNER */}
                {isBlocked && (
                  <div className="shrink-0 bg-red-50 border-b border-red-200 px-4 py-2 text-xs text-red-800 flex items-center justify-between z-10">
                    <span className="flex items-center gap-1.5 font-medium">
                      <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
                      You have blocked this contact. Unblock to resume messaging.
                    </span>
                    <button
                      type="button"
                      onClick={handleToggleBlock}
                      className="font-bold underline hover:text-red-950 shrink-0 ml-2"
                    >
                      Unblock
                    </button>
                  </div>
                )}

                {/* WHATSAPP MESSAGE STREAM WITH DOODLE WALLPAPER */}
                <div
                  ref={messageContainerRef}
                  className="flex-1 min-h-0 p-3 sm:p-5 overflow-y-auto space-y-2 relative scroll-smooth overscroll-contain"
                  data-lenis-prevent
                >
                  {/* Subtle Authentic WhatsApp doodle background pattern */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.04] bg-repeat"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' /%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  {/* Centered Date Separator Pill */}
                  <div className="flex justify-center my-3 relative z-1">
                    <span className="bg-white/90 backdrop-blur-xs text-[#54656f] text-[11px] font-medium px-3 py-1 rounded-lg shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] uppercase tracking-wider">
                      {activeMessages.length > 0 ? formatGroupDate(activeMessages[0].createdAt) : "Today"}
                    </span>
                  </div>

                  {activeMessages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-center p-8 text-[#667781] text-xs relative z-1">
                      No messages yet. Send a greeting to start chatting!
                    </div>
                  ) : (
                    activeMessages.map((msg, index) => {
                      // WhatsApp separation:
                      // If the message is from activeOtherParticipant -> INCOMING (Left side, White bubble)
                      // If the message is from sender / current user -> OUTGOING (Right side, WhatsApp Green bubble)
                      const isOutgoing = activeOtherParticipant
                        ? msg.senderId !== activeOtherParticipant.id
                        : msg.senderId === currentUser.id;

                      const prevMsg = activeMessages[index - 1];
                      const showDateDivider =
                        prevMsg && formatGroupDate(msg.createdAt) !== formatGroupDate(prevMsg.createdAt);

                      return (
                        <React.Fragment key={msg.id}>
                          {showDateDivider && (
                            <div className="flex justify-center my-3 relative z-1 w-full">
                              <span className="bg-white/90 backdrop-blur-xs text-[#54656f] text-[11px] font-medium px-3.5 py-1 rounded-lg shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] border border-black/5 uppercase tracking-wider">
                                {formatGroupDate(msg.createdAt)}
                              </span>
                            </div>
                          )}

                          {/* MESSAGE ROW: Left for receiver/incoming, Right for sender/outgoing */}
                          <div
                            className={`w-full flex ${
                              isOutgoing ? "justify-end" : "justify-start"
                            } relative z-1 my-1`}
                          >
                            {/* WHATSAPP CHAT BUBBLE */}
                            <div
                              className={`max-w-[85%] sm:max-w-[70%] px-3.5 py-2 text-[13px] sm:text-[14px] leading-relaxed shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] relative group ${
                                isOutgoing
                                  ? "bg-[#d9fdd3] text-[#111b21] rounded-2xl rounded-tr-xs border border-[#c1e8b7]/50"
                                  : "bg-white text-[#111b21] rounded-2xl rounded-tl-xs border border-black/5"
                              }`}
                            >
                              <div className="whitespace-pre-wrap break-words">{msg.text}</div>

                              {/* WhatsApp Embedded Timestamp & Read Receipts */}
                              <div className="float-right ml-3 mt-1 inline-flex items-center gap-1 select-none leading-none">
                                <span suppressHydrationWarning className="text-[10px] text-[#667781] tabular-nums">
                                  {formatMessageTime(msg.createdAt)}
                                </span>
                                {isOutgoing && (
                                  <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb] inline shrink-0" />
                                )}
                              </div>
                              <div className="clear-both" />
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })
                  )}

                  {/* TYPING INDICATOR (WHATSAPP BOUNCING DOTS) */}
                  {isTyping && (
                    <div className="flex items-center gap-2 relative z-1">
                      <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-xs bg-white shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] text-[#667781] flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00a884] animate-bounce" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00a884] animate-bounce delay-150" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#00a884] animate-bounce delay-300" />
                        <span className="ml-1 text-[11px] italic text-[#667781]">{activeOtherParticipant.name} is typing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* QUICK EMOJI BAR (ACCORDION / POPOVER) */}
                {showEmojiPicker && (
                  <div className="shrink-0 px-3 py-2 bg-white border-t border-[#e9edef] flex items-center gap-2 overflow-x-auto z-10 shadow-xs">
                    <span className="text-[11px] text-[#667781] font-semibold shrink-0">Quick emojis:</span>
                    {QUICK_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleAddEmoji(emoji)}
                        className="text-lg hover:scale-125 transition-transform p-1 cursor-pointer shrink-0"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}

                {/* ========================================================= */}
                {/* WHATSAPP TYPING BOX (COMPOSER)                            */}
                {/* ========================================================= */}
                <div className="shrink-0 px-2 sm:px-3 py-2 bg-[#f0f2f5] border-t border-[#e9edef] z-10 pb-safe">
                  {isBlocked ? (
                    <div className="text-center py-2.5 px-4 text-xs text-[#667781] bg-white rounded-xl shadow-xs">
                      Composer disabled because this conversation is blocked.
                    </div>
                  ) : (
                    <form onSubmit={handleSendMessage} className="flex items-end gap-1.5 sm:gap-2">
                      {/* EMOJI BUTTON */}
                      <button
                        type="button"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                        className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer mb-0.5 ${
                          showEmojiPicker ? "bg-black/10 text-[#00a884]" : "text-[#54656f] hover:text-[#111b21] hover:bg-black/5"
                        }`}
                        title="Emojis"
                        aria-label="Add emoji"
                      >
                        <Smile className="h-5 w-5" />
                      </button>

                      {/* QUICK RESUME / ATTACHMENT SHORTCUT */}
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          type="button"
                          className="h-10 w-10 rounded-full text-[#54656f] hover:text-[#111b21] hover:bg-black/5 flex items-center justify-center shrink-0 transition-colors cursor-pointer mb-0.5"
                          title="Attach or quick share"
                          aria-label="Attachment options"
                        >
                          <Paperclip className="h-5 w-5" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" side="top" className="w-56 bg-white rounded-xl shadow-xl border border-line p-1">
                          <DropdownMenuItem
                            onClick={() => {
                              setInputText("Hi! I would appreciate your guidance on interview preparation and career opportunities.");
                              textareaRef.current?.focus();
                            }}
                            className="text-xs text-[#111b21] cursor-pointer flex items-center gap-2"
                          >
                            <MessageSquare className="h-4 w-4 text-[#00a884]" />
                            <span>Quick: Career Guidance</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setInputText("I have reviewed your profile and would love to refer you for open opportunities.");
                              textareaRef.current?.focus();
                            }}
                            className="text-xs text-[#111b21] cursor-pointer flex items-center gap-2"
                          >
                            <UserCheck className="h-4 w-4 text-[#00a884]" />
                            <span>Quick: Referral Note</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setInputText("Sharing my updated CV/portfolio for your kind review.");
                              textareaRef.current?.focus();
                            }}
                            className="text-xs text-[#111b21] cursor-pointer flex items-center gap-2"
                          >
                            <FileText className="h-4 w-4 text-[#00a884]" />
                            <span>Quick: Portfolio & Resume</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* ROUNDED WHATSAPP INPUT PILL */}
                      <div className="flex-1 min-h-[42px] max-h-32 bg-white rounded-3xl px-4 py-2 border border-transparent shadow-xs flex items-center">
                        <textarea
                          ref={textareaRef}
                          rows={1}
                          maxLength={1000}
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder="Type a message..."
                          className="w-full text-xs sm:text-sm text-[#111b21] placeholder:text-[#8696a0] focus:outline-none resize-none bg-transparent leading-relaxed max-h-28 overflow-y-auto"
                        />
                      </div>

                      {/* CIRCULAR SEND BUTTON (WHATSAPP ICONIC GREEN) */}
                      {inputText.trim() ? (
                        <button
                          type="submit"
                          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white flex items-center justify-center shrink-0 shadow-md transition-all duration-150 active:scale-90 cursor-pointer mb-0.5"
                          aria-label="Send message"
                          title="Send message (Enter)"
                        >
                          <Send className="h-4.5 w-4.5 ml-0.5" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleAddEmoji("👍");
                          }}
                          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full text-[#54656f] hover:bg-black/5 hover:text-[#111b21] flex items-center justify-center shrink-0 transition-colors cursor-pointer mb-0.5"
                          aria-label="Send thumbs up"
                          title="Quick Thumbs Up"
                        >
                          <span className="text-xl">👍</span>
                        </button>
                      )}
                    </form>
                  )}
                </div>
              </>
            ) : (
              /* EMPTY STATE: WHATSAPP WEB STYLE WELCOME SCREEN */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#f0f2f5]">
                <div className="h-20 w-20 rounded-full bg-[#00a884]/10 text-[#00a884] flex items-center justify-center mb-5 shadow-xs">
                  <MessageSquare className="h-10 w-10 text-[#00a884]" />
                </div>
                <h3 className="text-xl font-sans font-bold text-[#111b21] mb-2">
                  Poddar Opportunities Network Messenger
                </h3>
                <p className="text-xs text-[#667781] max-w-md mb-6 leading-relaxed">
                  Send and receive messages directly with verified alumni and students. Stay connected for career advice, mentorship, and job referrals.
                </p>
                <button
                  type="button"
                  onClick={() => setNewChatModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#00a884] hover:bg-[#008f6f] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Start New Conversation</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* NEW MESSAGE MODAL */}
      <Dialog open={newChatModalOpen} onOpenChange={setNewChatModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-3xl p-6" data-lenis-prevent>
          <DialogHeader className="border-b border-line pb-3">
            <DialogTitle className="text-lg font-sans font-bold text-navy-950">
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
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-line text-xs focus:outline-none focus:ring-2 focus:ring-[#00a884]/30"
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
                    className="w-full p-3 text-left hover:bg-[#f0f2f5] flex items-center justify-between gap-3 transition-colors cursor-pointer"
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
            <DialogTitle className="text-lg font-sans font-bold text-navy-950 flex items-center gap-2">
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
        <div className="min-h-screen bg-[#efeae2] flex items-center justify-center text-xs tabular-nums text-muted">
          Loading Opportunities Network Messages...
        </div>
      }
    >
      <MessagesContent />
    </React.Suspense>
  );
}
