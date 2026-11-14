"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import {
  GraduationCap,
  Search,
  CheckCircle2,
  XCircle,
  FileText,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";
import { usePortalStore } from "@/store/portal";
import { EmptyState } from "@/components/common/EmptyState";
import { AvatarInitials } from "@/components/common/AvatarInitials";

export function AdminStudents() {
  const { students, deactivateStudent, reactivateStudent } = usePortalStore();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.course.toLowerCase().includes(q) ||
      s.enrollmentNumber.toLowerCase().includes(q) ||
      s.skills.some((sk) => sk.toLowerCase().includes(q))
    );
  });

  const handleToggleActive = (studentId: string, currentActive: boolean, name: string) => {
    if (currentActive) {
      if (confirm(`Deactivate student "${name}"? Deactivated students cannot apply or message.`)) {
        deactivateStudent(studentId);
        toast.info(`Student ${name} deactivated.`);
      }
    } else {
      reactivateStudent(studentId);
      toast.success(`Student ${name} reactivated.`);
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-line shadow-sm">
        <div>
          <h2 className="text-xl sm:text-2xl font-sans font-bold text-navy-950 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-gold-600" />
            <span>Enrolled Students Registry ({students.length})</span>
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-0.5">
            Student accounts activate immediately without moderation. Admin controls permit instant safety deactivation.
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="text"
            placeholder="Search student, course, roll #..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-9 pr-3 rounded-xl border border-line text-xs bg-ivory/50 focus:outline-none focus:ring-2 focus:ring-navy-950/20 w-64"
          />
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-3xl p-8 border border-line shadow-sm">
          <EmptyState
            title="No Students Found"
            description="No student profiles match your search query."
          />
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-line shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-navy-950">
              <thead className="bg-navy-950 text-gold-300 uppercase tracking-wider text-[11px] font-bold">
                <tr>
                  <th className="py-3.5 px-4">Student Member</th>
                  <th className="py-3.5 px-4">Academic Details</th>
                  <th className="py-3.5 px-4">Enrollment Number</th>
                  <th className="py-3.5 px-4">Core Skills</th>
                  <th className="py-3.5 px-4">Joined Date</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {filteredStudents.map((s) => {
                  const isActive = s.isActive ?? true;

                  return (
                    <tr key={s.id} className="hover:bg-ivory/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <AvatarInitials name={s.name} size="sm" />
                          <div>
                            <div className="font-bold text-navy-950">{s.name}</div>
                            <div className="text-[11px] text-muted tabular-nums">{s.email}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-semibold">{s.course}</div>
                        <div className="text-[11px] text-muted">{s.yearOfStudy}</div>
                      </td>

                      <td className="py-4 px-4 tabular-nums font-bold text-navy-950">
                        {s.enrollmentNumber}
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {s.skills.slice(0, 3).map((sk) => (
                            <span
                              key={sk}
                              className="text-[10px] bg-ivory px-2 py-0.5 rounded border border-line"
                            >
                              {sk}
                            </span>
                          ))}
                          {s.skills.length > 3 && (
                            <span className="text-[10px] text-muted self-center">
                              +{s.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4 text-muted">{s.joinedDate}</td>

                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            isActive
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-red-100 text-red-800 border border-red-300"
                          }`}
                        >
                          {isActive ? "Active (Verified)" : "Deactivated"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleActive(s.id, isActive, s.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                            isActive
                              ? "bg-red-50 text-red-700 hover:bg-red-100 border border-red-200"
                              : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                          }`}
                        >
                          {isActive ? "Deactivate" : "Reactivate"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

