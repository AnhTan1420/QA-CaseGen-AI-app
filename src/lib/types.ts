export type TestType =
  | "Functional"
  | "UI/UX"
  | "Performance"
  | "Security"
  | "Regression";

export type KnowledgeFile = {
  id: string;
  user_id?: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  extracted_text?: string | null;
  created_at: string;
};

export type GeneratedTestCase = {
  id?: string;
  testCaseId: string;
  component: string;
  testScenario: string;
  preConditions: string;
  testSteps: string;
  expectedResult: string;
  priority: "Low" | "Medium" | "High" | "Critical";
};

export type GenerateRequest = {
  featureDescription: string;
  testType: TestType;
};

export type GenerateResponse = {
  sessionId: string;
  testCases: GeneratedTestCase[];
};
