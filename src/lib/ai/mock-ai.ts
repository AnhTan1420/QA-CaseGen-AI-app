import { GeneratedTestCase, TestType } from "@/lib/types";

type MockAIInput = {
  context: string;
  featureDescription: string;
  testType: TestType;
};

export async function mockGenerateTestCases({
  context,
  featureDescription,
  testType,
}: MockAIInput): Promise<GeneratedTestCase[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const component =
    inferComponent(featureDescription) || inferComponent(context) || "Application Feature";

  return [
    {
      testCaseId: "TC-001",
      component,
      testScenario: `Verify primary ${testType.toLowerCase()} workflow`,
      preConditions:
        "User has valid access and the required project configuration is available.",
      testSteps:
        "1. Log in to the application\n2. Navigate to the relevant module\n3. Perform the main user action\n4. Observe the system response",
      expectedResult:
        "The feature works as described and the system returns the expected response without errors.",
      priority: "Critical",
    },
    {
      testCaseId: "TC-002",
      component,
      testScenario: "Validate required fields and input rules",
      preConditions: "User is on the feature screen and can submit data.",
      testSteps:
        "1. Open the feature form\n2. Leave required fields blank\n3. Submit the form\n4. Review validation messages",
      expectedResult:
        "Clear validation messages are displayed and invalid submission is prevented.",
      priority: "High",
    },
    {
      testCaseId: "TC-003",
      component,
      testScenario: "Verify successful completion with valid data",
      preConditions: "Valid test data exists and the user is authenticated.",
      testSteps:
        "1. Enter valid input values\n2. Submit the request\n3. Wait for processing to complete\n4. Confirm final state",
      expectedResult:
        "The request completes successfully and stored data matches the submitted values.",
      priority: "High",
    },
    {
      testCaseId: "TC-004",
      component,
      testScenario: "Verify boundary and negative input behavior",
      preConditions: "User has access to the feature and can enter custom values.",
      testSteps:
        "1. Enter invalid, malformed, or boundary values\n2. Submit the request\n3. Observe error handling behavior",
      expectedResult:
        "The system handles invalid input safely and displays actionable feedback.",
      priority: "Medium",
    },
    {
      testCaseId: "TC-005",
      component,
      testScenario: "Verify documentation-driven business rules",
      preConditions: "Relevant project documentation has been uploaded.",
      testSteps:
        "1. Compare feature behavior with uploaded documentation\n2. Execute the documented workflow\n3. Validate documented constraints and outcomes",
      expectedResult:
        "The implemented behavior aligns with uploaded knowledge base context and feature requirements.",
      priority: "High",
    },
    {
      testCaseId: "TC-006",
      component,
      testScenario: `Verify ${testType.toLowerCase()} regression safety`,
      preConditions: "Existing related functionality is available for comparison.",
      testSteps:
        "1. Execute the new feature workflow\n2. Execute adjacent existing workflows\n3. Compare outcomes and verify no breakage",
      expectedResult:
        "The new behavior works without negatively affecting existing related functionality.",
      priority: "Medium",
    },
  ];
}

function inferComponent(text: string): string | null {
  const lower = text.toLowerCase();

  if (lower.includes("login") || lower.includes("auth") || lower.includes("password")) return "Authentication";
  if (lower.includes("payment") || lower.includes("checkout")) return "Payments";
  if (lower.includes("profile") || lower.includes("account")) return "User Profile";
  if (lower.includes("dashboard")) return "Dashboard";
  if (lower.includes("report")) return "Reports";

  return null;
}
