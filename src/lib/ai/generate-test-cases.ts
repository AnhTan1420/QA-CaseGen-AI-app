import { mockGenerateTestCases } from "@/lib/ai/mock-ai";
import { GeneratedTestCase, TestType } from "@/lib/types";

type GenerateInput = {
  context: string;
  featureDescription: string;
  testType: TestType;
};

export async function generateTestCases(
  input: GenerateInput,
): Promise<GeneratedTestCase[]> {
  const provider = process.env.AI_PROVIDER || "mock";

  if (provider === "mock") {
    return mockGenerateTestCases(input);
  }

  return mockGenerateTestCases(input);
}
