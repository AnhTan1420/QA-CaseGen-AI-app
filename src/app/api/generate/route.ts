import { NextResponse } from "next/server";
import { generateTestCases } from "@/lib/ai/generate-test-cases";
import { GenerateRequest } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as GenerateRequest;

  if (!body.featureDescription?.trim()) {
    return NextResponse.json({ error: "Feature description is required" }, { status: 400 });
  }

  const testCases = await generateTestCases({
    context: "Demo knowledge base context. Configure Supabase to use uploaded stored documents in production.",
    featureDescription: body.featureDescription,
    testType: body.testType,
  });

  return NextResponse.json({
    sessionId: crypto.randomUUID(),
    testCases,
  });
}
