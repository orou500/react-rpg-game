import React, { useEffect, useState }  from 'react';
import '../App.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';

function About() {
    const [links, setLinks] = useState([]);
    const user = useAuth()

    useEffect(() => {
        user.auth.user || user.auth.user === ' ' ? user.auth.character ? setLinks(['Profile', "Store", 'Logout']) : setLinks(['Logout']): setLinks(['Login'])
      }, [user])

  return (
    <div>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='about'>
                <h1>About Page</h1>
            </div>
            <div className='description'>
                <p>RPG web game by Or Moshe. <br /> start your journey with your character in my fantasy story line.<br /> buy items and fight creachers from fantasy world.</p>
            </div>
        </div>
        <Footer />
    </div>
  );
}

export default About;
