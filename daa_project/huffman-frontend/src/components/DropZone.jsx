import React, { useState, useRef, useCallback } from 'react';

export function DropZone({ onFile, accept, label, icon, active }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef();

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) onFile(f);
    },
    [onFile]
  );

  let dropzoneClass = "dropzone dropzone-inactive";
  if (dragging) dropzoneClass = "dropzone dropzone-dragging";
  else if (active) dropzoneClass = "dropzone dropzone-active";

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current.click()}
      className={dropzoneClass}
    >
      {dragging && <div className="dropzone-drag-overlay" />}
      <div className="dropzone-icon">{icon}</div>
      <div className="dropzone-label">{label}</div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files[0]) {
            onFile(e.target.files[0]);
            e.target.value = null; // Reset value
          }
        }}
      />
    </div>
  );
}
