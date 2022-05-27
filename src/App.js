import React, { useState, useEffect }  from 'react';
import './App.css';
import Chapters from './components/Chapters';
import CreateCharacter from './components/CreateCharacter';
import Footer from './components/Footer';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth';

function App() {
  const [links, setLinks] = useState([]);
  const user = useAuth()
  const userName = useAuth().auth.user;
  const roles = useAuth().auth.roles
  const character = useAuth().auth.character

  useEffect(() => {
    character ? setLinks(["Profile", "Store", "About", "Logout"]) : setLinks(["About", "Logout"])
 }, [character])

  return (
    <div>
        <Header navLink={links} />
          { 
            character ? (
              <div className="container d-flex flex-column align-items-center justify-content-center">
                <div className='home'>
                      <h1>Home Page</h1>
                  </div>
                  <div className='description'>
                      <p>Hi, {userName}. Welcome to the Game app</p>
                  </div>
                  <Chapters user={user} />
              </div>
            ) : (
              <div className="container d-flex flex-column align-items-center justify-content-center">
                <CreateCharacter />
              </div>
            )
          }
        <Footer />
    </div>
  );
}

export default App;
