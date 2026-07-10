"use client";

import { ClipboardList } from "lucide-react";
import { GeneratedTestCase } from "@/lib/types";
import { ExportExcelButton } from "@/components/dashboard/export-excel-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function TestCasePreview({ testCases }: { testCases: GeneratedTestCase[] }) {
  return (
    <Card className="min-h-[720px]">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Preview & Excel Export</h2>
          <p className="text-sm text-slate-400">Review generated QA cases before downloading.</p>
        </div>
        <ExportExcelButton testCases={testCases} />
      </CardHeader>
      <CardContent>
        {testCases.length === 0 ? (
          <div className="flex min-h-[560px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/60 text-center">
            <ClipboardList className="mb-4 h-11 w-11 text-slate-600" />
            <p className="font-medium text-slate-300">No test cases generated yet</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">Upload project documentation, enter a feature description, and generate QA-ready test cases.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <div className="max-h-[620px] overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 z-10 bg-slate-950">
                  <TableRow className="hover:bg-slate-950">
                    <TableHead>ID</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Scenario</TableHead>
                    <TableHead>Pre-conditions</TableHead>
                    <TableHead>Steps</TableHead>
                    <TableHead>Expected Result</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testCases.map((testCase) => (
                    <TableRow key={testCase.testCaseId}>
                      <TableCell className="font-mono text-xs text-indigo-300">{testCase.testCaseId}</TableCell>
                      <TableCell>{testCase.component}</TableCell>
                      <TableCell className="min-w-64">{testCase.testScenario}</TableCell>
                      <TableCell className="min-w-64 whitespace-pre-wrap text-slate-300">{testCase.preConditions}</TableCell>
                      <TableCell className="min-w-80 whitespace-pre-wrap text-slate-300">{testCase.testSteps}</TableCell>
                      <TableCell className="min-w-80 whitespace-pre-wrap text-slate-300">{testCase.expectedResult}</TableCell>
                      <TableCell><PriorityBadge priority={testCase.priority} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function PriorityBadge({ priority }: { priority: GeneratedTestCase["priority"] }) {
  const className =
    priority === "Critical"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : priority === "High"
        ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
        : priority === "Medium"
          ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
          : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";

  return <Badge className={className}>{priority}</Badge>;
}
