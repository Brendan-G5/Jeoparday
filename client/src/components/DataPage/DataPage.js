import React, { useState } from "react";
import "./DataPage.css";
import LineChart from "../LineChart/LineChart";
import PieChart from "../PieChart/PieChart";

function DataPage({ data, firstItem }) {
  const [selector, setSelector] = useState("all");

  const colors = [
    "#89d2f1", //color for 0
    "#5caed1", //color 1
    "#3e94b8", //color 2
    "#217ca3", //color 3
    "#0e5f82", //color 4
    "#104e69", //color 5
  ];

  function handleNumber(event) {
    console.log(event.target.value);
    setSelector(event.target.value);
  }

  const dataToVis = () => {
    let completeList = data.slice(1);
    completeList.unshift(firstItem)
    console.log(completeList, 'data in')
    if (selector !== "all") {
      let number = Number(selector);
      return completeList.slice(-number);
    } else {
      return completeList;
    }
  };

  let displayLine = () => {
    if (data.length > 1) {
      return (
        <div className="data-scatter">
          <LineChart data={dataToVis()} colors={colors} />
        </div>
      );
    } else {
      return <div>Play again tomorrow in order to see graph</div>;
    }
  };

  return (
    <div className="data-page">
      <div className="data-top">
        <div className="data-text">
          <div>
            <select id="game-selector" onChange={handleNumber} value={selector}>
              <option value="all" selected>
                All Games
              </option>
              <option value="10">Past 10 Games</option>
              <option value="50">Past 50 Games</option>
              <option value="100">Past 100 Games</option>
              <option value="200">Past 200 Games</option>
            </select>
          </div>
        </div>
        <div className="data-pie">
          <PieChart data={dataToVis()} colors={colors} />
        </div>
      </div>
      {displayLine()}
    </div>
  );
}

export default DataPage;
