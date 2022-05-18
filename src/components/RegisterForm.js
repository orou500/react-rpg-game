import React, { useState, useRef, useEffect }  from 'react';
import { Link } from "react-router-dom";
import '../Style/Form.css';
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%*]).{8,24}$/;
const REGISTER_URL = '/Register'

function RegisterForm() {

  const userRef = useRef();
  const errRef = useRef();

 const [user, setUser] = useState('');
 const [validName, setValidName] = useState(false);
 const [userFocus, setUserFocus] = useState(false);

 const [pwd, setPwd] = useState('');
 const [validPwd, setValidPwd] = useState(false);
 const [pwdFocus, setPwdFocus] = useState(false);

 const [matchPwd, setMatchPwd] = useState('');
 const [validMatch, setValiMatch] = useState(false);
 const [matchFocus, setMatchFocus] = useState(false);

 const [errMsg, setErrMsg] = useState('');
 const [success, setSuccess] = useState(false);

useEffect(() => {
  userRef.current.focus();
}, [])

useEffect(() => {
  const result = USER_REGEX.test(user)
  setValidName(result)
}, [user])

useEffect(() => {
  const result = PWD_REGEX.test(pwd)
  setValidPwd(result)
  const match = pwd === matchPwd
  setValiMatch(match)
}, [pwd, matchPwd])

useEffect(() => {
  setErrMsg('')
}, [user, pwd, matchPwd])

const handleSubmit = async (e) => {
  e.preventDefault();
  const v1 = USER_REGEX.test(user)
  const v2 = PWD_REGEX.test(pwd)
  if(!v1 || !v2 || !matchPwd) {
    setErrMsg("Invalid Entry")
  } else {
    try{
      const response = await axios.post(REGISTER_URL, 
        JSON.stringify({userName: user, password: pwd}),
        {
          headers: {'Content-Type': 'application/json'},
        }
      )
      if(response.data === 'this User already exists!'){
        setErrMsg('This User already exists!')
      } 
      if(response.data === 'New User!') {
        setSuccess(true)
      }
    } catch (err) {
      if(!err.response) {
        setErrMsg('Server Not Response')
      } else {
        setErrMsg(err.response.data)
      }
      errRef.current.focus()
    }
  }
}

  return (
    <>
    { success ? (
        <section>
          <h3>Congratulations, your account has been successfully created.</h3>
          <Link to="/Login">To Login Page</Link> 
        </section>
    ) : (
    <div className="form">
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor='username'>
              Username
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input 
              type="text"
              id='username' 
              ref={userRef} 
              autoComplete="off" 
              onChange={(e) => setUser(e.target.value)}
              required 
              aria-invalid={validName ? "false" : "true"} 
              aria-describedby="uidnote" 
              onFocus={() => setUserFocus(true)} 
              onBlur={() => setUserFocus(false)}
            />
            <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.<br />
              must begin with a letter.<br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          <div className="input-container">
            <label htmlFor='password'>
              Password
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input 
              type="password"
              id='password' 
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"} 
              aria-describedby="pwdnote" 
              onFocus={() => setPwdFocus(true)} 
              onBlur={() => setPwdFocus(false)}
            />
            <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must iclude uppercase and lowercase letter. a number and a special Character..<br />
              Allowed special characters:<span aria-label='exclamation mark'>!</span>
              <span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span>
              <span aria-label='dollar sign'>$</span><span aria-label='percent'>%</span>
              <span aria-label='asterisk'>*</span>
            </p>
          </div>
          <div className="input-container">
          <label htmlFor='confirm_pwd'>
              Confirm Password
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input 
              type="password"
              id='confirm_pwd' 
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"} 
              aria-describedby="confirmnote" 
              onFocus={() => setMatchFocus(true)} 
              onBlur={() => setMatchFocus(false)}
            />
            <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input fluid.
            </p>
          </div>
          <div className="button-container">
            <button disabled={!validName || !validPwd || !validMatch ? true : false}>Register</button>
          </div>
        </form>
        <p className='mb-0 mt-2'>Already have an account?</p>
        <Link to="/Login">Login</Link> 
    </div>
    )}
    </>
  );
}

export default RegisterForm;
