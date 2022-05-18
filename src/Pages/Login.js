import React, { useState } from 'react';
import '../App.css';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

function Login() {

  const [links, setLinks] = useState(["About"]);

  return (
    <div>
      <Header navLink={links} />
      <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='home'>
                <h1>Login Page</h1>
            </div>
            <div className='description text-center'>
                <LoginForm/>
            </div>  
        </div>
    </div>
  );
}

export default Login;
