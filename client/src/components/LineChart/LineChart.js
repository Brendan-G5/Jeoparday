import React from "react";
import "./LineChart.css";
import C3Chart from "react-c3js";
import "c3/c3.css";

function LineChart({ data, colors }) {

  let dataDates = []
  let dataResults = []
  let dataTitles = []

  data.forEach((key) => {
    dataDates.push(key.date)
    dataResults.push(key.result)
    dataTitles.push(key.title)
  });



  const lineChartData = {
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
            return "#000000";
        }
      },
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          format: "%d-%m-%Y",
          culling: true,
          fit: true,
          outer: false
        },
      },
      y: {
        tick: {
          values: [0, 1, 2, 3, 4, 5],
          outer: false
        },
        min: 0,
        max: 5
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      format: {
        value: function (value, ratio, id, index) {
          console.log(typeof dataTitles[index])
          return dataTitles[index];
        },
      },
    },
    point: {
      r: 4
    }
  };

  return (
    <C3Chart
      data={lineChartData.data}
      axis={lineChartData.axis}
      legend={lineChartData.legend}
      tooltip={lineChartData.tooltip}
      point= {lineChartData.point}
    />
  );
}

export default LineChart;
