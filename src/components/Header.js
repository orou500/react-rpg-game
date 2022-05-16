import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

function Header(props) {
  return (
    <div className='container-fluid'>
        <div className="container d-flex flex-row justify-content-between">
            <div className='logo'>
                <Link to={"/"} className="logo"><h1>Test Logo</h1></Link>
            </div>
            <div className='links d-flex flex-row justify-content-between'>
                {props.navLink.map((linkName) => {
                    if(linkName === ' '){
                        return (
                            <Link to={"/"} key={'Home'} className='m-2'><h5>Home</h5></Link> 
                        );
                    } else {
                        return (
                            <Link to={"/"+linkName} key={linkName} className='m-2'><h5>{linkName}</h5></Link> 
                        );
                    }
                })}
            </div>  
        </div>
    </div>
  );
}

export default Header;
