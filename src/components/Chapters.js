import React, { useState, useEffect }  from 'react';
import axios from '../api/axios';
import '../App.css';
import { useAuth } from '../hooks/useAuth';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Chapters(props) {

  const User = props.user.auth
  
   useEffect(() => {
     console.log(User.character.ChaptersCompleted)
   }, [User])

  return (
    <article>
        <div className='container d-flex flex-column align-items-center justify-content-center'>
          <h2>Chapters: </h2>
          <Link to="/Chapter1">Chapter 1</Link>
          {
            User.character.ChaptersCompleted.map((chapterComp, index) =>{
              console.log(index)
              if(chapterComp === (index + 1).toString()){
                return (<Link to={"/Chapter" + (chapterComp + 1).toString()} key={(chapterComp + 1).toString()}>Chapter {(chapterComp + 1).toString()}</Link>)
              }
            })
          }
        </div>
    </article>
  );
}

export default Chapters;
