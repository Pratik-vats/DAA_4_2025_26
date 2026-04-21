# Huffman File Compressor

A full-stack web application for lossless file compression using Huffman coding.  
The core Huffman algorithm is implemented in Node.js on the backend, with a modern, modular React (Vite) architecture on the frontend.

---

## Project Architecture

The project has been refactored into a clean, professional file structure separating the backend and frontend:

```text
daa_project/
├── server.js              ← Node.js/Express backend (Huffman compression logic)
├── package.json           ← Backend dependencies
└── huffman-frontend/      ← React (Vite) Frontend application
    ├── src/
    │   ├── components/    ← Reusable UI components (DropZone, BarChart, etc.)
    │   ├── hooks/         ← Custom React hooks for data-fetching and state
    │   ├── styles/        ← Modular CSS styling
    │   ├── utils/         ← Helper functions
    │   ├── App.jsx        ← Main layout orchestrator
    │   └── main.jsx       ← React DOM entry point
    └── package.json       ← Frontend dependencies
```

---

## How to Run the Application

To run the application, you need to start both the Node.js backend and the React frontend.

### 1. Start the Backend

Open a terminal and navigate to the project root (`daa_project`):

```bash
cd "d: daa_project"

# Install backend dependencies (only needed once)
npm install

# Start the Node.js Express server
npm start
```
*The backend will be running on `http://localhost:5000`.*

### 2. Start the Frontend

Open a **new** terminal and navigate to the `huffman-frontend` directory:

```bash
cd "d:daa_project\huffman-frontend"

# Install frontend dependencies (only needed once)
npm install

# Start the Vite development server
npm run dev
```
*The frontend will be running on `http://localhost:5173`. Open this URL in your browser to use the app.*

---

## API Endpoints (Backend)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/compress` | Upload any file → returns `.cmp` compressed binary |
| POST | `/api/decompress` | Upload `.cmp` file → returns original file |

Both endpoints accept `multipart/form-data` with field name `file`.

### Response Headers (compress)
- `X-Original-Size` — size of input in bytes
- `X-Compressed-Size` — size of compressed output
- `X-Compression-Ratio` — % space saved
- `X-Unique-Chars` — distinct characters in input

---

## How Huffman Compression Works

1. **Frequency count** — count occurrences of each character
2. **Priority queue** — build a min-heap of nodes sorted by frequency
3. **Tree construction** — repeatedly merge two lowest-frequency nodes
4. **Code assignment** — traverse the tree; left=`0`, right=`1`
5. **Encoding** — replace each character with its variable-length code
6. **Binary packing** — pack bit-string into bytes, store frequency table as header

The result is near-optimal prefix-free encoding that achieves strong compression on text files with skewed character distributions.
