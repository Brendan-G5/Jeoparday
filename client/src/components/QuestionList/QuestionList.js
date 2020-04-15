import React from "react";
import "./QuestionList.css";
import QuestionItem from '../QuestionItem/QuestionItem'

function QuestionList( {questions} ) {

  return (
    <div>
      {questions.map(question => (
          <QuestionItem question={question} />
        ))}
    </div>
  );
}

export default QuestionList;