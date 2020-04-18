import React, { useState, useEffect } from "react";
import "./App.css";
import getQuestions from "./APIHandler";
import GamePlay from "./components/GamePlay/GamePlay";
import DataPage from "./components/DataPage/DataPage";
import { getAllData } from "./DatabaseHandler";

const JeoPhoto = require("./assets/Jeoparday.png");
const moment = require("moment");

function App() {
  const [questions, setQuestions] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [screenState, setScreenState] = useState("load");
  const [data, setData] = useState([]);
  const [firstItem, setFirstItem] = useState({});  //A bad fix to a problem i could not solve...

  useEffect(() => {
    getAllData().then((userData) => {
      if (userData.length) {
        setFirstItem(userData[0])
        setData(userData);
        if (checkPlayed(userData)) {
          setScreenState("data");
          return;
        }
      }
      getQuestions().then((quesData) => {
            if (quesData) {
              setDailyData(quesData[0]);
              setQuestions(quesData[1]);
              setScreenState("play");
            }
          });
  })}, []);

  function checkPlayed(newData) {
    let recent = newData[newData.length-1].date;
    let today = moment(Date.now()).format("DD-MM-YYYY");
    // if (today === recent) return true;
    return false;
  }

  function playedToday() {
    getAllData().then((userData) => {
      setData(userData);
      setScreenState("data");
    });
  }

  function ToShow() {
    switch (screenState) {
      case "load":
        return (
          <div className="center-me">
            <div className="loader"></div>
          </div>
        );
      case "play":
        return (
          <div className="questions">
            <GamePlay
              questions={questions}
              dailyData={dailyData}
              setScreenState={setScreenState}
              playedToday={playedToday}
              data = {data}
            />
          </div>
        );
      case "data":
        if (data.length) {
          return (
            <div>
              <DataPage data={data} firstItem = {firstItem}/>
            </div>
          );
        } else {
          return <div>No data yet</div>;
        }
      default:
        return <div>This is bad</div>;
    }
  }

  return (
    <div className="JEO">
      <div className="title">
        <img className="title" src={JeoPhoto} alt = "JEOPARDAY" />
      </div>
      <ToShow />
    </div>
  );
}

export default App;
