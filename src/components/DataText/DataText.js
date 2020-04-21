import React from "react";
import "./DataText.css";
import "c3/c3.css";

const moment = require("moment");

function DataText({ data, changeSelector }) {
  let perfectGames = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  let gamesPlayed = 0;
  let dateList = [];
  collectValues();

  function collectValues() {
    data.forEach((data) => {
      if (data.result === 5) {
        perfectGames++;
      }
      gamesPlayed++;
      dateList.push(data.date);
    });
    dateList.reverse();
    checkCurrentStreak(dateList);
    checkLongestStreak(dateList);
  }

  function checkCurrentStreak(dateList) {
    let current = moment().format("DD-MM-YYYY");
    if (moment(dateList[0]).format("DD-MM-YYYY") === current) {
      currentStreak++;
      for (let i = 1; i < dateList.length; i++) {
        if (
          dateList[i] ===
          moment(current, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY")
        ) {
          current = moment(current, "DD-MM-YYYY")
            .subtract(1, "days")
            .format("DD-MM-YYYY");
          currentStreak++;
        } else {
          return;
        }
      }
    }
  }

  function checkLongestStreak(dateList) {
    let currentNum = 1;
    let current = moment().format("DD-MM-YYYY");
    bestStreak++;
    for (let i = 1; i < dateList.length; i++) {
      if (
        dateList[i] ===
        moment(current, "DD-MM-YYYY").subtract(1, "days").format("DD-MM-YYYY")
      ) {
        currentNum++;
        if (currentNum > bestStreak) {
          bestStreak = currentNum;
        }
      } else {
        currentNum = 1;
      }
      current = moment(dateList[i], "DD-MM-YYYY").format("DD-MM-YYYY");
    }
  }

  return (
    <div className="data-text">
      <div className="data-view-top">
        <div className="data-view-top-left">
          <div className="text-current">
            Games Played: <span className="import-num">{gamesPlayed}</span>
          </div>
          <div className="text-best">
            Longest Streak: <span className="import-num">{bestStreak}</span>
          </div>
          <div className="text-perfect">
            Perfect Games: <span className="import-num">{perfectGames}</span>{" "}
          </div>
        </div>
        <div className="data-view-top-right">
          <div className="current-holder">
            <div className="cur-name">Current Streak</div>
            <div className="cur-num">{currentStreak}</div>
          </div>
        </div>
      </div>
      <div className="text-view">
        <div className="view-text">View Data</div>
        <div className="view-1">
          <button className="view-button" onClick={() => changeSelector("all")}>
            All Time
          </button>
        </div>
        <div className="view-2">
          <button className="view-button" onClick={() => changeSelector(10)}>
            Past 10 Games
          </button>
          <button className="view-button" onClick={() => changeSelector(50)}>
            Past 50 Games
          </button>
        </div>
        <div className="view-3">
          <button className="view-button" onClick={() => changeSelector(100)}>
            Past 100 Games
          </button>
          <button className="view-button" onClick={() => changeSelector(200)}>
            Past 200 Games
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataText;
