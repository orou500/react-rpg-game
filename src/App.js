import React, { useState }  from 'react';
import './App.css';
import CreateCharacter from './components/CreateCharacter';
import Header from './components/Header';
import { useAuth } from './hooks/useAuth';


function App() {
  const [links, setLinks] = useState(["Profile", "About", "Logout"]);
  const user = useAuth()
  const userName = useAuth().auth.user;
  const roles = useAuth().auth.roles
  const character = useAuth().auth.character

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
                      <p>Hi, {userName}. Welcome to the Test app</p>
                  </div>
              </div>
            ) : (
              <div className="container d-flex flex-column align-items-center justify-content-center">
                <CreateCharacter />
              </div>
            )
          }
    </div>
  );
}

export default App;
