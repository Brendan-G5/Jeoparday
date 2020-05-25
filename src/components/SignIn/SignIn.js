import React, { useState } from 'react';
import './SignIn.css';
const JeoPhoto = require('../../assets/Jeoparday.png');

function SignIn() {
  const [register, setRegister] = useState(false);

  const Signer = function () {
    if (!register) {
      return (
        <div className = 'input-area'>
            <div className="label">Email</div>
            <input />
            <div className="label">Password</div>
            <input type = 'password' />
            <button>
              Sign-In
            </button>
        </div>
      );
    } else {
      return (
        <div className = 'input-area'>
          <div className="label">Username</div>
          <input />
          <div className="label">Email</div>
          <input />
          <div className="label">Password</div>
          <input type = 'password' />
          <div className="label">Confirm Password</div>
          <input type = 'password' />
          <button>
          Register
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="title">
        <img className="title" src={JeoPhoto} alt="JEOPARDAY" />
      </div>
      <div className="log-box">
        <Signer />
        <div class="divider"></div>
        <div className = 'change-area'>
          <button className = 'reg-button' onClick = {() => setRegister(false)}>Sign-In</button>
          <button className = 'reg-button' onClick = {() => setRegister(true)}>Sign-Up</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
