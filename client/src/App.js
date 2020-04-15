import React, { useState, useEffect } from "react";
import "./App.css";
import getQuestions from './APIHandler'
import QuestionList from './components/QuestionList/QuestionList'

function App() {
  const [questions, setQuestions] = useState([]);


  useEffect(() => {
    getQuestions()
      .then(questions => {
        console.log(questions);
        setQuestions(questions);
    });
  }, []);


  return (
    <div className = 'JEO'>
      <div className="title"> JEOPARDAY! </div>
      <div className="questions">
        <QuestionList questions = {questions}/>
      </div>
      <div className="data">
        <div className="scatter-plot">
        Here is the Scatter-plot
        </div>
        <div className="pie-chart">
        Here is the pie chart
        </div>
      </div>
    </div>
  );
}

export default App;
