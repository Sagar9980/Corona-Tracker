import React, { useEffect, useState } from "react";
import "./App.css";
import Heading from "./Components/Heading/index";
import Cases from "./Components/Cases/index";
import GoogleCharts from "./Components/GoogleCharts/index";
import Axios from "./Axios/axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

function App() {
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState("");
  const [cases, setCases] = useState();
  const [deaths, setDeaths] = useState();
  const [recovered, setRecovered] = useState();
  useEffect(() => {
    async function fetchData() {
      const request = await Axios.get("/countries");
      const countries = request.data.map((country) => ({
        name: country.country,
      }));

      setCountries(countries);
    }

    fetchData();
  }, []);
  useEffect(() => {
    async function updateCases() {
      if (currentCountry === "") {
        const requestGlobalCases = await Axios.get("/all");
        const { cases, deaths, recovered } = requestGlobalCases.data;
        setCases(cases.toLocaleString());
        setDeaths(deaths.toLocaleString());
        setRecovered(recovered.toLocaleString());
      } else if (currentCountry) {
        const currentCountrydata = await Axios.get(
          `/countries/${currentCountry}?strict=true`
        );
        const { cases, deaths, recovered } = currentCountrydata.data;

        setCases(cases.toLocaleString());
        setDeaths(deaths.toLocaleString());
        setRecovered(recovered.toLocaleString());
      }
    }
    updateCases();
  }, [currentCountry]);
  function changeCountry(e) {
    const selectedCountry = e.target.textContent;

    setCurrentCountry(selectedCountry);
  }
  return (
    <div className="App">
      <Heading />
      <div className="search-container">
        <div className="search-content">
          <Autocomplete
            id="combo-box-demo"
            options={countries}
            getOptionLabel={(option) => option.name}
            onChange={changeCountry}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Country"
                variant="outlined"
              />
            )}
          />
        </div>
      </div>
      <Cases
        currentCountry={currentCountry}
        cases={cases}
        deaths={deaths}
        recovered={recovered}
      />
      <GoogleCharts currentCountry={currentCountry} />
    </div>
  );
}

export default App;
