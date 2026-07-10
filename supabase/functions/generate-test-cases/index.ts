import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  const { testType } = await req.json();

  return new Response(
    JSON.stringify({
      testCases: [
        {
          testCaseId: "TC-001",
          component: "Generated Component",
          testScenario: `Validate ${testType} behavior`,
          preConditions: "User has valid access.",
          testSteps: "1. Open feature\n2. Perform action\n3. Verify result",
          expectedResult: "System behaves as expected.",
          priority: "High",
        },
      ],
    }),
    { headers: { "Content-Type": "application/json" } },
  );
});
