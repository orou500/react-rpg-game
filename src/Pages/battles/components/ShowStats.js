import React, { useState, useEffect }  from 'react';
import '../../../App.css';

function ShowStats(props) {

    const character = props.character

  return (
    <>
        <div>
            <p>{character.name}</p>
        </div>
        <div>
            <p>Class: {character.className}</p>
        </div>
        <div>
            <p>LVL: {character.level}</p>
        </div>
        <div>
            <p>HP: {props.currentHp}</p>
        </div>
        <div>
            <p>Weapon: {character.weapon}</p>
        </div>
    </>
  );
}

export default ShowStats;
