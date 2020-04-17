import React from "react";
import "./DataPage.css";
import C3Chart from "react-c3js";
import "c3/c3.css";

function DataPage({ data }) {
  let dataArrays = data.reduce(function (obj, current) {
    Object.keys(current).forEach(function (key) {
      obj[key] = obj[key] || [];
      obj[key] = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
      obj[key].push(current[key]);
    });
    console.log(obj)
    return obj;
  });

  const LineChart = ({ data }) => (
    <C3Chart
      data={data.data}
      axis={data.axis}
      legend={data.legend}
    />
  );

  const chartdata = {
    data: {
      x: "Dates",
      xFormat:'%H:%M:%S',
      columns: [
        ["Dates", ...dataArrays.date],
        ["Score", ...dataArrays.result]
      ],
    },
    axis: {
      x: {
        type: "timeseries",
        tick: {
          format: '%H:%M:%S'
        },
      },
    },
    legend: {
      show: false
    }
  };

  return (
    <div>
      <LineChart data={chartdata} />
      <div>Here is the list</div>
    </div>
  );
}

export default DataPage;
