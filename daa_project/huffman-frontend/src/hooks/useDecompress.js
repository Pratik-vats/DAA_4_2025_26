import { useState } from "react";
import { fmtBytes } from "../utils/helpers";

const API = "http://localhost:5000/api";

export function useDecompress(addLog) {
  const [dFile, setDFile] = useState(null);
  const [dLoading, setDLoading] = useState(false);
  const [dResult, setDResult] = useState(null);
  const [dError, setDError] = useState(null);

  async function handleDecompress() {
    if (!dFile) return;
    setDLoading(true);
    setDResult(null);
    setDError(null);
    addLog(`Decompressing "${dFile.name}"…`);
    try {
      const fd = new FormData();
      fd.append("file", dFile);
      const res = await fetch(`${API}/decompress`, { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json();
        throw new Error(j.error);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const filename = dFile.name.replace(/\.cmp$/, "") || "decompressed.txt";
      const size = parseInt(res.headers.get("X-Decompressed-Size")) || blob.size;
      setDResult({ url, filename, size });
      addLog(`✓ Decompressed — ${fmtBytes(size)}`, "success");
    } catch (e) {
      setDError(e.message);
      addLog(`✗ ${e.message}`, "error");
    } finally {
      setDLoading(false);
    }
  }

  const resetDecompress = (file) => {
    setDFile(file);
    setDResult(null);
    setDError(null);
  };

  return {
    dFile,
    dLoading,
    dResult,
    dError,
    handleDecompress,
    resetDecompress
  };
}
