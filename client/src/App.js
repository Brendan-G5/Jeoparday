import React, { useState, useEffect } from "react";
import "./App.css";
import getQuestions from "./APIHandler";
import GamePlay from "./components/GamePlay/GamePlay";

function App() {
  const [questions, setQuestions] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [screenState, setScreenState] = useState("load");

  useEffect(() => {
    getQuestions().then((data) => {
      setDailyData(data[0]);
      setQuestions(data[1]);
      setScreenState("play");
    });
  }, []);

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
            />
          </div>
        );
      case "data":
        return <div>Look at all this data</div>;
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
