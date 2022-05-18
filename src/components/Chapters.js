import React, { useState, useEffect }  from 'react';
import axios from '../api/axios';
import '../App.css';
import { useAuth } from '../hooks/useAuth';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

function Chapters(props) {

  const User = props.user.auth

  return (
    <article>
        <div className='container d-flex flex-column align-items-center justify-content-center'>
          <h2>Chapters: </h2>
          <Link to="/Chapter1">Chapter 1</Link>
          {
            User.character.ChaptersCompleted.map((chapterComp, index) =>{
              if(chapterComp === (index + 1).toString()){
                return (<Link to={"/Chapter" + (parseInt(chapterComp) + 1).toString()} key={(parseInt(chapterComp) + 1).toString()}>Chapter {(parseInt(chapterComp) + 1).toString()}</Link>)
              }
            })
          }
        </div>
    </article>
  );
}

export default Chapters;
