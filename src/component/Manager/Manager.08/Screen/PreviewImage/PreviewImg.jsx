import React, { useState } from "react";
import "./preview_img.css";

const ImagePreview = ({ src, alt }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <img
        src={src}
        alt={alt}
        className="small-image"
        onClick={() => setIsOpen(true)} // Open preview on click
      />

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content">
            <img src={src} alt={alt} className="large-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImagePreview;
