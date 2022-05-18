import React, { useState, useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

function Logout() {
    const [links] = useState([]);
    const { auth } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        auth.accessToken = ''
        auth.user = ''
        navigate('/Login', { replace: true })
    })
    

  return (
    <div>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='Logout'>
                <h1>Logout Page</h1>
            </div>
            <div className='description'>
                <p>You have successfully logged out!</p>
            </div>  
        </div>
    </div>
  );
}

export default Logout;