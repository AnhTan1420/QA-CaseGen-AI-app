import mammoth from "mammoth";

export async function extractTextFromFile(
  buffer: Buffer,
  mimeType: string,
  fileName: string,
): Promise<string> {
  if (mimeType === "text/plain" || fileName.endsWith(".txt")) {
    return buffer.toString("utf-8");
  }

  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    fileName.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (mimeType === "application/pdf" || fileName.endsWith(".pdf")) {
    const pdfParse = await import("pdf-parse");
    const parser = (pdfParse as unknown as { default?: (data: Buffer) => Promise<{ text: string }>; pdf?: (data: Buffer) => Promise<{ text: string }> }).default ??
      (pdfParse as unknown as { pdf?: (data: Buffer) => Promise<{ text: string }> }).pdf;

    if (!parser) {
      return "PDF uploaded. Text extraction requires configuring the installed pdf-parse export for this runtime.";
    }

    const result = await parser(buffer);
    return result.text;
  }

  throw new Error("Unsupported file type");
}
