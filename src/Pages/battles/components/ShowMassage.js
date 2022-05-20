import React, { useState, useEffect }  from 'react';
import '../../../App.css';

function ShowMassage(props) {

    const massage = props.massage
    const name = props.name

  return (
    <>
        {
            massage === 'Attack' ? (
                <div>
                    <p>{name} Attack his Opponent</p>
                </div>
            ) : massage === 'Heal' ? (
                <div>
                    <p>{name} healing himself</p>
                </div>
            ) : (
                <div>
                    <p>{name} Kill his Opponent</p>
                </div>
            )
        }
    </>
  );
}

export default ShowMassage;
