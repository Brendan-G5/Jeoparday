import React from "react";
import "./DataText.css";
import "c3/c3.css";

function DataText({ data, changeSelector }) {

  let perfectGames = 0;
  let currentStreak = 0;
  let bestStreak = 0;

  data.forEach( (data) => {
    if (data.result === 5) {
      perfectGames++
    }
    // checkCurrentStreak()
  })

  // checkCurrentStreak () {


  // }






  return (
    <div className="data-text">
      <div className="text-current">Current Streak: <span className = "import-num">{currentStreak}</span></div>
      <div className="text-best">Best Streak: <span className = "import-num">{bestStreak}</span></div>
      <div className="text-perfect">Number of Perfect Games: <span className = "import-num">{perfectGames}</span> </div>
      <div className="text-view">
        <div className = "view-text">View Data</div>
        <div className = "view-1">
          <button className = "view-button" onClick = {() => changeSelector('all')}>All Time</button>
        </div>
        <div className = "view-2">
          <button className = "view-button" onClick = {() => changeSelector(10)}>Past 10 Games</button>
          <button className = "view-button" onClick = {() => changeSelector(50)}>Past 50 Games</button>
        </div>
        <div className = "view-3">
          <button className = "view-button" onClick = {() => changeSelector(100)}>Past 100 Games</button>
          <button className = "view-button" onClick = {() => changeSelector(200)}>Past 200 Games</button>
        </div>
      </div>
    </div>
  );
}

export default DataText;
