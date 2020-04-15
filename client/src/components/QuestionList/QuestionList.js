import React, {useState} from "react";
import "./QuestionList.css";
import QuestionItem from '../QuestionItem/QuestionItem'

function QuestionList( {questions, dailyData, gameBoard} ) {


  return (
    <div className = 'playarea'>
      <div className = 'category'>Today's Category: <b>{dailyData.title}</b></div>
      <div className = 'question-list'>
      {questions.map(question => (
          <QuestionItem key = {question.id} question={question}/>
        ))}
      </div>
      <div className = 'question-spot'>
        <div className = 'question'>{gameBoard}</div>
      </div>
      <input className= 'answer' placeholder='Type here...'></input>
    </div>
  );
}

export default QuestionList;