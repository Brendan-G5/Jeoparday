import React, { useState, useEffect } from "react";
import "./App.css";
import getQuestions from "./APIHandler";
import GamePlay from "./components/GamePlay/GamePlay";
import DataPage from "./components/DataPage/DataPage";
import { getAllData } from "./DatabaseHandler";
const moment = require('moment')




function App() {
  const [questions, setQuestions] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [screenState, setScreenState] = useState("load");
  const [data, setData] = useState({});


  useEffect(() => {
    let played = () => {
      getAllData().then((data) => {
        let recent = data.pop();
        let today = moment(Date.now()).format('DD-MM-YYYY');
        console.log(recent.date)
        console.log(today)
        if (recent.date === today) return true;
        return false;
    })}

    if (!played()) {
      getQuestions().then((data) => {
        setDailyData(data[0]);
        setQuestions(data[1]);
        setScreenState("play");
      });
    } else {
      playedToday(false)
    }
  }, []);



  function playedToday(first = true) {
    if (first) {
      getAllData().then((data) => {
      setData(data)
      setScreenState('data')
    })
    } else {
      setScreenState('data')
    }
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
              playedToday = {playedToday}
            />
          </div>
        );
      case "data":
        return (
          <div>
            <DataPage data = {data}/>
          </div>
        );
      default:
        return <div>This is bad</div>;
    }
  }

  return (
    <div className="JEO">
      <div className="title"> JEOPARDAY! </div>
      <ToShow />
    </div>
  );
}

export default App;
