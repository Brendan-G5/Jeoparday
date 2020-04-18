import React from "react";
import "./QuestionItem.css";

function QuestionItem({ question }) {
  let anw = <div className="single-question">?</div>;

  if (question.reveal === "good") {
    anw = <div className="answer-box yes">{question.answer}</div>;
  } else if (question.reveal === "bad") {
    anw = <div className="answer-box no">{question.answer}</div>;
  }
  return <div className="answer-spot">{anw}</div>;
}

export default QuestionItem;
