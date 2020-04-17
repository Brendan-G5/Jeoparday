import React from "react";
import "./PieChart.css";
import C3Chart from "react-c3js";
import "c3/c3.css";

function PieChart({ data }) {
  let pieData = [0, 0, 0, 0, 0, 0];

  data.forEach((item) => {
    if (typeof item.result === "number") {
      if (pieData[item.result]) {
        pieData[item.result]++;
      } else {
        pieData[item.result] = 1;
      }
    }
  });

  const pieChartData = {
    data: {
      columns: [
        ["0", pieData[0]],
        ["1", pieData[1]],
        ["2", pieData[2]],
        ["3", pieData[3]],
        ["4", pieData[4]],
        ["5", pieData[5]],
      ],
      type: "pie",
      onclick: function (d, i) {
        console.log("onclick", d, i);
      },
      onmouseover: function (d, i) {
        console.log("onmouseover", d, i);
      },
      onmouseout: function (d, i) {
        console.log("onmouseout", d, i);
      },
    },
  };

  return <C3Chart data={pieChartData.data} axis={pieChartData.axis} legend={pieChartData.legend} />;
}

export default PieChart;
