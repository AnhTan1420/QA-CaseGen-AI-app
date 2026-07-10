"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Trash2, UploadCloud } from "lucide-react";
import { KnowledgeFile } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function KnowledgeBase() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<KnowledgeFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState("Ready to learn from project documents.");

  async function loadFiles() {
    const response = await fetch("/api/files");
    const data = await response.json();
    if (response.ok) setFiles(data.files);
  }

  useEffect(() => {
    loadFiles();
  }, []);

  async function uploadFile(file: File) {
    setIsUploading(true);
    setMessage("Uploading, extracting text, and syncing knowledge base...");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/files", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Upload failed");
      setFiles((current) => [data.file, ...current]);
      setMessage("Document imported successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  async function deleteFile(id: string) {
    await fetch(`/api/files/${id}`, { method: "DELETE" });
    setFiles((current) => current.filter((file) => file.id !== id));
    setMessage("Document removed from knowledge base.");
  }

  function handleFiles(selectedFiles: FileList | null) {
    const file = selectedFiles?.[0];
    if (file) uploadFile(file);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <UploadCloud className="h-5 w-5 text-indigo-400" />
          Knowledge Base
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);
            handleFiles(event.dataTransfer.files);
          }}
          className={`w-full rounded-2xl border border-dashed p-6 text-center transition ${
            dragging ? "border-indigo-400 bg-indigo-500/10" : "border-slate-700 bg-slate-950/70 hover:border-indigo-500"
          }`}
        >
          <UploadCloud className="mx-auto mb-3 h-9 w-9 text-indigo-400" />
          <p className="font-medium">Drop project docs here</p>
          <p className="mt-1 text-sm text-slate-400">Supports .txt, .pdf, .docx, .xls, and .xlsx</p>
          <input ref={inputRef} type="file" accept=".txt,.pdf,.docx,.xls,.xlsx" className="hidden" onChange={(event) => handleFiles(event.target.files)} />
        </button>

        <div className={`rounded-xl border px-3 py-2 text-sm ${isUploading ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-200" : "border-slate-800 bg-slate-950 text-slate-400"}`}>
          {message}
        </div>

        <div className="space-y-2">
          {files.length === 0 ? (
            <p className="text-sm text-slate-500">No documents imported yet.</p>
          ) : (
            files.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 px-3 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-4 w-4 shrink-0 text-indigo-400" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{file.file_name}</p>
                    <p className="text-xs text-slate-500">{(file.file_size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => deleteFile(file.id)} className="hover:bg-red-500/10 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
