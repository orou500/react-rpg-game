import React, { useState, useEffect }  from 'react';
import '../../../App.css';

function UserAction(props) {


    // useEffect(() => {
    //     const healingPotion = props.character.items.find(item => item.name === 'Healing Potion');
    // },[] )

  return (
      <>
        <div>
            <button onClick={() => props.setNewAction('Attack')}>Attack</button>
        </div>
        <div>
            {
                props.currentHp === props.character.hp ? (
                    <button disabled>Heal</button>
                ) :
                props.currentHealingPotion > 0 ? (
                    <button onClick={() => {props.setNewAction('Heal');}}>Heal</button>
                ) : (
                    <button disabled>Heal</button>
                )
            }
            <p>Healing Potions: {props.currentHealingPotion}</p>
        </div>
      </>
  );
}

export default UserAction;
