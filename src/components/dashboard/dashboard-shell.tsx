"use client";

import { useState } from "react";
import { BrainCircuit, FileSpreadsheet, ShieldCheck, Sparkles } from "lucide-react";
import { KnowledgeBase } from "@/components/dashboard/knowledge-base";
import { TestCaseGenerator } from "@/components/dashboard/test-case-generator";
import { TestCasePreview } from "@/components/dashboard/test-case-preview";
import { GeneratedTestCase } from "@/lib/types";

export function DashboardShell({ userEmail }: { userEmail: string }) {
  const [testCases, setTestCases] = useState<GeneratedTestCase[]>([]);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,#312e81,transparent_32%),radial-gradient(circle_at_bottom_right,#0f766e22,transparent_28%)]" />
      <header className="relative z-10 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-indigo-600 p-2.5 shadow-lg shadow-indigo-950/40">
              <BrainCircuit className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">QA CaseGen AI</h1>
              <p className="text-sm text-slate-400">Generate QA-ready Excel test cases from project context</p>
            </div>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" /> Demo mode
            </div>
            <div className="rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-300">{userEmail}</div>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-6">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <Stat icon={<Sparkles className="h-5 w-5" />} label="AI orchestration" value="Mock LLM ready" />
          <Stat icon={<BrainCircuit className="h-5 w-5" />} label="Knowledge base" value="TXT/PDF/DOCX" />
          <Stat icon={<FileSpreadsheet className="h-5 w-5" />} label="Export format" value="Excel .xlsx" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <section className="space-y-6">
            <KnowledgeBase />
            <TestCaseGenerator onGenerated={setTestCases} />
          </section>
          <section>
            <TestCasePreview testCases={testCases} />
          </section>
        </div>
      </section>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-slate-950/20 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-300">{icon}</div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
          <p className="text-sm font-medium text-slate-200">{value}</p>
        </div>
      </div>
    </div>
  );
}
