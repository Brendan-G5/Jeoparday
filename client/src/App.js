import React, { useState, useEffect } from "react";
import "./App.css";
import getQuestions from "./APIHandler";
import GamePlay from "./components/GamePlay/GamePlay";
import DataPage from "./components/DataPage/DataPage";
import { getAllData } from "./DatabaseHandler";

const JeoPhoto = require('./assets/Jeoparday.png')
const moment = require('moment');

function App() {
  const [questions, setQuestions] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [screenState, setScreenState] = useState("load");
  const [data, setData] = useState({});

  useEffect(() => {
    getQuestions().then((newData) => {
      setDailyData(newData[0]);
      setQuestions(newData[1]);
      getAllData().then((newData) => {
        setData(newData);
        if (checkPlayed(newData)) {
          setScreenState("data");
        } else {
          setScreenState("play")
        }
    });
    });

  }, []);

  function checkPlayed(newData) {
    let recent = (newData.pop()).date
    let today = moment(Date.now()).format('DD-MM-YYYY')
    if (today === recent) return true;
    return false;
  }

  function playedToday() {
    getAllData().then((data) => {
      setData(data);
      setScreenState("data");
    });
  }

  function ToShow() {
    switch (screenState) {
      case "load":
        return <div>Loading</div>;
      case "play":
        return (
          <div className="questions">
            <GamePlay
              questions={questions}
              dailyData={dailyData}
              setScreenState={setScreenState}
              playedToday={playedToday}
            />
          </div>
        );
      case "data":
        console.log(data)
        if (data.length) {
          return (
            <div>
              <DataPage data={data} />
            </div>
          );
          }
        else {
          return (
            <div>No data yet</div>
          )
        }
      default:
        return <div>This is bad</div>;
    }
  }

  return (
    <div className="JEO">
      <div className="title">
         <img className = "title" src = {JeoPhoto}/>
         </div>
      <ToShow />
    </div>
  );
}

export default App;
