import React from 'react';

export function StatRow({ label, value, accent }) {
  return (
    <div className="stat-row">
      <span className="stat-row-label">{label}</span>
      <span
        className="stat-row-value"
        style={{ color: accent || "#e0e0e0" }}
      >
        {value}
      </span>
    </div>
  );
}
