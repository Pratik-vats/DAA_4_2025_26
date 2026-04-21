import React from 'react';

const logColor = { info: "#555", success: "#00ff87", error: "#ff4d4d" };

export function ActivityLog({ logs }) {
  return (
    <div className="activity-log-container">
      <div className="activity-log-title">◈ Activity Log</div>
      {logs.length === 0 ? (
        <div className="activity-log-empty">— awaiting operations —</div>
      ) : (
        logs.map((l, i) => (
          <div
            key={i}
            className="activity-log-item"
            style={{ color: logColor[l.type] || logColor.info }}
          >
            <span className="activity-log-ts">{l.ts}</span>
            <span>{l.msg}</span>
          </div>
        ))
      )}
    </div>
  );
}
