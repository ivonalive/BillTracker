import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
// import '../App/App.css';
import './LoginPage.css';
import Footer from '../Footer/Footer';

function LoginPage() {
  const history = useHistory();

  return (
    <div className="login-page-container">
    <div className="login-page">
       <center>
      <LoginForm />
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
      </div>
      <Footer />
    </div>
  );
}

export default LoginPage;
