import React, { useState, useEffect } from "react";
import "./App.css";
import getQuestions from "./APIHandler";
import GamePlay from "./components/GamePlay/GamePlay";
import DataPage from "./components/DataPage/DataPage";

const JeoPhoto = require("./assets/Jeoparday.png");
const moment = require("moment");


function App() {
  const [questions, setQuestions] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [screenState, setScreenState] = useState("load");
  const [data, setData] = useState([]);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem("userJeoData") || "[]");
    setData(userData);
    if (userData.length && checkPlayed(userData)) {
      setScreenState("data");
      return;
    }
    getQuestions().then((quesData) => {
      if (quesData) {
        setDailyData(quesData[0]);
        setQuestions(quesData[1]);
        setScreenState("play");
      } else {
        setScreenState("error");
      }
    });
  }, []);

  function checkPlayed(newData) {
    let recent = newData[newData.length - 1].date;
    let today = moment(Date.now()).format("DD-MM-YYYY");
    if (today === recent) return true;
    return false;
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
              data={data}
            />
          </div>
        );
      case "data":
        if (data.length) {
          return (
            <div>
              <DataPage data={data} />
            </div>
          );
        } else {
          return <div>No data yet</div>;
        }
      default:
        return (
          <div className="wrong">
            Something went Wrong :( <br />  May be a jSerice issue, Try Reloading... <br> Didn't work? No Internet? </br>
          </div>
        );
    }
  }

  return (
    <div className="JEO">
      <div className="title">
        <img className="title" src={JeoPhoto} alt="JEOPARDAY" />
      </div>
      <ToShow />
    </div>
  );
}

export default App;
