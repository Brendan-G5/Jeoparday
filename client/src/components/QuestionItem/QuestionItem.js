import React from "react";
import "./QuestionItem.css";

function QuestionItem({ question }) {

  function prettifyAnswer (answer) {
    let re = new RegExp(`<.>`);
    answer = answer.replace(re, '')
    re = new RegExp(`</.>`)
    answer = answer.replace(re, '')
    return answer
  }

  let anw = <div className="answer-spot"><div className="question-mark">?</div></div>;

  if (question.reveal === "good") {
    anw = <div className="answer-spot-good"><div className="answer-box yes">{prettifyAnswer(question.answer)}</div></div>;
  } else if (question.reveal === "bad") {
    anw = <div className="answer-spot-bad"><div className="answer-box no">{prettifyAnswer(question.answer)}</div></div>;
  }
  return <div>{anw}</div>;
}

export default QuestionItem;
