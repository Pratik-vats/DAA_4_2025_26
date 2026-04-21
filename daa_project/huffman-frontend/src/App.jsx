import React from "react";
import { useLogs } from "./hooks/useLogs";
import { useCompress } from "./hooks/useCompress";
import { useDecompress } from "./hooks/useDecompress";
import { fmtBytes } from "./utils/helpers";

import { Panel } from "./components/Panel";
import { DropZone } from "./components/DropZone";
import { StatRow } from "./components/StatRow";
import { BarChart } from "./components/BarChart";
import { ActivityLog } from "./components/ActivityLog";

export default function App() {
  const { logs, addLog } = useLogs();
  
  const {
    cFile, cLoading, cResult, cError, handleCompress, resetCompress
  } = useCompress(addLog);
  
  const {
    dFile, dLoading, dResult, dError, handleDecompress, resetDecompress
  } = useDecompress(addLog);

  return (
    <div className="app-container">
      {/* Header */}
      <div className="header-container">
        <div className="header-subtitle">
          ◈ Data Compression Tool v2.0
        </div>
        <h1 className="header-title">
          HUFFMAN<span>.</span>
        </h1>
        <div className="header-desc">
          LOSSLESS FILE COMPRESSION · ENTROPY ENCODING
        </div>
      </div>

      {/* Main Cards */}
      <div className="cards-container">
        {/* ── COMPRESS ── */}
        <Panel title="▲ Compress" accentColor="#00ff87">
          <DropZone
            icon="📄"
            label="Drop any file, or click to browse"
            onFile={(f) => resetCompress(f)}
            active={!!cFile}
          />

          {cFile && (
            <div className="file-info-box">
              <span className="file-info-name">{cFile.name}</span>
              <span>{fmtBytes(cFile.size)}</span>
            </div>
          )}

          <button
            onClick={handleCompress}
            disabled={!cFile || cLoading}
            className={`btn ${cFile && !cLoading ? 'btn-compress-active' : 'btn-compress-disabled'}`}
          >
            {cLoading ? (
              <span className="btn-loading-text">COMPRESSING…</span>
            ) : (
              "▲ COMPRESS FILE"
            )}
          </button>

          {cError && (
            <div className="error-box">
              ✗ {cError}
            </div>
          )}

          {cResult && (
            <div className="result-box-compress">
              <StatRow label="ORIGINAL SIZE" value={fmtBytes(cResult.originalSize)} />
              <StatRow label="COMPRESSED SIZE" value={fmtBytes(cResult.compressedSize)} accent="#00ff87" />
              <StatRow label="UNIQUE CHARS" value={cResult.uniqueChars} />
              <BarChart ratio={cResult.ratio} />
              <a
                href={cResult.url}
                download={cResult.filename}
                className="download-btn-compress"
              >
                ⬇ DOWNLOAD {cResult.filename}
              </a>
            </div>
          )}
        </Panel>

        {/* ── DECOMPRESS ── */}
        <Panel title="▼ Decompress" accentColor="#60a5fa">
          <DropZone
            icon="📦"
            label="Drop a .cmp file, or click to browse"
            accept=".cmp"
            onFile={(f) => resetDecompress(f)}
            active={!!dFile}
          />

          {dFile && (
            <div className="file-info-box">
              <span className="file-info-name">{dFile.name}</span>
              <span>{fmtBytes(dFile.size)}</span>
            </div>
          )}

          <button
            onClick={handleDecompress}
            disabled={!dFile || dLoading}
            className={`btn ${dFile && !dLoading ? 'btn-decompress-active' : 'btn-decompress-disabled'}`}
          >
            {dLoading ? (
              <span className="btn-loading-text">DECOMPRESSING…</span>
            ) : (
              "▼ DECOMPRESS FILE"
            )}
          </button>

          {dError && (
            <div className="error-box">
              ✗ {dError}
            </div>
          )}

          {dResult && (
            <div className="result-box-decompress">
              <StatRow label="DECOMPRESSED SIZE" value={fmtBytes(dResult.size)} accent="#60a5fa" />
              <a
                href={dResult.url}
                download={dResult.filename}
                className="download-btn-decompress"
              >
                ⬇ DOWNLOAD {dResult.filename}
              </a>
            </div>
          )}

          {/* Info box */}
          <div className="info-box">
            <div className="info-box-title">
              HOW IT WORKS
            </div>
            {[
              ["01", "Count character frequencies"],
              ["02", "Build min-heap priority queue"],
              ["03", "Construct Huffman binary tree"],
              ["04", "Assign variable-length codes"],
              ["05", "Encode & pack into binary"],
            ].map(([n, t]) => (
              <div key={n} className="info-box-item">
                <span className="info-box-num">{n}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* ── Activity Log ── */}
      <ActivityLog logs={logs} />

      {/* Footer */}
      <div className="app-footer">
        HUFFMAN COMPRESSION · ADSA PROJECT · REACT + NODE.JS
      </div>
    </div>
  );
}
