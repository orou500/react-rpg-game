import React, { useState, useEffect }  from 'react';
import '../../App.css';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import Battle1 from '../battles/battle1';

function Chapter1() {
    const [links, setLinks] = useState(['Logout']);
    const [p1, setP1] = useState(true)
    const [p2, setP2] = useState(false)
    const [p3, setP3] = useState(false)
    const [p4, setP4] = useState(false)
    const [p5, setP5] = useState(true)
    const [p6, setP6] = useState(false)
    const [fight, setFight] = useState(false)
    const [isAvailable, setIsAvailable] = useState(false)

    const user = useAuth()
    const charName = user.auth.character.name;
    const charWeapon = user.auth.character.weapon

    const handleIsAvilable = () => {
        isAvailable ? setIsAvailable(false) : setIsAvailable(true);
        setIsAvailable(false) 
    }

    useEffect(() => {
        setTimeout(function(){
            setIsAvailable(true)
        }, 3000);
    }, [p1,p2,p3,p4])

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
                        {
                            isAvailable ? (<button onClick={() => {setP1(false); setP2(true);handleIsAvilable()}}>Next</button>) : (<></>)
                        }
                    </p>
                }
                {
                    p2 && 
                    <p>
                        Suddenly in the early hours of the morning<br /> 
                        {charName} gets up from loud shouts heard outside his bedroom window.<br /><br />
                        {
                            isAvailable ? (<button onClick={() => {setP2(false); setP3(true);handleIsAvilable()}}>Next</button>) : (<></>)
                        }
                    </p>
                }
                {
                    p3 &&
                    <p>
                        Outside the window {charName} sees his sister being cruelly taken by a demon.<br />
                        Quickly {charName} gets dressed, takes his {charWeapon} and goes outside.<br /><br />
                        {
                            isAvailable ? (<button onClick={() => {setP3(false); setP4(true);handleIsAvilable()}}>Next</button>) : (<></>)
                        }
                    </p>
                }
                {
                    p4 &&
                    <p>
                        When {charName} goes out to fight the demon,
                        he sees skeleton shouting at him in unintelligible
                        language by this time the demon has already had time to perform a spell and disappear into the darkness.<br /><br />
                        {
                            isAvailable ? (<button onClick={() => {setP4(false); setFight(true);handleIsAvilable()}}>Fight!</button>) : (<></>)
                        }
                    </p>
                }
                {
                    fight &&
                    <Battle1 character={user.auth.character} setFight={setFight} setP5={setP5}/>
                }
                {
                    !p4 && !fight && !p5 &&
                    <p>
                    When {charName} goes out to fight the demon,p5
                    he sees skeleton shouting at him in unintelligible p5
                    language by this time the demon has already had time to perform a spell and disappear into the darkness.<br /><br />
                    {
                        isAvailable ? (<button onClick={() => {setP5(true); setP6(false);handleIsAvilable()}}>Next</button>) : (<></>)
                    }
                </p>
                }
            </div>  
        </div>
    </div>
  );
}

export default Chapter1;