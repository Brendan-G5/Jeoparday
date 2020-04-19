import React, {useState} from "react";
import "./DataPage.css";
import LineChart from "../LineChart/LineChart";
import PieChart from "../PieChart/PieChart";
import DataText from "../DataText/DataText"

function DataPage({ data }) {

  const [selector, setSelector] = useState('all')

  function changeSelector(newSel) {
    setSelector(newSel)
  }


  let datatoShow =  (selector) =>  {
    switch (typeof selector) {
      case 'number':
        return data.slice(-selector);
      default:
        return data
    }
  }

  const colors = [
    "#89d2f1", //color for 0
    "#5caed1", //color 1
    "#3e94b8", //color 2
    "#217ca3", //color 3
    "#0e5f82", //color 4
    "#104e69", //color 5
  ];


  let LineGraph = () => {
    if (data.length > 1) {
      return (
        <LineChart data={datatoShow(selector)} colors={colors} />
      )
    } else {
      return (
      <div>Come back tomorrow to see Data</div>
      )
    }
  }


  return (
    <div className="data-page">
      <div className="come-back">Come back tomorrow to play again!</div>
      <div className="data-top">
        <DataText data = {data} changeSelector = {changeSelector}/>
        <div className="data-pie">
            <div></div>
            <PieChart data={datatoShow(selector)} colors={colors} />
        </div>
      </div>
        <div className="data-scatter">
          {LineGraph()}
        </div>
    </div>
  );
}

export default DataPage;
