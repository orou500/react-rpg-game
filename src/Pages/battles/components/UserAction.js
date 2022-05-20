import React, { useState, useEffect }  from 'react';
import '../../../App.css';

function UserAction(props) {


  return (
      <>
        <div>
            <button onClick={() => props.setNewAction('Attack')}>Attack</button>
        </div>
        <div>
            {
                props.currentHp !== props.character.hp ? (
                    <button onClick={() => props.setNewAction('Heal')}>Heal</button>
                ) : (
                    <button disabled>Heal</button>
                )
            }
        </div>
      </>
  );
}

export default UserAction;
