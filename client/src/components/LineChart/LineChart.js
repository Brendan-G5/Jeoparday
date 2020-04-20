import React, { useState, useEffect } from "react";
import "./LineChart.css";
import C3Chart from "react-c3js";
import "c3/c3.css";
const c3 = require("c3");
const moment = require("moment")

function LineChart({ data, colors }) {
  const newdata = data;

  let dataDates = [];
  let dataResults = [];
  let dataTitles = [];

  data.forEach((key) => {
    dataDates.push(key.date);
    dataResults.push(key.result);
    dataTitles.push(key.title);
  });

  useEffect(() => {
    renderChart();
  });

  function renderChart() {
    let chart = c3.generate({
      bindto: ".chart",
      data: {
        x: "Dates",
        //%H:%M:%S
        xFormat: "%d-%m-%Y",
        columns: [
          ["Dates", ...dataDates],
          ["Category", ...dataResults],
        ],
        type: "scatter",
        color: function (color, d) {
          switch (d.value) {
            case 0:
              return colors[0];
            case 1:
              return colors[1];
            case 2:
              return colors[2];
            case 3:
              return colors[3];
            case 4:
              return colors[4];
            case 5:
              return colors[5];
            default:
              return colors[5];
          }
        },
      },
      axis: {
        x: {
          type: "timeseries",
          tick: {
            format: "%d-%m-%Y",
            rotate: 75,
            culling: true,
            fit: true,
            outer: false,
          },
        },
        y: {
          tick: {
            values: [0, 1, 2, 3, 4, 5],
            outer: false,
          },
          min: 0,
          max: 5,
        },
      },
      legend: {
        show: true,
      },
      tooltip: {
        format: {
          value: function (value, ratio, id, index) {
            if (id !== "Regression") return dataTitles[index];
            return;
          },
        },
      },
      point: {
        r: function(d) {
          if (d.id === "Regression") return false;
          return 3.5;
        },
      },
      grid: {
        y: {
          lines: [{ value: 1 }, { value: 3 }, { value: 5 }],
        },
      },
    });

    let bestData = CreateBestFit(chart.data());

    chart.load({
      columns: [["Regression"].concat(bestData)],
      type: "line",
      point: {
        show: true,
      },
    });
  }


  function CreateBestFit(chartData) {
    const x_vals = [];
    const y_vals = [];
    let startingDate = Date.parse(chartData[0].values[0].x)
    chartData[0].values.map((val)=> {
      const date = Date.parse(val.x) - startingDate
      x_vals.push(date);
      y_vals.push(val.value)
    })
    const x_sum = x_vals.reduce((a,b) => a+b, 0)
    const y_sum = y_vals.reduce((a,b) => a+b, 0)
    const x_mean = x_sum/x_vals.length;
    const y_mean = y_sum/y_vals.length;
    const xy_vals = [];
    const xx_vals = [];
    for (let i=0; i< x_vals.length; i++) {
      xy_vals.push(x_vals[i]*y_vals[i]);
      xx_vals.push(Math.pow(x_vals[i],2));
    }
    const xy_sum = xy_vals.reduce((a,b) => a+b, 0)
    const xx_sum = xx_vals.reduce((a,b) => a+b, 0)
    const xy_mean = xy_sum/xy_vals.length;
    const xx_mean = xx_sum/xx_vals.length;
    const m = (((x_mean*y_mean) - xy_mean) / ((x_mean*y_mean) - xx_mean));
    const b = y_mean - m*x_mean;
    const bestFitData = [];
    for (let i =0; i<x_vals.length; i++) {
      bestFitData.push(b + m*x_vals[i])
    }
    console.log(bestFitData)
    return bestFitData;
  }

  return (
    <div>
      <div className="chart">?</div>
    </div>
  );
}

export default LineChart;
