import React, { useState, useEffect }  from 'react';
import '../../App.css';
import ShowMassage from './components/ShowMassage';
import ShowStats from './components/ShowStats';
import UserAction from './components/UserAction';


function Battle1(props) {

  const character = props.character

  const Skeleton = {
      className: 'Skeleton',
      defense: 3,
      hp: 7,
      level: 1,
      name: 'KillmoreJR',
      speed: 2,
      strength: 4,
      weapon: "Bone Sword",
  }

  const [turn, setTurn] = useState(0);
  const [nameTurn, setNameTurn] = useState('Opponent');
  const [showMassage, setShowMassage] = useState(false)
  const [action, setAction] = useState('');

  const [opponentcurrentHp, setOpponentCurrentHp] = useState(Skeleton.hp);
  const [usercurrentHp, setUserCurrentHp] = useState(character.hp);
  const [currentHealingPotion, setCurrentHealingPotion] = useState(0);

  const [battelEnd, setBattelEnd] = useState(false);
  const [winner, setWinner] = useState({});

  useEffect(() => {
    if(opponentcurrentHp <= 0){
        setOpponentCurrentHp(0)
        setNameTurn(character.name)
        setAction('win')
        setShowMassage(true)
        setWinner(character)
        setBattelEnd(true)
    }else if(usercurrentHp <= 0){
        setUserCurrentHp(0)
        setNameTurn(Skeleton.name)
        setAction('win')
        setShowMassage(true)
        setWinner(Skeleton)
        setBattelEnd(true)
    }
 })

 useEffect(() => {
    const healingPotion = character.items.find(item => item.name === 'Healing Potion');
    if(turn === 0){
        setCurrentHealingPotion(healingPotion.amount)
    }
    },[currentHealingPotion] )

  useEffect(() => {

    if(usercurrentHp > character.hp){
        console.log(usercurrentHp)
        usercurrentHp = character.hp
        console.log(character.hp)
    }

    if(turn !== 0){
        if(opponentcurrentHp > 0){
            if(usercurrentHp > 0){
                if(turn % 2 !== 0){
                    AIAction()
                }
            }
        }
    }
},[opponentcurrentHp, usercurrentHp] )

const handleAction = (value) => {
    setNameTurn(character.name)
    setAction(value)
    setTurn(turn + 1)
    setShowMassage(true)
    
    if(value === 'Attack'){
        const damage = Math.floor((Math.random() * character.strength + 1) * (100/(100+Skeleton.defense)))
        setOpponentCurrentHp(opponentcurrentHp - damage)
    } else if ( value === 'Heal') {
        const healingPotion = character.items.find(item => item.name === 'Healing Potion');
        setCurrentHealingPotion(currentHealingPotion - 1)
        const Heal = Math.floor((Math.random() * Skeleton.defense + 1) * (100/(100+character.hp)))
        let newUsercurrentHp = usercurrentHp + Heal
        if(newUsercurrentHp > character.hp){
            newUsercurrentHp = character.hp
        }
        setUserCurrentHp(newUsercurrentHp)
    }
    setTimeout(function(){
        setShowMassage(false)

    }, 3000)
}

const AIAction = () => {
    setTimeout(function(){
        setNameTurn(Skeleton.name)

        if(opponentcurrentHp === Skeleton.hp){
            setAction('Attack')
            const damage = Math.floor((Math.random() * Skeleton.strength + 1) * (100/(100+character.defense)))
            setUserCurrentHp(usercurrentHp - damage)
            setShowMassage(true)
            setTurn(turn + 1)
            setTimeout(function(){
                setShowMassage(false)
        
            }, 3000)
            
        } else {
            const opponentChose = Math.floor(Math.random() * 2)
            setAction('Attack')
            const damage = Math.floor((Math.random() * Skeleton.strength + 1) * (100/(100+character.defense)))
            setUserCurrentHp(usercurrentHp - damage)
            setShowMassage(true)
            setTurn(turn + 1)
            setTimeout(function(){
                setShowMassage(false)
        
            }, 3000)
                        
        }
    }, 3000);
}

  return (
    <div className='d-flex flex-column gap-3 p-5'>
        {
            battelEnd ? winner.name === character.name ? (
                    <div>
                        <p>{winner.name} win the battle!</p>
                        <button onClick={() => {props.setFight(false); props.setP5(false)}}>Continue</button>
                    </div>
                ) : (
                    <div>
                        <p>{winner.name} win the battle!</p>
                    </div>
                )
            : (
                <div className='d-flex flex-column gap-5'>
                {/* Opponent componenet */}
                <div className='d-flex flex-column gap-2'>
                    <ShowStats character={Skeleton} currentHp={opponentcurrentHp} />
                </div>
                <div>
                    <h5>{character.name} VS {Skeleton.name}</h5>
                </div>
                {/* character componenet */}
                <div className='d-flex flex-column gap-2'>
                    <ShowStats character={character} currentHp={usercurrentHp} />
                </div>
                {/* user action */}
                {
                    !showMassage ? (
                        <div className='d-flex flex-row justify-content-center gap-5'>
                            <UserAction setNewAction={handleAction}
                            setCurrentHealingPotion={setCurrentHealingPotion}
                            currentHealingPotion={currentHealingPotion}
                            currentHp={usercurrentHp}
                            character={character}
                            />
                        </div>
                    ) : (
                        <div className='d-flex flex-row justify-content-center gap-5'>
                            <ShowMassage massage={action} name={nameTurn}/>
                        </div>
                    )
                }
            </div>
            )
        }
    </div>
  );
}

export default Battle1;
