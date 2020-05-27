import React, { useState } from 'react';
import './Signer.css';

function Signer({register}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');



  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handlePassword2(event) {
    setPassword2(event.target.value);
  }

  function handleUsername(event) {
    setUsername(event.target.value);
  }


  if (!register) {
    return (
      <form
        onSubmit={() => console.log('submited')}
        className="input-area signin-form"
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
        onSubmit={() => console.log('submited')}
        className="input-area signup-form"
      >
        <div className="label">Username</div>
        <input onChange={handleUsername} value={username}/>
        <div className="label">Email</div>
        <input onChange={handleEmail} value={email}/>
        <div className="label">Password</div>
        <input onChange={handlePassword} value={password}/>
        <div className="label">Confirm Password</div>
        <input onChange={handlePassword2} value={password2}/>
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default Signer;
