import React from "react";
import "./QuestionItem.css";

function QuestionItem( {question} ) {


  let anw = (<div className = 'single-question'></div>)

  if (question.reveal === 'good') {
    anw = <div className = 'anwser yes'>{question.answer}</div>;
  } else if (question.reveal === 'bad') {
    anw = <div className = 'anwser no'>{question.answer}</div>;
  }

  return (
    <div>
      {anw}
    </div>
  );
}

export default QuestionItem;