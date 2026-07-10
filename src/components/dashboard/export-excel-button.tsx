"use client";

import * as XLSX from "xlsx";
import { Download } from "lucide-react";
import { GeneratedTestCase } from "@/lib/types";
import { Button } from "@/components/ui/button";

export function ExportExcelButton({ testCases }: { testCases: GeneratedTestCase[] }) {
  function exportToExcel() {
    const rows = testCases.map((item) => ({
      "Test Case ID": item.testCaseId,
      Component: item.component,
      "Test Scenario": item.testScenario,
      "Pre-conditions": item.preConditions,
      "Test Steps": item.testSteps,
      "Expected Result": item.expectedResult,
      Priority: item.priority,
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    worksheet["!cols"] = [
      { wch: 16 },
      { wch: 22 },
      { wch: 44 },
      { wch: 38 },
      { wch: 52 },
      { wch: 52 },
      { wch: 14 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Test Cases");
    XLSX.writeFile(workbook, "qa-casegen-ai-test-cases.xlsx");
  }

  return (
    <Button onClick={exportToExcel} disabled={testCases.length === 0} className="bg-emerald-600 hover:bg-emerald-500">
      <Download className="h-4 w-4" />
      Export to Excel (.xlsx)
    </Button>
  );
}
