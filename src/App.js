import React from 'react';
import './App.css';
import Jeoparday from './components/Jeoparday/Jeoparday';
import SignIn from './components/SignIn/SignIn'


function App() {
  const user = null;
  return (
    user ?
    <Jeoparday/>
    :
    <SignIn/>
  )
}

export default App;
