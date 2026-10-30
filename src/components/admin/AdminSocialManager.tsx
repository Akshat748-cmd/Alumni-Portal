"use client";

import React, { useState } from "react";
import {
  Share2,
  Save,
  CheckCircle2,
  ExternalLink,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { usePortalStore, SocialLink } from "@/store/portal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Social SVG Icons
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .88.72 1.6 1.61 1.6.88 0 1.6-.72 1.6-1.6 0-.89-.72-1.61-1.6-1.61Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function AdminSocialManager() {
  const { socialLinks, updateSocialLinks } = usePortalStore();

  const [links, setLinks] = useState<SocialLink[]>(socialLinks || []);

  const handleChangeUrl = (index: number, newHref: string) => {
    const updated = [...links];
    updated[index] = { ...updated[index], href: newHref };
    setLinks(updated);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks(links);
    toast.success("Social links updated successfully!", {
      description: "Changes are now live across the public footer on every page.",
    });
  };

  const renderIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "linkedin":
        return <LinkedInIcon className="h-4 w-4" />;
      case "instagram":
        return <InstagramIcon className="h-4 w-4" />;
      case "facebook":
        return <FacebookIcon className="h-4 w-4" />;
      case "twitter":
      case "x":
        return <TwitterIcon className="h-4 w-4" />;
      case "youtube":
        return <YoutubeIcon className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-line shadow-navy-soft rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="font-serif text-lg text-navy-950">
                Institutional Social Media Handles
              </CardTitle>
              <CardDescription className="text-xs">
                Configure the institutional presence links rendered in the global footer and communications hubs.
              </CardDescription>
            </div>
            <Share2 className="h-5 w-5 text-navy-800" />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 max-w-2xl">
            {links.map((link, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl border border-line bg-slate-50/60">
                <div className="flex items-center gap-2.5 w-36 shrink-0 font-medium text-xs text-navy-950">
                  <div className="h-8 w-8 rounded-lg bg-navy-900 text-gold-300 flex items-center justify-center shrink-0">
                    {renderIcon(link.name)}
                  </div>
                  <span>{link.label || link.name}</span>
                </div>

                <div className="flex-1 w-full min-w-0">
                  <Input
                    value={link.href}
                    onChange={(e) => handleChangeUrl(idx, e.target.value)}
                    placeholder={`https://${link.name.toLowerCase()}.com/...`}
                    className="text-xs bg-white rounded-xl h-9"
                  />
                </div>

                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-xl border border-line bg-white flex items-center justify-center text-muted hover:text-navy-950 shrink-0"
                  title={`Open ${link.label}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}

            <div className="pt-4 flex items-center justify-between">
              <span className="text-xs text-muted">
                Updates synchronize reactively with the layout footer.
              </span>
              <Button
                type="submit"
                className="h-9 px-5 bg-navy-900 hover:bg-navy-950 text-white text-xs font-semibold rounded-xl gap-1.5 shadow-navy-soft"
              >
                <Save className="h-3.5 w-3.5" />
                Save Social Links
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
