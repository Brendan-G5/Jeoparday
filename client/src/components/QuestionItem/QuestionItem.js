import React from "react";
import "./QuestionItem.css";

function QuestionItem({ question }) {
  let anw = <div className="answer-spot"><div className="question-mark">?</div></div>;

  if (question.reveal === "good") {
    anw = <div className="answer-spot-good"><div className="answer-box yes">{question.answer}</div></div>;
  } else if (question.reveal === "bad") {
    anw = <div className="answer-spot-bad"><div className="answer-box no">{question.answer}</div></div>;
  }
  return <div>{anw}</div>;
}

export default QuestionItem;
