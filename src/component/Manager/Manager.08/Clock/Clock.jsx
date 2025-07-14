import React, { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import "./clock.css";
import Sidebar from "../Sidebar/Sidebar";
import Select from 'react-select';

const Clock = ({ theme }) => {
  const allTimeZones = Intl.supportedValuesOf("timeZone") || [];
  const defaultTimeZone = allTimeZones.includes(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  )
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : "UTC";

  const [timeZone, setTimeZone] = useState(
    localStorage.getItem("userTimeZone") || defaultTimeZone
  );
  const [is24Hour, setIs24Hour] = useState(true); // NEW: 24H toggle state
  const [currentTime, setCurrentTime] = useState({
    date: "",
    time: "",
    seconds: "",
  });

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formattedDate = formatInTimeZone(
          now,
          timeZone,
          "EEEE, MMMM d, yyyy"
        );
        const timeFormat = is24Hour ? "HH:mm" : "hh:mm a"; // Use 12H/24H format
        let formattedTime = formatInTimeZone(now, timeZone, timeFormat);
        let timePart = formattedTime;
        let meridiem = "";

        if (!is24Hour) {
          const parts = formattedTime.split(" ");
          timePart = parts[0];
          meridiem = parts[1]; // "AM" or "PM"
        }

        const seconds = formatInTimeZone(now, timeZone, "ss");
        setCurrentTime({ date: formattedDate, time: formattedTime, seconds });
      } catch (error) {
        console.error("Error formatting time:", error);
        setCurrentTime({ date: "Invalid time zone", time: "", seconds: "" });
      }
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, is24Hour]); // update when toggle changes

  const handleTimeZoneChange = (e) => {
    const selectedTimeZone = e.target.value;
    if (allTimeZones.includes(selectedTimeZone)) {
      setTimeZone(selectedTimeZone);
      localStorage.setItem("userTimeZone", selectedTimeZone);
    } else {
      console.warn("Invalid time zone selected:", selectedTimeZone);
    }
  };

  const options = allTimeZones.map((tz) => ({
    label: tz.replace("_", " "), // optional formatting
    value: tz,
  }));

  const [timeColor, setTimeColor] = useState("#ffffff"); // default white
  /* const options = allTimeZones.map(tz => ({ value: tz, label: tz })); */

  const filteredOptions = options.filter(
    (opt) => !opt.value.startsWith("Africa/")
  );

  return (
    <div className="time-zone">
      <div className="time-display">
        <div className="time-border">
          <div className="date">{currentTime.date}</div>
          <div className="clock" style={{ color: timeColor }}>
            {currentTime.time.replace(/ (AM|PM)/, "")}
            {currentTime.time.match(/ (AM|PM)/) && (
              <span className="meridiem">
                {currentTime.time.match(/ (AM|PM)/)[1]}
              </span>
            )}
            <span className="seconds">{currentTime.seconds}</span>
          </div>
        </div>
        {/* NEW: Time format buttons */}
        <div className="time-format-buttons">
          <button
            className={is24Hour ? "" : "active"}
            onClick={() => setIs24Hour(false)}
          >
            12H
          </button>
          <button
            className={is24Hour ? "active" : ""}
            onClick={() => setIs24Hour(true)}
          >
            24H
          </button>
        </div>

        

        <div className="color-picker-wrapper">
  <label className="color-label">Select Your Color:</label>
  <div className="color-picker">
    {["#ffffff", "#ff8400", "#00c2ff", "#39e75f", "#ff3f81"].map((color) => (
      <div
        key={color}
        className="color-square"
        style={{ backgroundColor: color }}
        onClick={() => setTimeColor(color)}
      />
    ))}
  </div>
</div>
      </div>

      <div className="selector">
     
        <label htmlFor="timeZoneSelect" className="time-zone-label">
          Select Your Time Zone:
        </label>
        <Select 
        
        styles={{
         
    input: (base) => ({
      ...base,
      caretColor: theme === "dark" ? "#fff" : "#000",
      border:"none",
      color:theme === "dark" ? "#fff" : "#000",
      
    }),
    control: (base) => ({
      ...base,
      backgroundColor: theme === "dark" ? "#2a2a2a" : "#d7d7d7",
      borderRadius: "10px",
      padding: "2px",
      boxShadow:
        theme === "dark"
          ? "-2px -2px 4px #1c1c1c, 2px 2px 4px #444444"
          : "-2px -2px 4px #6f6f6f, 2px 2px 4px #ffffff",
      border: "none",
      
    }),
    menu: (base) => ({
      ...base,
      maxHeight: 350,
      overflowY: "auto",
      backgroundColor: theme === "dark" ? "#2a2a2a" : "#d7d7d7",
      boxShadow:
        theme === "dark"
          ? "-2px -2px 4px #1c1c1c, 2px 2px 4px #444444"
          : "-2px -2px 4px #6f6f6f, 2px 2px 4px #ffffff",
      border: "none",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? theme === "dark"
          ? "#4e4e4e"
          : "#ecb32e"
        : "transparent",
      color: theme === "dark" ? "#fff" : "#000",
      cursor: "pointer",
    }),
  }}
  classNamePrefix="tz-select"
  className="tz-select-container"
  options={filteredOptions}
  onChange={(selected) => setTimeZone(selected.value)}
  defaultValue={options.find((opt) => opt.value === timeZone)}
  
  
/>
      </div>
    </div>
  );
};

export default Clock;
