import React, { useState } from "react";
import { NavLink } from "react-router-dom";
//import "/home/kasm-user/Documents/4000_react_gri/05_Mirror_decor/decor/src/component/Manager/Manager.08/sidebar.css";
import "./sidebar.css";
import ThemeMode from "./ThemeMode";
import browserImage from '/home/kasm-user/Documents/16_nav_mirr_github/08_nav_mirr_gh/src/assets/browser.png';
import profileImage from '/home/kasm-user/Documents/16_nav_mirr_github/08_nav_mirr_gh/src/assets/profile_2.png';

const Sidebar = ({ isMobile }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);

    
  };

  const [theme, setTheme] = useState("light");

  return (
    <div className="sidebar box-shadowed">
      <div className="profile-button box-shadowed">
        <img
          src={profileImage}
          alt="Profile"
          className="profile-img"
        />
        <span>Profile</span>
      </div>

      <div className="sidebar-buttons-container">
        
        <NavLink to="/screen" className="sidebar-button box-shadowed" activeClassName="active">Screen</NavLink>
        
        <h3 className="bar-header">[Customize Modules]</h3>
{/*         <NavLink to="/custom" className="sidebar-button" activeClassName="active">Customize</NavLink>
 */}        <NavLink to="/clock" className="sidebar-button box-shadowed" activeClassName="active">Clock</NavLink>
        <NavLink to="/weather" className="sidebar-button box-shadowed" activeClassName="active">Weather</NavLink>

        <h3 className="bar-header">[Quick Links]</h3>
        <a className="sidebar-button box-shadowed">
          Website
          <img src={browserImage} className="browser-icon" />
        </a>
       
        
        
      </div>
      {/* <div>
      <ThemeMode theme={theme} setTheme={setTheme} />
      </div> */}

      

      {/* <div className="dropdown">
     
        <div className="dropdown-button" onClick={toggleSettings} role="button">
          
          Settings
          <img
            src="../../settings.png"
            alt="Settings Icon"
            className="settings-icon"
          />
          <span className={`arrow ${isSettingsOpen ? "up" : "down"}`}></span>
        </div>
        <ul className={`dropdown-menu ${isSettingsOpen ? "open" : ""}`}>
          <li className="dropdown-item">
            <a href="/screen">Screen</a>
            </li>
         
          <li className="dropdown-item">
            <a href="/custom">Customize</a>
            </li>
        </ul>
      </div>  */}
    </div>
  );
};

export default Sidebar;
