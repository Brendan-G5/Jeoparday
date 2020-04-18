import React from "react";
import "./PieChart.css";
import C3Chart from "react-c3js";
import "c3/c3.css";

function PieChart({ data, colors }) {
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
      colors: {
        0: colors[0],
        1: colors[1],
        2: colors[2],
        3: colors[3],
        4: colors[4],
        5: colors[5],
      },
      order: null
    },
    legend: {
      show: true,
    },
  };

  return (
    <div className="pie-container">
      <C3Chart
        data={pieChartData.data}
        legend={pieChartData.legend}
        tooltip={pieChartData.tooltip}
      />
    </div>
  );
}

export default PieChart;
