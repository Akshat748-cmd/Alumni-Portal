"use client";

import React, { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Eye,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { usePortalStore } from "@/store/portal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export function AdminContentManager() {
  const { publishedContent, publishContent, updateContent, removeContent } = usePortalStore();

  const [activeKind, setActiveKind] = useState<"notices" | "newsStories" | "events">("notices");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Official Notice");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("Main Campus Auditorium");
  const [imageUrl, setImageUrl] = useState("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800");

  const currentList = publishedContent[activeKind] || [];

  const handleOpenCreate = () => {
    setTitle("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory(activeKind === "notices" ? "Academic" : activeKind === "newsStories" ? "Innovation" : "Alumni Gathering");
    setSummary("");
    setContent("");
    setLocation("Auditorium / Campus");
    setImageUrl("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800");
    setIsCreateOpen(true);
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }

    const payload: any = {
      title,
      date,
      category,
      summary,
      content: content || summary,
      story: content || summary,
      imageUrl,
      location,
      time: "10:00 AM - 01:00 PM",
      status: "approved",
    };

    publishContent(activeKind, payload);
    toast.success(`Published to ${activeKind === "notices" ? "Alumni Bulletin" : activeKind === "newsStories" ? "Alumni Spotlight" : "Upcoming Events"}!`, {
      description: "Item is immediately visible on the corresponding public page.",
    });
    setIsCreateOpen(false);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateContent(activeKind, editingItem.id, {
      title,
      date,
      category,
      summary,
      content,
      story: content,
      imageUrl,
      location,
    });
    toast.success("Content updated successfully!");
    setEditingItem(null);
  };

  const handleDelete = (id: string, itemTitle: string) => {
    removeContent(activeKind, id);
    toast.info(`Removed "${itemTitle}" from published content.`);
  };

  return (
    <div className="space-y-6">
      {/* Sub-tab selection */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActiveKind("notices")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeKind === "notices"
                ? "bg-navy-950 text-gold-300 shadow-sm"
                : "text-muted hover:text-navy-950"
            }`}
          >
            Bulletin Notices ({publishedContent.notices?.length || 0})
          </button>
          <button
            onClick={() => setActiveKind("newsStories")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeKind === "newsStories"
                ? "bg-navy-950 text-gold-300 shadow-sm"
                : "text-muted hover:text-navy-950"
            }`}
          >
            Spotlight Stories ({publishedContent.newsStories?.length || 0})
          </button>
          <button
            onClick={() => setActiveKind("events")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeKind === "events"
                ? "bg-navy-950 text-gold-300 shadow-sm"
                : "text-muted hover:text-navy-950"
            }`}
          >
            Institutional Events ({publishedContent.events?.length || 0})
          </button>
        </div>

        <Button
          onClick={handleOpenCreate}
          className="h-9 px-4 rounded-xl bg-navy-900 hover:bg-navy-950 text-white text-xs font-semibold gap-1.5 shadow-navy-soft"
        >
          <Plus className="h-4 w-4" />
          Create New {activeKind === "notices" ? "Notice" : activeKind === "newsStories" ? "Story" : "Event"}
        </Button>
      </div>

      {/* Published Content List */}
      <Card className="border-line shadow-navy-soft rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-lg text-navy-950">
                Active Published {activeKind === "notices" ? "Bulletin Notices" : activeKind === "newsStories" ? "Spotlight Features" : "Campus Events"}
              </CardTitle>
              <CardDescription className="text-xs">
                Items published from Secretariat desk are instantly merged into the public DAL and rendered across client views.
              </CardDescription>
            </div>
            <FileText className="h-5 w-5 text-gold-600" />
          </div>
        </CardHeader>
        <CardContent>
          {currentList.length === 0 ? (
            <div className="py-12 text-center text-muted text-xs border border-dashed border-line rounded-xl">
              <CheckCircle2 className="h-8 w-8 text-slate-400 mx-auto mb-2 opacity-60" />
              No dynamic published items yet in this category. Click &quot;Create New&quot; above to publish an announcement.
            </div>
          ) : (
            <div className="space-y-4">
              {currentList.map((rawItem) => {
                const item = rawItem as any;
                return (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-line bg-card flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-sm text-navy-950 truncate">{item.title}</span>
                      <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-300">
                        Live / Published
                      </Badge>
                      {item.category && (
                        <Badge variant="secondary" className="text-[10px]">
                          {item.category}
                        </Badge>
                      )}
                    </div>

                    <div className="text-xs text-muted mt-1 flex flex-wrap items-center gap-2">
                      <span>Date: {item.date || item.postedDate || "2026-10-30"}</span>
                      {item.location && <span>• Location: {item.location}</span>}
                    </div>

                    {(item.summary || item.excerpt) && (
                      <p className="mt-1.5 text-xs text-ink/80 line-clamp-2">
                        {item.summary || item.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingItem(item);
                        setTitle(item.title || "");
                        setDate(item.date || item.postedDate || new Date().toISOString().split("T")[0]);
                        setCategory(item.category || "General");
                        setSummary(item.summary || item.excerpt || "");
                        setContent(item.content || item.story || item.fullStory || "");
                        setLocation(item.location || "");
                        setImageUrl(item.imageUrl || item.featuredImage || "");
                      }}
                      className="h-8 px-2.5 text-xs rounded-lg border-line text-navy-800"
                    >
                      <Edit2 className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id, item.title)}
                      className="h-8 px-2.5 text-xs rounded-lg text-rose-600 hover:bg-rose-50 border-rose-200"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Dialog with Side-by-Side Live Card Preview */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl text-navy-950">
              Publish New {activeKind === "notices" ? "Notice" : activeKind === "newsStories" ? "Spotlight Story" : "Alumni Event"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Complete the form below. See real-time public card preview on the right.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
            {/* Form Column */}
            <form onSubmit={handlePublish} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-navy-950 block mb-1">Title *</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Secretariat Convocation Announcement"
                  required
                  className="text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-navy-950 block mb-1">Date</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-navy-950 block mb-1">Category</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Academic / Reunion / Innovation"
                    className="text-xs rounded-xl"
                  />
                </div>
              </div>

              {activeKind === "events" && (
                <div>
                  <label className="text-[11px] font-semibold text-navy-950 block mb-1">Venue / Location</label>
                  <Input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Campus Amphitheatre / Virtual Session"
                    className="text-xs rounded-xl"
                  />
                </div>
              )}

              <div>
                <label className="text-[11px] font-semibold text-navy-950 block mb-1">Summary / Excerpt</label>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief synopsis displayed on cards..."
                  className="text-xs min-h-[60px] rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-navy-950 block mb-1">Detailed Body Content</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Full text description..."
                  className="text-xs min-h-[90px] rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-navy-950 block mb-1">Cover Image URL</label>
                <Input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="text-xs rounded-xl"
                />
              </div>

              <Button
                type="submit"
                className="w-full text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-9 mt-4"
              >
                Publish Immediately
              </Button>
            </form>

            {/* Live Card Preview Column */}
            <div className="space-y-2">
              <span className="text-[11px] uppercase font-bold text-muted tracking-wider block">
                Live Public Card Preview
              </span>
              <div className="p-4 rounded-2xl border border-line bg-card shadow-navy-soft space-y-3">
                <div className="h-36 w-full rounded-xl overflow-hidden bg-slate-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as any).src = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <Badge className="absolute top-2 left-2 bg-navy-950/80 text-gold-300 text-[10px] backdrop-blur-xs">
                    {category || "Announcement"}
                  </Badge>
                </div>

                <div>
                  <span className="text-[11px] font-semibold text-gold-700 block mb-1">
                    {date || "Today"} {location ? `• ${location}` : ""}
                  </span>
                  <h4 className="font-serif text-base font-bold text-navy-950 leading-tight">
                    {title || "Card Headline Preview"}
                  </h4>
                  <p className="text-xs text-ink/75 mt-1.5 line-clamp-3 leading-relaxed">
                    {summary || "This excerpt text shows how your published announcement will appear across public archive feeds and featured hero spotlights."}
                  </p>
                </div>

                <div className="pt-2 border-t border-line flex items-center justify-between text-xs text-navy-900 font-semibold">
                  <span>Read Full Announcement</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="font-serif text-lg text-navy-950">
                Edit Content Item
              </DialogTitle>
              <DialogDescription className="text-xs">
                Modifications will update immediately in the portal store.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpdate} className="space-y-3 text-xs py-2">
              <div>
                <label className="text-[11px] font-semibold text-navy-950 block mb-1">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="text-xs rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-navy-950 block mb-1">Date</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-navy-950 block mb-1">Category</label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="text-xs rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-navy-950 block mb-1">Summary</label>
                <Textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="text-xs min-h-[60px] rounded-xl"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-navy-950 block mb-1">Detailed Content</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="text-xs min-h-[90px] rounded-xl"
                />
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => setEditingItem(null)} className="text-xs">
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="text-xs bg-navy-900 hover:bg-navy-950 text-white font-semibold">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

