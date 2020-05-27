import React from 'react';
import './App.css';
import Jeoparday from './components/Jeoparday/Jeoparday';
import SignIn from './components/SignIn/SignIn'


function App() {
  const user = false; //This will change for when firebase is set up
  return (
    user ?
    <Jeoparday/>
    :
    <SignIn/>
  )
}

export default App;
