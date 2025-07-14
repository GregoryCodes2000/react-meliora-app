import React, { useState } from "react";
import "./prevSettings.css";

const PrevSettings = ({ handleClear, handleReset }) => {
    return(
        <div className="prev-settings">
        <button  onClick={handleClear}>
            Clear Mirror
        </button>

        <button  onClick={handleReset}>
            Reset to Default
        </button>

        <button  style={{ color: 'white', background: '#ff8400'}}>
            Save Changes
        </button>
        </div>
    )

}

export default PrevSettings;