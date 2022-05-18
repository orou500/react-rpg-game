import React, { useEffect, useState }  from 'react';
import '../App.css';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

function About() {
    const [links, setLinks] = useState([]);
    const user = useAuth()

    useEffect(() => {
        user.auth.user || user.auth.user === ' ' ? setLinks(['Profile', 'Logout']) : setLinks(['Login'])
      }, [user])

  return (
    <div>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='about'>
                <h1>About Page</h1>
            </div>
            <div className='description'>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation</p>
            </div>  
        </div>
    </div>
  );
}

export default About;
