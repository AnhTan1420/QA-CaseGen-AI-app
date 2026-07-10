import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { KnowledgeFile } from "@/lib/types";
import { extractTextFromFile } from "@/lib/document-parser";

const demoFiles: KnowledgeFile[] = [];
const allowedExtensions = [".txt", ".pdf", ".docx", ".xls", ".xlsx"];

export async function GET() {
  return NextResponse.json({ files: demoFiles });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const lowerName = file.name.toLowerCase();

  if (!allowedExtensions.some((extension) => lowerName.endsWith(extension))) {
    return NextResponse.json({ error: "Only .txt, .pdf, .docx, .xls, and .xlsx files are supported" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const item: KnowledgeFile = {
    id: randomUUID(),
    file_name: file.name,
    file_path: `demo/${file.name}`,
    file_type: file.type || "application/octet-stream",
    file_size: file.size,
    extracted_text: await extractTextFromFile(buffer, file.type, file.name),
    created_at: new Date().toISOString(),
  };

  demoFiles.unshift(item);

  return NextResponse.json({ file: item });
}
