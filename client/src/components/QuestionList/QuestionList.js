import React, {useEffect, useState} from "react";
import "./QuestionList.css";
import QuestionItem from '../QuestionItem/QuestionItem'

function QuestionList( {questions, dailyData} ) {

  const [gameBoard, setGameBoard] = useState(<button onClick = {() => playGame()} className = 'toStart'>Press to Start</button>)

  async function playGame() {
    setGameBoard('Get ready to type!')
    await delay(3000);
    for (let i = 0; i<questions.length; i++ ) {
      setGameBoard(questions[i].question)
      await delay(20000)
   }
   setGameBoard('Game Done!')
  }


async function delay(ms) {
  return await new Promise(resolve => setTimeout(resolve, ms));
}




  return (
    <div className = 'playarea'>
      <div className = 'category'>Today's Category: <b>{dailyData.title}</b></div>
      <div className = 'question-list'>
      {questions.map(question => (
          <QuestionItem key = {question.id} question={question} />
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