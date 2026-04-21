import { useState } from "react";
import { fmtBytes } from "../utils/helpers";

const API = "http://localhost:5000/api";

export function useCompress(addLog) {
  const [cFile, setCFile] = useState(null);
  const [cLoading, setCLoading] = useState(false);
  const [cResult, setCResult] = useState(null);
  const [cError, setCError] = useState(null);

  async function handleCompress() {
    if (!cFile) return;
    setCLoading(true);
    setCResult(null);
    setCError(null);
    addLog(`Compressing "${cFile.name}" (${fmtBytes(cFile.size)})…`);
    try {
      const fd = new FormData();
      fd.append("file", cFile);
      const res = await fetch(`${API}/compress`, { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const headers = res.headers;
      const stats = {
        originalSize: parseInt(headers.get("X-Original-Size")),
        compressedSize: parseInt(headers.get("X-Compressed-Size")),
        ratio: headers.get("X-Compression-Ratio"),
        uniqueChars: headers.get("X-Unique-Chars"),
        filename: cFile.name + ".cmp",
        url,
      };
      setCResult(stats);
      addLog(`✓ Compressed to ${fmtBytes(stats.compressedSize)} — saved ${stats.ratio}%`, "success");
    } catch (e) {
      setCError(e.message);
      addLog(`✗ ${e.message}`, "error");
    } finally {
      setCLoading(false);
    }
  }

  const resetCompress = (file) => {
    setCFile(file);
    setCResult(null);
    setCError(null);
  };

  return {
    cFile,
    cLoading,
    cResult,
    cError,
    handleCompress,
    resetCompress
  };
}
