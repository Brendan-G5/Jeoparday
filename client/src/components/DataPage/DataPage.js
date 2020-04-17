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
      return data.slice(-(number));
    } else {
      return data;
    }
  }

  let displayLine = () => {
    if (data.length >1) {
      return (
      <div className="data-scatter">
        <LineChart data={dataToVis()} />
      </div>
      )
    } else {
      return (<div>Play again tomorrow in order to see graph</div>)
    }

  }

  return (
    <div className="data-page">
      <div className="data-top">
        <div className="data-text">
          <div>
            <select id="game-selector" onChange = {handleNumber} value = {selector}>
              <option value="all" selected>All Games</option>
              <option value="10">Past 10 Games</option>
              <option value="50">Past 50 Games</option>
              <option value="100">Past 100 Games</option>
              <option value="200">Past 200 Games</option>
            </select>
          </div>
        </div>
        <div className="data-pie">
          <PieChart data={dataToVis()} />
        </div>
      </div>
      {displayLine()}
    </div>
  );
}

export default DataPage;
