import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from '../components/Header';
import { useAuth } from '../hooks/useAuth';


function Profile() {
  const [links, setLinks] = useState(["Store", "About", "Logout"]);
  const user = useAuth()

  useEffect(() => {
    user.auth.roles.find(role => role === '9278') ? setLinks(["Store", "About", "Logout", 'Admin']): setLinks(["Store", "About", "Logout"])
 }, [user])

  return (
    <div>
      <Header navLink={links} />
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <div className='about'>
          <h1>Profile Page:</h1>
          <div className='description'>
            <h5>Account Name: {user.auth.user}</h5>
            <p>Character Name: {user.auth.character.name}</p>
            <p>Character Class: {user.auth.character.className}</p>
            <p>Character Weapon: {user.auth.character.weapon}</p>
            <p>Character level: {user.auth.character.level}</p>
            <p>Character exp: {user.auth.character.exp}</p>
            <p>Character HP: {user.auth.character.hp}</p>
            <p>Character Strength: {user.auth.character.strength}</p>
            <p>Character Speed: {user.auth.character.speed}</p>
            <p>Character Defense: {user.auth.character.defense}</p>
            <p>Character Gold: {user.auth.character.gold} gold</p>
            <p>items:</p>
            {
              user.auth.character.items.length !== 0 ? (
                <div className='items container d-flex flex-md-row flex-wrap align-items-center justify-content-center'>
                  {
                    user.auth.character.items.map((item) => {
                      return (
                        <div className='item m-4'>
                          <h5>{item.name}</h5>
                          <p>Amount: {item.amount}</p>
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div>
                  <p>You dont have items</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
