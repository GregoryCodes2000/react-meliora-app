import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Clock from "./component/Manager/Manager.08/Clock/Clock";
import Custom from "./component/Manager/Manager.08/Customize/Custom";
import Weather from "./component/Manager/Manager.08/Customize/Weather";
/* import Manager from "./component/Manager/Manager.01/Manager"
import Manager2 from "./component/Manager/Manager.02/Manager2"
import Manager3 from './component/Manager/Manager.03/Manager3';
import Manager4 from './component/Manager/Manager.04/Manager4';*/
/* import Manager6 from './component/Manager/Manager.06/Manager6'; */

/*  import Manager5 from './component/Manager/Manager.05/Manager5';  */
/* import Manager7 from './component/Manager/Manager.07/Manager7'; */
import Manager8 from "./component/Manager/Manager.08/Screen/Manager8";
import Sidebar from "./component/Manager/Manager.08/Sidebar/Sidebar";

function App() {
  return (
    <>
      {/* <h1>Settings</h1> */}
      <BrowserRouter>
        <div className="manager-container">
          {/* <Manager8 /> */}
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/custom" element={<Custom />} />
              <Route path="/screen" element={<Manager8 />} />
              <Route path="/clock" element={<Clock />} />
              <Route path="/weather" element={<Weather />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      {/* <hr /> */}
    </>
  );
}

export default App;
