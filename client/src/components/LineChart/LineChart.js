import React from "react";
import "./LineChart.css";
import C3Chart from "react-c3js";
import "c3/c3.css";

function LineChart({ data }) {
  let dataArrays = data.reduce(function (obj, current) {
    Object.keys(current).forEach(function (key) {
      obj[key] = obj[key] || [];
      obj[key] = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
      obj[key].push(current[key]);
    });
    return obj;
  });

  const lineChartData = {
    data: {
      x: "Dates",
      xFormat: "%d-%m-%Y",
      columns: [
        ["Dates", ...dataArrays.date],
        ["Score", ...dataArrays.result],
      ],
      type: "scatter",
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          format: "%d-%m-%Y",
        },
      },
    },
    legend: {
      show: false,
    },
  };

  return <C3Chart data={lineChartData.data} axis={lineChartData.axis} legend={lineChartData.legend} />;
}

export default LineChart;
