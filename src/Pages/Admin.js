import React, { useState }  from 'react';
import '../App.css';
import Header from '../components/Header';
import Users from '../components/Users';

function Admin( ) {
    const [links, setLinks] = useState(['Profile']);

  return (
    <div>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='admin'>
                <h1>Admin Page</h1>
            </div>
            <div className='description'>
                <Users/>
            </div>  
        </div>
    </div>
  );
}

export default Admin;
