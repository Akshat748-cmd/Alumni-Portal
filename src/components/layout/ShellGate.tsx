"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingHelpButton } from "@/components/layout/FloatingHelpButton";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { Preloader } from "@/components/motion/Preloader";
import { PageTransition } from "@/components/motion/PageTransition";

export function ShellGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (isAdmin) {
    return <div className="min-h-screen bg-slate-50 text-ink">{children}</div>;
  }

  return (
    <>
      <ScrollProgress />
      <Preloader />

      <Header />
      <PageTransition className="flex-1 flex flex-col">
        {children}
      </PageTransition>
      <Footer />

      <FloatingHelpButton />
    </>
  );
}

