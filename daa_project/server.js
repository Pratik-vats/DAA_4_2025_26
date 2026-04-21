// server.js — Huffman Compressor Backend
// Run: npm install express multer cors  &&  node server.js

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

// ─── Huffman Core ────────────────────────────────────────────────────────────

class HuffNode {
  constructor(ch, freq, left = null, right = null) {
    this.ch = ch;
    this.freq = freq;
    this.left = left;
    this.right = right;
  }
}

function buildTree(freqMap) {
  // Min-heap via sorted array (fine for typical alphabet sizes)
  let pq = [...freqMap.entries()].map(([ch, freq]) => new HuffNode(ch, freq));
  pq.sort((a, b) => a.freq - b.freq);

  while (pq.length > 1) {
    const left = pq.shift();
    const right = pq.shift();
    const parent = new HuffNode(null, left.freq + right.freq, left, right);
    // Insert sorted
    let i = 0;
    while (i < pq.length && pq[i].freq <= parent.freq) i++;
    pq.splice(i, 0, parent);
  }
  return pq[0];
}

function buildCodes(node, prefix = "", codes = new Map()) {
  if (!node) return codes;
  if (!node.left && !node.right) {
    codes.set(node.ch, prefix || "1");
    return codes;
  }
  buildCodes(node.left, prefix + "0", codes);
  buildCodes(node.right, prefix + "1", codes);
  return codes;
}

function compress(inputBuffer) {
  const text = inputBuffer.toString("binary");
  if (!text.length) throw new Error("Input file is empty.");

  // Count frequencies
  const freq = new Map();
  for (const ch of text) freq.set(ch, (freq.get(ch) || 0) + 1);

  const root = buildTree(freq);
  const codes = buildCodes(root);

  // Encode
  let bitString = "";
  for (const ch of text) bitString += codes.get(ch);

  const extraBits = (8 - (bitString.length % 8)) % 8;
  const padded = bitString + "0".repeat(extraBits);

  // Build output: header + binary payload
  // Header format: <numChars>\n<ascii> <freq>\n... <extraBits>\n <bytes>
  let header = `${freq.size}\n`;
  for (const [ch, f] of freq) header += `${ch.charCodeAt(0)} ${f}\n`;
  header += `${extraBits}\n`;

  const headerBuf = Buffer.from(header, "binary");
  const payloadSize = padded.length / 8;
  const payloadBuf = Buffer.alloc(payloadSize);
  for (let i = 0; i < payloadSize; i++) {
    payloadBuf[i] = parseInt(padded.slice(i * 8, i * 8 + 8), 2);
  }

  const result = Buffer.concat([headerBuf, payloadBuf]);

  return {
    buffer: result,
    stats: {
      originalSize: inputBuffer.length,
      compressedSize: result.length,
      ratio: ((1 - result.length / inputBuffer.length) * 100).toFixed(1),
      uniqueChars: freq.size,
    },
  };
}

function decompress(inputBuffer) {
  const raw = inputBuffer.toString("binary");
  const lines = raw.split("\n");

  let idx = 0;
  const n = parseInt(lines[idx++]);
  const freq = new Map();
  for (let i = 0; i < n; i++) {
    const [ascii, f] = lines[idx++].trim().split(" ");
    freq.set(String.fromCharCode(parseInt(ascii)), parseInt(f));
  }
  const extraBits = parseInt(lines[idx++]);

  // Everything after the header newline is binary payload
  const headerText = lines.slice(0, idx).join("\n") + "\n";
  const headerBytes = Buffer.from(headerText, "binary").length;
  const payload = inputBuffer.slice(headerBytes);

  let bitString = "";
  for (const byte of payload) bitString += byte.toString(2).padStart(8, "0");
  if (extraBits) bitString = bitString.slice(0, -extraBits);

  const root = buildTree(freq);
  let curr = root;
  const outputChars = [];

  for (const bit of bitString) {
    curr = bit === "0" ? curr.left : curr.right;
    if (!curr.left && !curr.right) {
      outputChars.push(curr.ch);
      curr = root;
    }
  }

  return Buffer.from(outputChars.join(""), "binary");
}

// ─── Routes ──────────────────────────────────────────────────────────────────

app.post("/api/compress", upload.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });
    const { buffer, stats } = compress(req.file.buffer);
    const filename = req.file.originalname + ".cmp";
    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Original-Size": stats.originalSize,
      "X-Compressed-Size": stats.compressedSize,
      "X-Compression-Ratio": stats.ratio,
      "X-Unique-Chars": stats.uniqueChars,
      "Access-Control-Expose-Headers":
        "X-Original-Size,X-Compressed-Size,X-Compression-Ratio,X-Unique-Chars",
    });
    res.send(buffer);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/decompress", upload.single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded." });
    const result = decompress(req.file.buffer);
    const filename = req.file.originalname.replace(/\.cmp$/, "") || "decompressed.txt";
    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "X-Decompressed-Size": result.length,
      "Access-Control-Expose-Headers": "X-Decompressed-Size",
    });
    res.send(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(5000, () => console.log("🚀 Huffman server running on http://localhost:5000"));
