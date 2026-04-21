import { useState } from "react";

export function useLogs() {
  const [logs, setLogs] = useState([]);
  
  const addLog = (msg, type = "info") => {
    setLogs((l) => [{ msg, type, ts: new Date().toLocaleTimeString() }, ...l.slice(0, 19)]);
  };

  return { logs, addLog };
}
