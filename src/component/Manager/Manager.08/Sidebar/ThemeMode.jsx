import React, { useEffect } from "react";
import "./theme_mode.css";

const ThemeMode = ({ theme, setTheme }) => {
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="theme_mode">
      <button
        className={`theme-button ${theme === "light" ? "active" : ""}`}
        onClick={() => setTheme("light")}
      >
        light
      </button>
      <button
        className={`theme-button ${theme === "dark" ? "active" : ""}`}
        onClick={() => setTheme("dark")}
      >
        dark
      </button>
    </div>
  );
};

export default ThemeMode; 
