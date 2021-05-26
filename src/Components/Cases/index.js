import React from "react";

function Cases({ currentCountry, cases, deaths, recovered }) {
  return (
    <div className="gb-case-container">
      <div className="gb-case-content">
        <h2>{currentCountry ? currentCountry : "Global"}</h2>
        <div className="cases-inner-container">
          <div className="cases active-cases">
            <h1>{cases}</h1>
            <h3>Total Cases</h3>
          </div>
          <div className="cases death-cases">
            <h1>{deaths}</h1>
            <h3>Death Cases</h3>
          </div>
          <div className="cases recovered-cases">
            <h1>{recovered}</h1>
            <h3>Recovered Cases</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cases;
