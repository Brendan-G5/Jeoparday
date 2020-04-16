import React, {useState} from "react";
import "./QuestionList.css";
import QuestionItem from '../QuestionItem/QuestionItem'

function QuestionList( {questions, dailyData, gameBoard, submitAnswer} ) {

  const [answer, setAnswer] = useState('');
  const [counter, setCounter] = useState(0);


  function submitResponse(event) {
    event.preventDefault();
    let playing = submitAnswer(answer, counter)
    if (playing) {
    setCounter(counter + 1);
    }
    setAnswer('');
  }

  function handleChange (event) {
    setAnswer(event.target.value);
  }

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
      <form onSubmit = {submitResponse}>
        <input className= 'answer' placeholder='Type here...' value = {answer} onChange = {handleChange}></input>
      </form>
    </div>
  );
}

export default QuestionList;