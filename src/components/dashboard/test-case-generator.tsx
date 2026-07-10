"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { GeneratedTestCase, TestType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TEST_TYPES: TestType[] = ["Functional", "UI/UX", "Performance", "Security", "Regression"];

export function TestCaseGenerator({ onGenerated }: { onGenerated: (testCases: GeneratedTestCase[]) => void }) {
  const [featureDescription, setFeatureDescription] = useState("");
  const [testType, setTestType] = useState<TestType>("Functional");
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState("Paste a user story or feature requirement to begin.");

  async function generate() {
    if (!featureDescription.trim()) return;
    setIsGenerating(true);
    setStatus("Fetching knowledge context and generating structured QA scenarios...");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ featureDescription, testType }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Generation failed");
      onGenerated(data.testCases);
      setStatus(`Generated ${data.testCases.length} test cases and synced session metadata.`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Generation failed.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          Test Case Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Feature Description / User Story</label>
          <Textarea
            value={featureDescription}
            onChange={(event) => setFeatureDescription(event.target.value)}
            placeholder="As a user, I want to reset my password using email OTP so that I can regain account access securely..."
            className="min-h-44"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Test Type</label>
          <Select value={testType} onValueChange={(value: string) => setTestType(value as TestType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TEST_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-400">{status}</div>

        <Button onClick={generate} disabled={isGenerating || !featureDescription.trim()} className="w-full">
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating test cases...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Test Cases
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
