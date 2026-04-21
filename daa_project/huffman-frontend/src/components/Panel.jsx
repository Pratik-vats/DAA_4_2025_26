import React from 'react';

export function Panel({ title, accentColor, children }) {
  return (
    <div
      className="panel"
      style={{ borderTop: `2px solid ${accentColor}` }}
    >
      <div
        className="panel-title"
        style={{ color: accentColor }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
