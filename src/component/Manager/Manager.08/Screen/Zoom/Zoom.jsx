import React, { useState } from "react";
import PreviewGrid from "../PreviewGrid";
import "./zoom.css"; // Optional styling for overlay

const Zoom = ({
  gridContent,
  orientation,
  handleDragOver,
  handleDrop,
  handleDragStart,
  handleDragEnd,
}) => {
  const [zoomed, setZoomed] = useState(false);

  const toggleZoom = () => setZoomed((prev) => !prev);

  return (
    <>
      <button onClick={toggleZoom} className="zoom-button box-shadowed">Zoom</button>

      {zoomed && (
        <div className="zoom-overlay" onClick={toggleZoom}>
          <div
            className="zoom-close"
            onClick={(e) => {
              e.stopPropagation();
              setZoomed(false);
            }}
          >
            &times;
          </div>
          <div className="zoom-preview" onClick={(e) => e.stopPropagation()}>
            <PreviewGrid
              gridContent={gridContent}
              orientation={orientation}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Zoom;
