import React from "react";
import CoronaSVG from "../../images/coronavirus.svg";

function Heading() {
  return (
    <div className="heading-container">
      <div className="heading-content">
        <h1>C</h1>
        <img className="corona-logo" src={CoronaSVG} alt="" />
        <h1>VID-19 TRACKER</h1>
      </div>
    </div>
  );
}

export default Heading;
