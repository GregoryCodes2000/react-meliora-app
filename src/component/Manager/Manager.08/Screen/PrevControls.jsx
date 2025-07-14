import React from "react";
import "./prev_controls.css";


const PrevControls = ({ orientation, setOrientation }) => {
  return (
    <div className="preview-controls">
      <button
        className={`toggle-button ${
          orientation === "horizontal" ? "active" : ""
        }`}
        onClick={() => setOrientation("horizontal")}
      >
        Horizontal
      </button>

      <button
        className={`toggle-button ${
          orientation === "vertical" ? "active" : ""
        }`}
        onClick={() => setOrientation("vertical")}
      >
        Vertical
      </button>
    </div>
  );
};

export default PrevControls;
