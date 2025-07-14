import React from "react";
import "./preview_grid.css";

const PreviewGrid = ({
    gridContent,
    orientation,
    handleDragOver,
    handleDrop,
    handleDragStart,
    handleDragEnd,
  }) => {
    return(
      /*   <div className="preview-wrapper"> */
        <div
          className="preview-container"
          onDragOver={handleDragOver}
          onDrop={(e) => e.preventDefault()} // Prevent external drops
        >
          <div className={`preview-window ${orientation}`}>
            {gridContent.map((content, index) => (
              <div
                className={`preview-square ${
                  content === "weather" || content === "calendar"
                    ? "large-item"
                    : content === "newsfeed"
                    ? "long-item"
                    : ""
                }`}
                key={index}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {content && (
                  <img
                    src={require(`/home/kasm-user/Documents/4000_react_gri/05_Mirror_decor/decor/src/component/Manager/${content}.png`)}
                    alt={content}
                    className="preview-image"
                    draggable
                    onDragStart={(e) => handleDragStart(e, content)}
                    onDragEnd={handleDragEnd}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        /* </div> */
    );
};

export default PreviewGrid;