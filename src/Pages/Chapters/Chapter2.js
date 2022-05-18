import React, { useState }  from 'react';
import '../../App.css';
import Header from '../../components/Header';

function Chapter2( ) {
    const [links, setLinks] = useState(['']);

  return (
    <div>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='chapter2'>
                <h1>Chapter 2 Page</h1>
            </div>
            <div className='description'>
                <p>Chapter 2</p>
            </div>  
        </div>
    </div>
  );
}

export default Chapter2;
