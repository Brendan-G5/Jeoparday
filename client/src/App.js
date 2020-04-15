import React, { useState, useEffect } from "react";
import "./App.css";
import getQuestions from './APIHandler'
import QuestionList from './components/QuestionList/QuestionList'

function App() {
  const [questions, setQuestions] = useState([]);
  const [dailyData, setDailyData] = useState({});
  const [gameBoard, setGameBoard] = useState('')

  useEffect(() => {
    getQuestions()
    .then(data => {
      setDailyData(data[0]);
      setQuestions(data[1]);
      setGameBoard(<button className = 'toStart' onClick = {() => playGame(data[1])}>Click to Play!</button>)
    });
  }, []);


  async function playGame (input) {
    setGameBoard('Get ready to type!')
    console.log(input)
    await delay(3000);
    for (let i = 0; i<input.length; i++) {
      setGameBoard(input[i].question)
      await delay(10000)
   }
   setGameBoard('Done Game!')
  }

  async function delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }




  return (
    <div className = 'JEO'>
      <div className="title"> JEOPARDAY! </div>
      <div className="questions">
        <QuestionList questions = {questions} dailyData = {dailyData} gameBoard = {gameBoard} playGame = {playGame}/>
      </div>
      {/* <div className="data">
        <div className="scatter-plot">
        Here is the Scatter-plot
        </div>
        <div className="pie-chart">
        Here is the pie chart
        </div>
      </div> */}
    </div>
  );
}

export default App;



  /*{
    "title": "e.t. 20th anniversary",
    "date": "2002-09-11T12:00:00.000Z",
    "result":0,
  });
  */

/*
{
    "id": 57729,
    "answer": "Steven Spielberg",
    "question": "He says he was lonely, shooting \"Raiders of the Lost Ark\" in Tunisia, when the concept for the movie first hit him",
    "value": 200,
    "airdate": "2002-09-11T12:00:00.000Z",
    "category_id": 7371,
    "game_id": null,
    "invalid_count": null,
  },
  {
  "id": 57735,
  "answer": "Reese\\'s Pieces",
  "question": "To lure E.T. into his house, Elliott, played by Henry Thomas, leaves a trail of these candies",
  "value": 400,
  "airdate": "2002-09-11T12:00:00.000Z",
  "category_id": 7371,
  "game_id": null,
  "invalid_count": null,
  },
  {
    "id": 57741,
    "answer": "Drew Barrymore",
    "question": "Of her role as little Gertie, she told Ent. Weekly, \"I wouldn't be where I am now if it wasn't for 'E.T.'\"",
    "value": 600,
    "airdate": "2002-09-11T12:00:00.000Z",
    "category_id": 7371,
    "game_id": null,
    "invalid_count": null,
  },
  {
    "id": 57747,
    "answer": "Walkie-talkies",
    "question": "Through computer magic, federal agents no longer brandish guns; instead they carry these rhyming devices, 10-4!",
    "value": 800,
  "airdate": "2002-09-11T12:00:00.000Z",
  "category_id": 7371,
  "game_id": null,
  "invalid_count": null,
  },
  {
  "id": 57753,
  "answer": "John Williams",
  "question": "Nominated for 9 Oscars, the movie won 4 including one for Original Score by this composer",
  "value": 1000,
  "airdate": "2002-09-11T12:00:00.000Z",
  "category_id": 7371,
  "game_id": null,
  "invalid_count": null,
  }
*/