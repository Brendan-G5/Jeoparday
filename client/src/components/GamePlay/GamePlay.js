import React, { useState } from "react";
import "./GamePlay.css";
import QuestionItem from "../QuestionItem/QuestionItem";
import { sendToDb } from "../../DatabaseHandler";


function GamePlay({ questions, dailyData, setScreenState, doneGame}) {
  const [answer, setAnswer] = useState("");
  const [counter, setCounter] = useState(0);
  const [gameType, setGameType] = useState();

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
                <div onClick={() => viewData(dailyData)}>View Data</div>
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
    if (
      answer.toLowerCase() === "true" ||
      answer.toLowerCase() === questions[counter].answer.toLowerCase()
    ) {
      dailyData.result++;
      return true;
    } else {
      return false;
    }
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
        Today's Category: <b>{dailyData.title}</b>
      </div>
      <div className="question-list">
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} />
        ))}
      </div>
      <div className="question-spot">
        <div className="question">{GameBoard(gameType)}</div>
      </div>
      <form onSubmit={submitResponse}>
        <input
          className="answer"
          placeholder="Type here..."
          value={answer}
          onChange={handleChange}
        ></input>
      </form>
    </div>
  );
}

export default GamePlay;
