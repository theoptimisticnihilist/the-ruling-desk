// Client-side text extraction for transcripts/articles.
// Supports: .txt, .md, .rtf, .pdf, .docx
// All parsing happens in the browser. No uploads, no storage.

export type ExtractedFile = {
  name: string;
  type: string; // human-readable kind (e.g. "PDF", "DOCX", "Text")
  text: string;
};

const TEXT_EXTS = ["txt", "md", "rtf"] as const;

function ext(name: string): string {
  const i = name.lastIndexOf(".");
  return i >= 0 ? name.slice(i + 1).toLowerCase() : "";
}

function kindLabel(extension: string): string {
  switch (extension) {
    case "pdf":
      return "PDF";
    case "docx":
      return "DOCX";
    case "rtf":
      return "RTF";
    case "md":
      return "Markdown";
    case "txt":
      return "Text";
    default:
      return extension.toUpperCase() || "File";
  }
}

// Strip RTF control words to a best-effort plain text rendering.
function stripRtf(rtf: string): string {
  let out = rtf;
  // Remove RTF header groups like {\fonttbl ...}
  out = out.replace(/\\\*?\\?[a-zA-Z]+-?\d* ?/g, "");
  out = out.replace(/[{}]/g, "");
  out = out.replace(/\\'[0-9a-fA-F]{2}/g, "");
  out = out.replace(/\\\n/g, "\n");
  out = out.replace(/\r/g, "");
  return out.trim();
}

async function extractPdf(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  // Vite-friendly worker import. The ?url suffix returns a usable URL.
  const workerUrl = (
    await import("pdfjs-dist/build/pdf.worker.min.mjs?url")
  ).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const buffer = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buffer }).promise;
  const parts: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      // @ts-expect-error pdfjs item shape
      .map((it) => ("str" in it ? it.str : ""))
      .join(" ");
    parts.push(pageText);
  }
  return parts.join("\n\n").trim();
}

async function extractDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth/mammoth.browser");
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return (result.value || "").trim();
}

function readAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"));
    reader.readAsText(file);
  });
}

export async function extractFileText(file: File): Promise<ExtractedFile> {
  const e = ext(file.name);
  let text = "";

  if (e === "pdf") {
    text = await extractPdf(file);
  } else if (e === "docx") {
    text = await extractDocx(file);
  } else if (e === "rtf") {
    text = stripRtf(await readAsText(file));
  } else if ((TEXT_EXTS as readonly string[]).includes(e) || !e) {
    text = await readAsText(file);
  } else {
    throw new Error(`Unsupported file type: .${e}`);
  }

  if (!text.trim()) {
    throw new Error("No text could be extracted from this file.");
  }

  return { name: file.name, type: kindLabel(e), text };
}

export const ACCEPTED_DOC_EXTENSIONS = ".txt,.md,.rtf,.pdf,.docx";
