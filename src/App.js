import React, { useState }  from 'react';
import { Link } from "react-router-dom";
import './App.css';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth';


function App() {
  const [links, setLinks] = useState(["About", "Logout"]);
  const userName = useAuth().auth.user;
  const roles = useAuth().auth.roles

  return (
    <div className='container-fluid'>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='home'>
                <h1>Home Page</h1>
            </div>
            <div className='description'>
                <p>Hi, {userName}. Welcome to the Test app</p>
            </div>
            {roles.find(role => role === '9278') ? (<Link to="/Admin">Admin</Link>) : <></>}
        </div>
    </div>
  );
}

export default App;
