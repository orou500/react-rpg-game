import React, { useRef, useState, useEffect }  from 'react';
import '../App.css';
import { useAuth } from '../hooks/useAuth';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';


const CHAR_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const CHAR_URL = '/Character'

function CreateCharacter() {
    const navigate = useNavigate();
    const { auth } = useAuth()
    const userName = auth.user;

  const characterRef = useRef();
  const errRef = useRef();

  const [characterName, setCharacterName] = useState('');
  const [validChar, setValidChar] = useState(false);
  const [characterFocus, setCharacterFocus] = useState(false);
  const [className, setClassName] = useState('');

  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const result = CHAR_REGEX.test(characterName)
    setValidChar(result)
  }, [characterName])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = CHAR_REGEX.test(characterName)
    if(!v1 || className === '') {
        setErrMsg("Invalid Entry")
      } else {
        try{
            const response = await axios.post(CHAR_URL, 
              JSON.stringify({userName, characterName, className}),
              {
                headers: {
                    'Authorization': auth.accessToken,
                    'Content-Type': 'application/json'
                  },
              }
            )
            if(response.data === 'this Character already exists!'){
              setErrMsg('This Character already exists!')
            } else {
                let charcter = response.data.charcter
                auth.character = charcter
                setSuccess(true)
                // navigate('/Login', { replace: true })
            }
          } catch (err) {
            if(!err.response) {
              setErrMsg('Server Not Response')
            } else {
              setErrMsg('Cant Find Server')
            }
            errRef.current.focus()
          }
      }
  }

  return (
    <>
    { success ? (
        <section className='container d-flex flex-column align-items-center justify-content-center text-center'>
          <h3>Congratulations, your Character has been successfully created.</h3><br />
          <p>Do you want to start your journey?</p>
          <Link to="/Chapter1">Start Chapter 1</Link><br />
          <p>Do you want to see your profile?</p>
          <Link to="/Profile">To Profile Page</Link> 
        </section>
    ) : (
      <div className='text-center'>
        <h1>Create Character</h1>
        <form onSubmit={handleSubmit}>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className="input-container">
              <label htmlFor='character-name'>
                    Character Name
                    <span className={validChar ? "valid" : "hide"}>
                        -<FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validChar || !characterName ? "hide" : "invalid"}>
                        -<FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
            <input 
                type="text"
                id="character-name"
                ref={characterRef}
                autoComplete="off"
                onChange={(e) => setCharacterName(e.target.value)} 
                value={characterName}
                aria-describedby="charnote"
                aria-invalid={validChar ? "false" : "true"}
                onFocus={() => setCharacterFocus(true)} 
                onBlur={() => setCharacterFocus(false)}
                required
            />
            <p id='charnote' className={characterFocus && characterName && !validChar ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              - 4 to 24 characters.<br />
              must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor="class">Choose Your Class:</label>
            <select name="class" id="class" onChange = {value => setClassName(value.target.value)}>
                <option disabled selected>Select Your Class:</option>
                <optgroup label="Fighters">
                    <option value="Warrior">Warrior</option>
                </optgroup>
                <optgroup label="Magicians">
                    <option value="Wizard">Wizard</option>x
                </optgroup>
                <optgroup label="Rogues">
                    <option value="Thief">Thief</option>
                </optgroup>
                <optgroup label="Rangers">
                    <option value="Archer">Archer</option>
                </optgroup>
            </select>
            <button disabled={!validChar ? true : false}>Create Character</button>
            </div>
        </form>
      </div>
    )}
    </>
  );
}

export default CreateCharacter;
