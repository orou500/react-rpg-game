import React, { useState, useEffect }  from 'react';
import '../../App.css';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';

function Chapter1( ) {
    const [links, setLinks] = useState(['Logout']);
    const [p1, setP1] = useState(true)
    const [p2, setP2] = useState(false)
    const [p3, setP3] = useState(false)
    const [p4, setP4] = useState(false)
    const [fight, setFight] = useState(false)
    
    const user = useAuth()
    const charName = user.auth.character.name;
    const charWeapon = user.auth.character.weapon
        

  return (
    <div>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='chapter text-center'>
                <h1>Chapter 1:</h1><br />
                <h3>The beginning of {charName} story</h3><br />
            </div>
            <div className='description text-center'>
                {
                    p1 && 
                    <p>
                        After a long day of hunting to take care of his father's butcher shop.<br />
                        {charName} goes to sleep peacefully.<br /><br />
                        <button onClick={() => {setP1(false); setP2(true)}}>Next</button>
                    </p>
                }
                {
                    p2 && 
                    <p>
                        Suddenly in the early hours of the morning<br /> 
                        {charName} gets up from loud shouts heard outside his bedroom window.<br /><br />
                        <button onClick={() => {setP2(false); setP3(true)}}>Next</button>
                    </p>
                }
                {
                    p3 &&
                    <p>
                        Outside the window {charName} sees his sister being cruelly taken by a demon.<br />
                        Quickly {charName} gets dressed, takes his {charWeapon} and goes outside.<br /><br />
                        <button onClick={() => {setP3(false); setP4(true)}}>Next</button>
                    </p>
                }
                {
                    p4 &&
                    <p>
                        When {charName} goes out to fight the demon,
                        he sees two more demons shouting at him in unintelligible
                        language by this time the first demon has already had time to perform a spell and disappear into the darkness.<br /><br />
                        <button onClick={() => {setP4(false); setFight(true)}}>Fight Them</button>
                    </p>
                }
                {
                    fight &&
                    <p>Fight stage!</p>
                }
            </div>  
        </div>
    </div>
  );
}

export default Chapter1;