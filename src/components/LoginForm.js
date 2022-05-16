import React, { useState, useRef, useEffect }  from 'react';
import '../Style/Form.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LOGIN_URL = '/Login'

function LoginForm(props) {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.pathname === '/Login' ? location.pathname : "/";
  if(from === '/Login') {
    from = '/'
  }

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPwd('')
    setUser('')
    setErrMsg('spinner')
    try{
      const response = await axios.post(LOGIN_URL, 
        JSON.stringify({userName: user, password: pwd}),
        {
          headers: {'Content-Type': 'application/json'},
        }
      )
      if(response.data === 'The username or password is incorrect!'){
        setErrMsg('The username or password is incorrect!')
      } else {
        const accessToken = response.data.accessToken;
        const roles = response.data.roles
        setAuth({user, accessToken, roles})
        navigate(from, { replace: true })
      }
    } catch (err) {
      if(!err.response) {
        setErrMsg('Server Not Response')
      } else {
          setErrMsg(err.response.data || 'Server Not Response')
      }
      errRef.current.focus()
    }

  }

  return (
      <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label htmlFor='username'>Username </label>
              <input type="text" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUser(e.target.value)} value={user} required />
            </div>
            <div className="input-container">
              <label  htmlFor='password'>Password </label>
              <input type="password" id="password"  onChange={(e) => setPwd(e.target.value)} autoComplete="off" value={pwd} required />
            </div>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg === 'spinner' ? <FontAwesomeIcon className='spinner' icon={faSpinner} /> : errMsg}</p>
            <div className="button-container">
              <button>Login</button>
            </div>
            <p className='mb-0 mt-2'>Don't have an account yet?</p>
            <Link to="/Register">Register</Link> 
          </form>
      </div>
  );
}

export default LoginForm;
