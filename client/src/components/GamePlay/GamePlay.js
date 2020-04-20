import React, { useState } from "react";
import "./GamePlay.css";
import QuestionItem from "../QuestionItem/QuestionItem";
import { sendToDb } from "../../DatabaseHandler";
const JeoHost = require("../../assets/JeoHost.png");
const JeoCont = require("../../assets/JeoCont.png");

function GamePlay({ questions, dailyData, setScreenState, doneGame }) {
  const [answer, setAnswer] = useState("");
  const [counter, setCounter] = useState(0);
  const [gameType, setGameType] = useState();

  function GameBoard(gameType) {
    switch (typeof gameType) {
      case "number":
        return (
          <div className="asked-question">{questions[gameType].question}</div>
        );
      case "string":
        switch (gameType) {
          case "results":
            return (
              <div className="results-page">
                <div className="result">{dailyData.result}/5</div>
                <div className="view-data" onClick={() => viewData(dailyData)}>
                  View Data
                </div>
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
            Play
          </button>
        );
    }
  }

  function submitResponse(event) {
    event.preventDefault();
    setAnswer("");
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
      sendToDb(dailyData);
      setGameType("results");
    }
    setCounter(counter + 1);
    return true;
  }

  function checkAnswer(answer, counter) {
    if (checkAllAnswers(answer, questions[counter].answer)) {
      dailyData.result++;
      return true;
    } else {
      return false;
    }
  }

  function checkAllAnswers(userAns, compAns) {
    userAns.replace(" a ", "");
    userAns.replace(" an ", "");
    userAns.replace(" the ", "");
    userAns = userAns.toLowerCase().replace(/\s/g, "");
    compAns = " " + compAns + " ";
    compAns = compAns.toLowerCase();
    compAns.replace(" a ", "");
    compAns.replace(" an ", "");
    compAns.replace(" the ", "");
    compAns = compAns.replace(/[^\w]|_/g, "");
    if (compAns === userAns) return true;
    return false;
  }

  async function viewData(dailyData) {
    setScreenState("load");
    doneGame(dailyData);
  }

  function handleChange(event) {
    setAnswer(event.target.value);
  }

  return (
    <div className="playarea">
      <div className="category">
        Today's Category is: <b className="category-name">{dailyData.title}</b>
      </div>
      <div className="question-list">
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
      <div className="mid-level">
        <div className="cartoon">
          <img src={JeoHost} />
        </div>
        <div className="holder">
          <div className="question-spot">{GameBoard(gameType)}</div>
          <form onSubmit={submitResponse}>
            <input
              className="answer"
              placeholder="Type here..."
              value={answer}
              onChange={handleChange}
            ></input>
          </form>
        </div>
        <div className="cartoon">
          <img src={JeoCont} />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
