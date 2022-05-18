import React, { useState }  from 'react';
import '../../App.css';
import Header from '../../components/Header';


function Chapter3( ) {
    const [links, setLinks] = useState(['']);

  return (
    <div>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='chapter3'>
                <h1>Chapter 3 Page</h1>
            </div>
            <div className='description'>
                <p>Chapter 3</p>
            </div>  
        </div>
    </div>
  );
}

export default Chapter3;
