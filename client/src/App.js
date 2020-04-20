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

  useEffect(() => {
    getAllData().then((userData) => {
      console.log('here is the user data', userData)
      if (userData.length) {
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
    return true;
  }

  function doneGame(dailyData) {
    setScreenState('data')
    setData([...data, dailyData])
    console.log(data)
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
              doneGame={doneGame}
            />
          </div>
        );
      case "data":
        if (data.length) {
          return (
            <div>
              <DataPage data={data}/>
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
        <img className="title" src={JeoPhoto}/>
      </div>
      <ToShow />
    </div>
  );
}

export default App;
