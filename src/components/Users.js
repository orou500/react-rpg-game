import React, { useState, useEffect }  from 'react';
import axios from '../api/axios';
import '../App.css';
import { useAuth } from '../hooks/useAuth';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Users() {

    const [ users, setUsers] = useState();
    const [ errMsg, setErrMsg] = useState();
    const { auth } = useAuth()

    useEffect( () => {
        let isMounted = true
        const controller = new AbortController();

        const getUser = async () => {
            try {
                const response = await axios.get('/Users', {
                    headers: {
                        'Authorization': auth.accessToken,
                        'Content-Type': 'application/json'
                      },
                    signal: controller.signal,
                })
                const userNames = response.data.users.map(user => user.userName)
                auth.accessToken = response.data.newToken
                isMounted && setUsers(userNames)
            } catch (err) {
                if(!err.response){
                } else {
                    setErrMsg('No users to display')
                }
            }
        }

        getUser();

        return () => {
            isMounted = false
            controller.abort()
        }
    },[auth])

  return (
    <article>
        <div className='container d-flex flex-column align-items-center justify-content-center'>
        <h2>Users List</h2>
        {undefined !== users && users.length ? (
                <ul>
                    {users.map((user, i) => <li id={user} key={i}>{user}</li>)}
                </ul>
            ) : errMsg ? (
                <p>{errMsg}</p>
            ) : (
                <FontAwesomeIcon className='spinner' icon={faSpinner} />
                )
            }
        </div>
    </article>
  );
}

export default Users;
