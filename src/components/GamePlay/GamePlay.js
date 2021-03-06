import React, { useState } from "react";
import "./GamePlay.css";
import QuestionItem from "../QuestionItem/QuestionItem";
import moment from "moment";
const JeoHost = require("../../assets/JeoHost.png");
const JeoCont = require("../../assets/JeoCont.png");

function GamePlay({ questions, dailyData, setScreenState, data }) {
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
                <button
                  className="view-data"
                  onClick={() => setScreenState("data")}
                >
                  View Data
                </button>
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
      let temp = data;
      dailyData.date = moment(dailyData.date).format("DD-MM-YYYY");
      temp.push(dailyData);
      localStorage.setItem("userJeoData", JSON.stringify(temp));
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
    userAns = prettyWord(userAns);
    compAns = prettyWord(compAns);
    userAns = userAns.replace(/\s/g, "");
    userAns = userAns.replace(/[^\w]|_/g, "");
    compAns = compAns.replace(/[^\w]|_/g, "");
    if (compAns === userAns) return true;
    return false;
  }

  let wordstoRemove = ["a", "the", "an"];

  function prettyWord(word) {
    word = word.toLowerCase();
    word = " " + word + " ";
    for (let i = 0; i < wordstoRemove.length; i++) {
      word = word.replace(" " + wordstoRemove[i] + " ", "");
    }
    return word;
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
          <img src={JeoHost} alt="JEOHOST" />
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
          <img src={JeoCont} alt="JEOCONT" />
        </div>
      </div>
    </div>
  );
}

export default GamePlay;
