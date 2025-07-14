import React, { useState } from "react"; // ✅ import useState
import { useNavigate } from "react-router-dom";
import "./mobileFooter.css";

const MobileFooter = () => {
  const navigate = useNavigate();
  const [showModules, setShowModules] = useState(false); 

  return (
    <>
      <div className="mobile-footer">
        <button className="icon-button">Profile</button>

        <button className="icon-button" onClick={() => navigate("/screen")}>
          Screen
        </button>

        <button
          className="icon-button"
          onClick={() => setShowModules((prev) => !prev)}
        >
          Modules
        </button>

        <button className="icon-button">Other</button>
      </div>

      {showModules && (
        <div className="module-popup">
          <button onClick={() => navigate("/clock")}>Clock</button>
          <button onClick={() => navigate("/weather")}>Weather</button>
        </div>
      )}
    </>
  );
};

export default MobileFooter;
