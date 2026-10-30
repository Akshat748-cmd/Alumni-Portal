"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface ResponsiveTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  className?: string;
}

export function ResponsiveTable<T extends Record<string, any>>({
  columns,
  data,
  keyExtractor,
  emptyMessage = "No records found.",
  className = "",
}: ResponsiveTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="rounded-xl border border-line bg-card p-8 text-center text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {/* MOBILE VIEW: Stacked Cards (< md) */}
      <div className="flex flex-col gap-3.5 md:hidden">
        {data.map((row) => (
          <div
            key={keyExtractor(row)}
            className="rounded-xl border border-line bg-card p-4 shadow-navy-soft space-y-2.5 transition-shadow hover:shadow-navy-hover"
          >
            {columns
              .filter((col) => !col.hideOnMobile)
              .map((col) => {
                const value = col.render ? col.render(row) : row[col.key];
                return (
                  <div
                    key={col.key}
                    className="flex items-start justify-between gap-3 text-sm border-b border-line/50 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="font-medium text-xs uppercase tracking-wider text-muted shrink-0 pt-0.5">
                      {col.header}
                    </span>
                    <div className="text-right text-ink font-medium break-words max-w-[65%]">
                      {value}
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW: Full Structured Table (md and up) */}
      <div className="hidden md:block overflow-hidden rounded-xl border border-line bg-card shadow-navy-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-950 text-ivory text-xs font-semibold uppercase tracking-wider">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} scope="col" className={cn("px-5 py-4", col.className)}>
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {data.map((row, idx) => (
                <tr
                  key={keyExtractor(row)}
                  className={cn(
                    "transition-colors hover:bg-gold-500/5",
                    idx % 2 === 1 ? "bg-ivory/40" : "bg-card"
                  )}
                >
                  {columns.map((col) => {
                    const value = col.render ? col.render(row) : row[col.key];
                    return (
                      <td
                        key={col.key}
                        className={cn("px-5 py-4 text-ink font-normal align-middle", col.className)}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

