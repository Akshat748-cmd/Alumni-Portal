"use client";

import React, { useState, useEffect, useCallback } from "react";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { IMAGES } from "@/data/images";
import { INITIAL_GALLERY } from "@/data/gallery";
import { GalleryItem } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Calendar,
} from "lucide-react";

export default function ReunionsGalleryPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const events = ["All", "Convocation", "Reunion", "Foundation Day", "Tech Conclave"];

  const filteredItems = INITIAL_GALLERY.filter((item) => {
    if (activeFilter === "All") return true;
    return item.event.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  // Prevent background scroll when lightbox open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      document.body.setAttribute("data-overlay-open", "true");
    } else {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-overlay-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.removeAttribute("data-overlay-open");
    };
  }, [lightboxIndex]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <PageHero
        title="Photos & Memorabilia"
        subtitle="A visual repository of convocation processions, milestone reunions, student innovation expos, and campus celebrations."
        eyebrow="Archival Highlights"
        backgroundImage={IMAGES.hero.convocation.src}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reunions & Gatherings", href: "/reunions" },
          { label: "Photos / Highlights", href: "/reunions/gallery" },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {/* Filter Chips */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 shadow-md border border-slate-200/80 dark:border-slate-800 mb-10 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {events.map((evt) => (
              <Button
                key={evt}
                size="sm"
                variant={activeFilter === evt ? "default" : "outline"}
                onClick={() => setActiveFilter(evt)}
                className="text-xs h-9"
              >
                {evt === "All" ? "All Photographs" : evt}
              </Button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Showing {filteredItems.length} Photographs
          </div>
        </div>

        {/* Gallery Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <Reveal key={item.id} delay={idx * 0.04}>
              <div
                onClick={() => openLightbox(idx)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                  <Badge className="bg-navy-900/80 backdrop-blur-sm text-white text-[11px] font-normal border border-white/20">
                    {item.event}
                  </Badge>
                  <span className="text-[11px] text-amber-300 font-mono font-semibold">
                    {item.year}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full bg-black/40 text-white backdrop-blur-sm pointer-events-none">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <h3 className="text-base font-serif font-bold group-hover:text-amber-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-300 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent
          className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white z-10">
            <div className="text-xs font-mono text-amber-400">
              {lightboxIndex + 1} / {filteredItems.length}
            </div>
            <div className="text-sm font-medium text-slate-300 hidden sm:block">
              {filteredItems[lightboxIndex].event} ({filteredItems[lightboxIndex].year})
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Photo Center */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl transition-all select-none"
            />

            {/* Left Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/50 hover:bg-amber-500 hover:text-navy-950 text-white transition-all backdrop-blur-sm"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/50 hover:bg-amber-500 hover:text-navy-950 text-white transition-all backdrop-blur-sm"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="text-center text-white max-w-2xl mx-auto z-10">
            <h4 className="text-lg font-serif font-bold text-amber-300">
              {filteredItems[lightboxIndex].title}
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              {filteredItems[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

