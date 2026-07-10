import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { KnowledgeFile } from "@/lib/types";

const demoFiles: KnowledgeFile[] = [];

export async function GET() {
  return NextResponse.json({ files: demoFiles });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const allowed = [".txt", ".pdf", ".docx"];
  const lowerName = file.name.toLowerCase();

  if (!allowed.some((extension) => lowerName.endsWith(extension))) {
    return NextResponse.json({ error: "Only .txt, .pdf, and .docx files are supported" }, { status: 400 });
  }

  const item: KnowledgeFile = {
    id: randomUUID(),
    file_name: file.name,
    file_path: `demo/${file.name}`,
    file_type: file.type || "application/octet-stream",
    file_size: file.size,
    extracted_text: file.name.endsWith(".txt") ? await file.text() : "Demo extracted document context.",
    created_at: new Date().toISOString(),
  };

  demoFiles.unshift(item);

  return NextResponse.json({ file: item });
}
