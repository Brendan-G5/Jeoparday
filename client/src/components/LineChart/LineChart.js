import React from "react";
import "./LineChart.css";
import C3Chart from "react-c3js";
import "c3/c3.css";

function LineChart({ data, colors }) {
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
        ["Category", ...dataArrays.result],
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
        }
    }
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          format: "%d-%m-%Y",
          culling: true
        },
      },
      y: {
        tick: {
          values: [0,1,2,3,4,5]
        }
      }
    },
    legend: {
      show: false,
    },
    tooltip: {
      format: {
        value: function (index) {
          return dataArrays.title[index];
      }
      }
    }
  };

  return <C3Chart data={lineChartData.data} axis={lineChartData.axis} legend={lineChartData.legend} tooltip = {lineChartData.tooltip}/>;
}

export default LineChart;
