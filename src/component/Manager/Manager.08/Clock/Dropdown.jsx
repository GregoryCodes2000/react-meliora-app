import React, { useState } from "react";
import "./dropdown.css";

const Dropdown = ({ options, selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-dropdown">
      {/* Dropdown Header */}
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || "Select a time zone"}
        <span className={`arrow ${isOpen ? "up" : "down"}`}></span>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <ul className="dropdown-options">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
