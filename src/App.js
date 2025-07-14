import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import React, { useState } from "react";
import "./App.css";


import Clock from "./component/Manager/Manager.08/Clock/Clock";
import Weather from "./component/Manager/Manager.08/Weather/Weather";
import Manager8 from "./component/Manager/Manager.08/Screen/Screen8";
import Sidebar from "./component/Manager/Manager.08/Sidebar/Sidebar";
import ThemeMode from "./component/Manager/Manager.08/Sidebar/ThemeMode";
import MobileFooter from "./component/Manager/Manager.08/z.Mobile/MobileFooter";

function App() {
  const [theme, setTheme] = useState("light");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showModules, setShowModules] = useState(false);
  
  return (
    <BrowserRouter>
      <div className="manager-container" >
        <div className="sidebar-div" >
          <Sidebar />
          <ThemeMode theme={theme} setTheme={setTheme} />
        </div>

        <div className="content">
          <Routes>
            <Route path="/screen" element={<Manager8 />} />
            <Route path="/clock" element={<Clock theme={theme} />} />
            <Route path="/weather" element={<Weather />} />
          </Routes>
        </div>
       
  <div>
  <MobileFooter />
  </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
