import React, { useState } from 'react';
import './SignIn.css';
import Signer from '../Signer/Signer';
const JeoPhoto = require('../../assets/Jeoparday.png');

function SignIn() {
  const [register, setRegister] = useState(false);

  return (
    <div>
      <div className="title">
        <img className="title" src={JeoPhoto} alt="JEOPARDAY" />
      </div>
      <div className="log-box">
        <Signer register={register} />
        <div className="divider"></div>
        <div className="change-area">
          <button
            className="reg-button"
            onClick={() => {
              setRegister(false);
            }}
          >
            Sign-In
          </button>
          <button
            className="reg-button"
            onClick={() => {
              setRegister(true);
            }}
          >
            Sign-Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
