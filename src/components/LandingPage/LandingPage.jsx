import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <h2>{heading}</h2>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p>
          I’ve always been interested in changing some behaviors in my day to day life to improve 
          my physical, mental, and emotional health. After many attempts with varying degrees of success, 
          I’ve always found that one of the largest barriers I face is my limited bandwidth to focus 
          on all of the priorities in my daily life. As my focus eventually drifts away from the change 
          I’m attempting to make, that habit falls by the wayside. 
          </p>

          <p>
          I made “Path Track” to help address this barrier. Path Track allows users to create new 
          habits in the app, giving them a place to log their day to day progress. Users can journal 
          their thoughts and feelings, while also being able to document the obstacles and the 
          effects they are experiencing. Additionally Path Track gives users a place to reflect on 
          their motivations, as well as the things in their lives they are thankful for. The 
          importance of reflecting on these motivations and blessings is that it’s not only important 
          to maintain focus, but also to maintain a positive mindset.

          </p>

         
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
