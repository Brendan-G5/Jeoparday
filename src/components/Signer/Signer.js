import React, { useState } from 'react';
import './Signer.css';
import {auth} from '../../firebase/firebase'

function Signer({register}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  function handleUsername(event) {
    setUsername(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handlePassword2(event) {
    setPassword2(event.target.value);
  }

  function signUp(event) {
    event.preventDefault();
    console.log(email, password)
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      console.log(cred)
      //HERE WE HAVE CREATED A NEW USER
    })
  }

  function signIn(event) {
    event.preventDefault();
    console.log(email, password)
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
      console.log(cred)
      //HERE WE HAVE CREATED A NEW USER
    })
  }



  if (!register) {
    return (
      <form
        onSubmit={signUp}
        className="input-area"
      >
        <div className="label">Email</div>
        <input onChange={handleEmail} value={email}/>
        <div className="label">Password</div>
        <input onChange={handlePassword} value={password}/>
        <button type="submit">Sign-In</button>
      </form>
    );
  } else {
    return (
      <form
        onSubmit={signIn}
        className="input-area"
      >
        <div className="label">Username</div>
        <input onChange={handleUsername} value={username}/>
        <div className="label">Email</div>
        <input onChange={handleEmail} value={email}/>
        <div className="label">Password</div>
        <input onChange={handlePassword} value={password}/>
        {/* <div className="label">Confirm Password</div>
        <input onChange={handlePassword2} value={password2}/> */}
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default Signer;
