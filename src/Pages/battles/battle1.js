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
      name: 'Val Killmore',
      speed: 2,
      strength: 4,
      weapon: "Bone Bword",
  }

  const [turn, setTurn] = useState(0);
  const [nameTurn, setNameTurn] = useState('Opponent');
  const [showMassage, setShowMassage] = useState(false)
  const [action, setAction] = useState('');

  const [opponentcurrentHp, setOpponentCurrentHp] = useState(Skeleton.hp);
  const [usercurrentHp, setUserCurrentHp] = useState(character.hp);



const handleAction = (value) => {
    setNameTurn(character.name)
    setAction(value)
    setTurn(turn + 1)
    setShowMassage(true)
    
    if(value === 'Attack'){
        const damage = Math.floor((Math.random() * character.strength + 1) * (100/(100+Skeleton.defense)))
        setOpponentCurrentHp(opponentcurrentHp - damage)
    } else if ( value === 'Heal') {
        const Heal = Math.floor((Math.random() * Skeleton.defense + 1) * (100/(100+character.hp)))
        let newUsercurrentHp = usercurrentHp + Heal
        if(newUsercurrentHp > character.hp){
            newUsercurrentHp = character.hp
        }
        setUserCurrentHp(usercurrentHp + Heal)
    }
    setTimeout(function(){
        setNameTurn(Skeleton.name)

        if(opponentcurrentHp === Skeleton.hp){
            setAction('Attack')
            const damage = Math.floor((Math.random() * Skeleton.strength + 1) * (100/(100+character.defense)))
            setUserCurrentHp(usercurrentHp - damage)
            
        }else {
            const opponentChose = Math.floor(Math.random() * 2)
            if(opponentChose === 0){
                setAction('Attack')
                const damage = Math.floor((Math.random() * Skeleton.strength + 1) * (100/(100+character.defense)))
                setUserCurrentHp(usercurrentHp - damage)
                        
            } else {
                setAction('Heal')
                const Heal = Math.floor((Math.random() * character.defense + 1) * (100/(100+Skeleton.hp)))
                let newOpcurrentHp = opponentcurrentHp + Heal
                if(newOpcurrentHp > Skeleton.hp){
                    newOpcurrentHp = Skeleton.hp
                }
                setOpponentCurrentHp(newOpcurrentHp)
                
            }
        }
        setTimeout(function(){
            setShowMassage(false)
            setTurn(turn + 1)
        }, 3000);
    }, 3000);
}

useEffect(() => {
    if(opponentcurrentHp <= 0){
        setOpponentCurrentHp(0)
        setNameTurn(character.name)
        setAction('win')
        setShowMassage(true)
    }else if(usercurrentHp <= 0){
        setUserCurrentHp(0)
        setNameTurn(Skeleton.name)
        setAction('win')
        setShowMassage(true)
    }
 })

  return (
    <div className='d-flex flex-column gap-3 p-5'>
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
                        <UserAction setNewAction={handleAction} currentHp={usercurrentHp} character={character}/>
                    </div>
                ) : (
                    <div className='d-flex flex-row justify-content-center gap-5'>
                        <ShowMassage massage={action} name={nameTurn}/>
                    </div>
                )
            }
        </div>
    </div>
  );
}

export default Battle1;
