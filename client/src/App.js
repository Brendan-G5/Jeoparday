import React, { useState, useEffect } from "react";
import "./App.css";
import getQuestions from "./APIHandler";
import QuestionList from "./components/QuestionList/QuestionList";
import { sendToDb } from "./DatabaseHandler";

function App() {
  const [questions, setQuestions] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [gameType, setGameType] = useState();
  const [screenState, setScreenState] = useState("play");

  useEffect(() => {
    getQuestions().then((data) => {
      setDailyData(data[0]);
      setQuestions(data[1]);
      setScreenState("play");
    });
  }, []);

  function GameBoard(gameType) {
    switch (typeof gameType) {
      case "number":
        return <div>{questions[gameType].question}</div>;
      case "string":
        switch (gameType) {
          case "results":
            return (
              <div>
                <div>{dailyData.result}/5</div>
                <div onClick={() => viewData()}>Submit and View Data</div>{" "}
              </div>
            );
          case "done":
            return <div>Come Back Tomorrow</div>;
          default:
            return <div>Done for day</div>;
        }
      default:
        return (
          <button className="toStart" onClick={() => setGameType(0)}>
            Click to Play!
          </button>
        );
    }
  }

  function submitAnswer(answer, counter) {
    console.log(counter, 'here is counter')
    if (typeof gameType !== "number") {
      return false;
    }
    if (checkAnswer(answer, counter)) {
      questions[counter].reveal = "good";
    } else {
      questions[counter].reveal = "bad";
    }
    if (counter < 4) {
      setGameType(counter + 1);
    } else {
      setGameType("results");
    }
    return true;
  }

  function checkAnswer(answer, counter) {
    if (answer.toLowerCase() === "true" || answer.toLowerCase() === questions[counter].answer.toLowerCase()) {
      setDailyData({ ...dailyData, result: dailyData.result + 1 });
      return true;
    } else {
      return false;
    }
  }

  function viewData() {
    sendToDb(dailyData);
    setGameType('done')
  }

  // function Display () {
  //   if (screenState === 'load') {
  //     return (
  //       <h2>loading...</h2>
  //     )
  //   }
  //   if (screenState === "play") {
  //     return (
  //       <div className="questions">
  //         <QuestionList
  //           questions={questions}
  //           dailyData={dailyData}
  //           gameBoard={GameBoard(gameType)}
  //           submitAnswer={submitAnswer}
  //         />
  //       </div>
  //     );
  //   }
  // };

  return (
    <div className="JEO">
      <div className="title"> JEOPARDAY! </div>
      <div className="questions">
          <QuestionList
            questions={questions}
            dailyData={dailyData}
            gameBoard={GameBoard(gameType)}
            submitAnswer={submitAnswer}
          />
        </div>
    </div>
  );
}

export default App;

/*{
    "title": "e.t. 20th anniversary",
    "date": "2002-09-11T12:00:00.000Z",
    "result":0,
  });
  */

/*
{
    "id": 57729,
    "answer": "Steven Spielberg",
    "question": "He says he was lonely, shooting \"Raiders of the Lost Ark\" in Tunisia, when the concept for the movie first hit him",
    "value": 200,
    "airdate": "2002-09-11T12:00:00.000Z",
    "category_id": 7371,
    "game_id": null,
    "invalid_count": null,
  },
  {
  "id": 57735,
  "answer": "Reese\\'s Pieces",
  "question": "To lure E.T. into his house, Elliott, played by Henry Thomas, leaves a trail of these candies",
  "value": 400,
  "airdate": "2002-09-11T12:00:00.000Z",
  "category_id": 7371,
  "game_id": null,
  "invalid_count": null,
  },
  {
    "id": 57741,
    "answer": "Drew Barrymore",
    "question": "Of her role as little Gertie, she told Ent. Weekly, \"I wouldn't be where I am now if it wasn't for 'E.T.'\"",
    "value": 600,
    "airdate": "2002-09-11T12:00:00.000Z",
    "category_id": 7371,
    "game_id": null,
    "invalid_count": null,
  },
  {
    "id": 57747,
    "answer": "Walkie-talkies",
    "question": "Through computer magic, federal agents no longer brandish guns; instead they carry these rhyming devices, 10-4!",
    "value": 800,
  "airdate": "2002-09-11T12:00:00.000Z",
  "category_id": 7371,
  "game_id": null,
  "invalid_count": null,
  },
  {
  "id": 57753,
  "answer": "John Williams",
  "question": "Nominated for 9 Oscars, the movie won 4 including one for Original Score by this composer",
  "value": 1000,
  "airdate": "2002-09-11T12:00:00.000Z",
  "category_id": 7371,
  "game_id": null,
  "invalid_count": null,
  }
*/
