import React from "react";
import ImagePreview from "./PreviewImage/PreviewImg";
import "./switches.css";

const ToggleSwitches = ({
  options,
  handleToggleChange,
  handleGroupClick,
  showImageSection,
}) => {
  return (
    <div className="checkbox-wrapper">
    <div className="checkbox-container">
      {["clock", "weather", "calendar", "compliments", "newsfeed"].map(
        (item) => (
          <div className="toggle-switch-group box-shadowed">
            <div
              className="switch-header "
              key={item}
              onClick={() => handleGroupClick(item)}
            >
              <label
                className="toggle-switch"
                onClick={(e) => e.stopPropagation()} // Prevent click on label from triggering parent click
              >
                <input
                  type="checkbox"
                  id={item}
                  name={item}
                  checked={options[item]}
                  onChange={handleToggleChange}
                />

                <span className="slider"></span>
              </label>

              <span className="toggle-label">
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </span>

              {/*             <span className={`arrow ${showImageSection[item] ? "up" : ""}`}></span>
               */}

               <div className="arrow-div">
                <span
                  className={`arrow ${showImageSection[item] ? "up" : ""}`}
                ></span>
              </div> 
            </div>

            {showImageSection[item] && (
              <div
              className={`img-section ${
                showImageSection[item] ? "active" : ""
              } ${item === "weather" ? "weather-bottom" : ""} ${
                item === "calendar" ? "calendar-bottom" : ""
              }`}
            >
              <img
                src={require(`/home/kasm-user/Documents/4000_react_gri/05_Mirror_decor/decor/src/component/Manager/${item}.png`)}
                alt={item}
                className={`toggle-image ${item}`}
              />
            </div>
            )}
          </div>
        )
      )}
    </div>
    </div>
  );
};

export default ToggleSwitches;
