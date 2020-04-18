import React, { useState } from "react";
import "./DataPage.css";
import LineChart from "../LineChart/LineChart";
import PieChart from "../PieChart/PieChart";

function DataPage({ data }) {

  const colors = [
    "#89d2f1", //color for 0
    "#5caed1", //color 1
    "#3e94b8", //color 2
    "#217ca3", //color 3
    "#0e5f82", //color 4
    "#104e69", //color 5
  ];

  return (
    <div className="data-page">
      <div className="data-top">
        <div className="data-text">
          <div>
          Here maybe goes the changer
          </div>
        </div>
        <div className="data-pie">
            <div className="data-scatter">
              <PieChart data={data} colors={colors} />
            </div>
        </div>
      </div>
        <div className="data-scatter">
          <LineChart data={data} colors={colors} />
        </div>
    </div>
  );
}

export default DataPage;
