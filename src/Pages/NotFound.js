import React, { useState } from 'react';
import '../App.css';
import Header from '../components/Header';

function NotFound() {
  const [links, setLinks] = useState(["About"]);
  return (
    <div className='container-fluid'>
      <Header navLink={links} />
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <div className='about'>
          <h1>Page Not Found!</h1>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
