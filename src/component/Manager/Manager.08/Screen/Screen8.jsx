import React, { useState } from "react";
import "../../Manager.08/Screen/screen8.css";
import PrevControls from "./PrevControls";
import PreviewGrid from "./PreviewGrid";
import PrevSettings from "./PrevSettings/PrevSettings";
import ToggleSwitches from "./Switches";
import Zoom from "./Zoom/Zoom";

const Manager8 = () => {
  const [options, setOptions] = useState({
    clock: true,  //default ON
    weather: false,
    calendar: false,
    compliments: true,
    newsfeed: true,
  });

  const [showImageSection, setShowImageSection] = useState({
    clock: false,
    weather: false,
    calendar: false,
    compliments: false,
    newsfeed: false,
  });

  const [gridContent, setGridContent] = useState(() => {
    const grid = Array(42).fill(null);
    grid[0] = "clock"; //place clock in first position
    grid[17] = "compliments";
    grid[26] = "newsfeed";
    return grid;
  });
  const [orientation, setOrientation] = useState("horizontal");

  const handleToggleChange = (event) => {
    const { name, checked } = event.target;

    setOptions((prevOptions) => ({ ...prevOptions, [name]: checked }));

    if (checked) {
      setGridContent((prevGrid) => {
        const newGrid = [...prevGrid];
        const firstEmptyIndex = newGrid.findIndex((item) => item === null);
        if (firstEmptyIndex !== -1) newGrid[firstEmptyIndex] = name;
        return newGrid;
      });
    } else {
      setGridContent((prevGrid) =>
        prevGrid.map((item) => (item === name ? null : item))
      );
    }
  };

  const handleGroupClick = (name) => {
    setShowImageSection((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleDragStart = (e, content) => {
    e.dataTransfer.setData("draggedItem", content);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop by preventing default behavior
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("draggedItem");

    setGridContent((prevGrid) => {
      const newGrid = [...prevGrid];
      const currentIndex = newGrid.findIndex((item) => item === draggedItem);

      if (currentIndex !== -1) newGrid[currentIndex] = null; // Remove from old position
      newGrid[index] = draggedItem; // Add to new position

      return newGrid;
    });
  };

  const handleDragEnd = (e) => {
    const previewWindow = document.querySelector(".preview-window");
    const previewRect = previewWindow.getBoundingClientRect();
    const { clientX, clientY } = e;

    // Check if drag ended outside preview window
    if (
      clientX < previewRect.left ||
      clientX > previewRect.right ||
      clientY < previewRect.top ||
      clientY > previewRect.bottom
    ) {
      e.preventDefault();
    }
  };

  const handleClearMirror = () => {
    setOptions({
      clock: false,
      weather: false,
      calendar: false,
      compliments: false,
      newsfeed: false,
    });
  
    /* setShowImageSection({
      clock: false,
      weather: false,
      calendar: false,
      compliments: false,
      newsfeed: false,
    }); */
  
    setGridContent(Array(42).fill(null));
  };
  
  const handleReset = () => {
    // Reset toggle switches
    setOptions({
      clock: true,
      weather: false,
      calendar: false,
      compliments: true,
      newsfeed: true,
    });
  
    // Reset grid content
    setGridContent(() => {
      const grid = Array(42).fill(null);
      grid[0] = "clock"; // Default position
      grid[17] = "compliments";
      grid[26] = "newsfeed";
      return grid;
    });
  
    
  };
  

  return (
    <div className="layout">
      <div className="toggle-group">
        <ToggleSwitches
          options={options}
          handleToggleChange={handleToggleChange}
          handleGroupClick={handleGroupClick}
          showImageSection={showImageSection}
        />
      </div>
      <div className="screen-control">
        <PrevControls
          orientation={orientation}
          setOrientation={setOrientation}
        />

        <Zoom
          gridContent={gridContent}
          orientation={orientation}
          handleDragOver={handleDragOver}
          handleDrop={handleDrop}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />

        <div className="screen-content">
          <PreviewGrid
            gridContent={gridContent}
            orientation={orientation}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
          />
        </div>

        <div className="prev-settings-group">
          <PrevSettings 
          handleClear={handleClearMirror} 
          handleReset={handleReset}/>
        </div>
      </div>
    </div>
  );
};

export default Manager8;
