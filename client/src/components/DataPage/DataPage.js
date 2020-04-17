import React, { setState, useState } from "react";
import "./DataPage.css";
import LineChart from "../LineChart/LineChart";
import PieChart from "../PieChart/PieChart";

function DataPage({ data }) {

  const [selector, setSelector] = useState('all')



  function handleNumber(event) {
    console.log(event.target.value)
    setSelector(event.target.value)
  }

  let dataToVis = () => {
    if (typeof selector !== 'all'){
      let number = Number(selector);
      console.log(number);
      return data.slice(-(Number(selector)))
    } else {
      return data;
    }
  }

  return (
    <div className="data-page">
      <div className="data-top">
        <div className="data-text">
          <div>
            <select id="game-selector" onChange = {handleNumber} value = {selector}>
              <option value="all" selected>All Games</option>
              <option value="5">Past 5 Games</option>
              <option value="20">Past 20 Games</option>
              <option value="50">Past 50 Games</option>
              <option value="100">Past 100 Games</option>
            </select>
          </div>
        </div>
        <div className="data-pie">
          <PieChart data={dataToVis()} />
        </div>
      </div>
      <div className="data-scatter">
        <LineChart data={dataToVis()} />
      </div>
    </div>
  );
}

export default DataPage;
