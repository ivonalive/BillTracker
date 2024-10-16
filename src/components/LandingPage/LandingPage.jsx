import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Footer from '../Footer/Footer';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
  <div className="landing-page-container"> 
   <div className="container">
      <div className="grid">
        <div className="grid-col grid-col_8">
      <h2>{heading}</h2>
      <div id="welcome-text">
          <p>
          BillTracker allows users to prevent late fee charges. Some of them may be car insurance, healthcare coverage, streaming services, cellular services, rent, credit card payments etc. Instead of remembering all bills due a month the user can use this application as note taking for bills. 
          </p>
          <p>
          To help relieve stress BillTracker allows users to take a look at their upcoming bills and plan their finances accordingly.
          </p>
      </div>
        </div>
        <div className="grid-col grid-col_4">
        <div id="register-form">
          <RegisterForm />
        </div>
          <center>
        <div id="login-section">
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
        </div>  
          </center>
        </div>
      </div>
      <div className="grid-col grid-col-4">
      <img src="/example-bill-calendar.png" alt="Screenshot" className="bottom-left-img" />
      </div>
    </div>
      <Footer />
  </div>
    
  );
}

export default LandingPage;
