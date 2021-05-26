import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Axios from "../../Axios/axios";

// https://disease.sh/v3/covid-19/historical/nepal?lastdays=30
function GoogleCharts({ currentCountry }) {
  const [lineDataStatus, setLineDataStatus] = useState("loading");
  const [geoDataStatus, setGeoDataStatus] = useState("loading");
  const [lineChartData, setLineChartData] = useState([]);
  const [geoChartData, setGeoChartData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const requestData = await Axios.get(
        `/historical/${currentCountry ? currentCountry : "all"}?lastdays=all`
      );
      const json = requestData.data;
      if (!currentCountry) {
        const timeline = Object.keys(json.cases);
        const cases = Object.values(json.cases);
        const deaths = Object.values(json.deaths);
        const recovered = Object.values(json.recovered);
        const chartData = [["Timeline", "Cases", "Deaths", "Recovered"]];
        for (let i = 0; i < timeline.length; i++) {
          chartData.push([timeline[i], cases[i], deaths[i], recovered[i]]);
        }
        setLineDataStatus("ready");
        setLineChartData(chartData);
      } else {
        const timeline = Object.keys(json.timeline.cases);
        const cases = Object.values(json.timeline.cases);
        const deaths = Object.values(json.timeline.deaths);
        const recovered = Object.values(json.timeline.recovered);
        const chartData = [["Timeline", "Cases", "Deaths", "Recovered"]];
        for (let i = 0; i < timeline.length; i++) {
          chartData.push([timeline[i], cases[i], deaths[i], recovered[i]]);
        }
        setLineChartData(chartData);
        setLineDataStatus("ready");
      }
    }
    fetchData();
  }, [currentCountry]);
  useEffect(() => {
    async function fetchData() {
      const requestData = await Axios.get("/countries");
      const json = requestData.data;

      const countries = [];
      const cases = [];
      const deaths = [];
      const recovered = [];

      json.map((item) => {
        countries.push(item.country);
        cases.push(item.cases);
        deaths.push(item.deaths);
        recovered.push(item.recovered);
        return null;
      });
      let index1 = countries.indexOf("USA");
      if (~index1) {
        countries[index1] = "US";
      }
      let index2 = countries.indexOf("UAE");
      if (~index2) {
        countries[index2] = "AE";
      }
      let index3 = countries.indexOf("Libyan Arab Jamahiriya");
      if (~index3) {
        countries[index3] = "Libya";
      }
      let index4 = countries.indexOf("DRC");
      if (~index4) {
        countries[index4] = "CD";
      }
      let index5 = countries.indexOf("Côte d'Ivoire");
      if (~index5) {
        countries[index5] = "CI";
      }
      let index6 = countries.indexOf("South Sudan");
      if (~index6) {
        countries[index6] = "SS";
      }
      let index7 = countries.indexOf("Congo");
      if (~index7) {
        countries[index7] = "CG";
      }

      const chartData = [["Countries", "cases"]];
      for (let i = 0; i < countries.length; i++) {
        chartData.push([countries[i], cases[i]]);
      }

      setGeoChartData(chartData);
      setGeoDataStatus("ready");
    }
    fetchData();
  }, []);
  return (
    <div>
      <div className="charts-container">
        <div className="charts-content">
          <h2>Line Chart</h2>
          <div className="line-chart">
            {lineDataStatus === "ready" && (
              <Chart
                height={400}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data={lineChartData}
                options={{
                  hAxis: {
                    title: "Date",
                  },
                  vAxis: {
                    title: "No. of cases, deaths & recovered",
                  },
                  series: {
                    0: { curveType: "function" },
                  },
                }}
                rootProps={{ "data-testid": "1" }}
              />
            )}
          </div>
        </div>
      </div>
      <div className="charts-container">
        <div className="charts-content">
          <h2>Geo Chart</h2>
          <div className="geo-chart">
            {geoDataStatus === "ready" && (
              <Chart
                chartType="GeoChart"
                loader={<div>Loading Chart</div>}
                data={geoChartData}
                options={{
                  colorAxis: { colors: ["blue"] },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoogleCharts;
