import mammoth from "mammoth";
import * as XLSX from "xlsx";

export async function extractTextFromFile(
  buffer: Buffer,
  mimeType: string,
  fileName: string,
): Promise<string> {
  const lowerName = fileName.toLowerCase();

  if (mimeType === "text/plain" || lowerName.endsWith(".txt")) {
    return buffer.toString("utf-8");
  }

  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    lowerName.endsWith(".docx")
  ) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  if (mimeType === "application/pdf" || lowerName.endsWith(".pdf")) {
    const pdfParse = await import("pdf-parse");
    const parser = (pdfParse as unknown as { default?: (data: Buffer) => Promise<{ text: string }>; pdf?: (data: Buffer) => Promise<{ text: string }> }).default ??
      (pdfParse as unknown as { pdf?: (data: Buffer) => Promise<{ text: string }> }).pdf;

    if (!parser) {
      return "PDF uploaded. Text extraction requires configuring the installed pdf-parse export for this runtime.";
    }

    const result = await parser(buffer);
    return result.text;
  }

  if (
    mimeType === "application/vnd.ms-excel" ||
    mimeType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    lowerName.endsWith(".xls") ||
    lowerName.endsWith(".xlsx")
  ) {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    return workbook.SheetNames
      .map((sheetName) => {
        const rows = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
        return `Sheet: ${sheetName}\n${rows}`;
      })
      .join("\n\n")
      .trim();
  }

  throw new Error("Unsupported file type");
}
