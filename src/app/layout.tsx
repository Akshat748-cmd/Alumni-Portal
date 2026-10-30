import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ShellGate } from "@/components/layout/ShellGate";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0B1630",
};

export const metadata: Metadata = {
  title: "Poddar Alumni Portal | Official Network & Community",
  description:
    "Official institutional alumni portal for Poddar Group of Institutions. Reconnect with batchmates, explore industry directories, seek mentorship, and discover career opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-screen bg-ivory text-ink font-sans flex flex-col antialiased selection:bg-gold-500/30 selection:text-navy-950">
        <SmoothScroll>
          <TooltipProvider delay={200}>
            <ShellGate>{children}</ShellGate>
            {/* Toast System */}
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
