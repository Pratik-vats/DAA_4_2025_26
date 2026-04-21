import React from 'react';

export function BarChart({ ratio }) {
  const pct = Math.max(0, Math.min(100, parseFloat(ratio)));
  const color = pct > 50 ? "#00ff87" : pct > 20 ? "#ffd600" : "#ff4d4d";
  return (
    <div className="barchart-container">
      <div className="barchart-header">
        <span className="barchart-label">SPACE SAVED</span>
        <span className="barchart-pct" style={{ color }}>{pct}%</span>
      </div>
      <div className="barchart-track">
        <div
          className="barchart-fill"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  );
}
