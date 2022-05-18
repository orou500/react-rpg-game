import React from 'react';
import { Nav, Navbar, NavbarBrand } from 'react-bootstrap';
import { Link } from "react-router-dom";
import '../App.css';
import { useAuth } from '../hooks/useAuth';

function Header(props) {

  return (
        <Navbar bg="light" className='d-flex' sticky='top' expand="lg" collapseOnSelect>
            <Navbar.Brand >
                <Nav.Link><Link to={"/"} className="nav-link logo"><h1>Game Logo</h1></Link></Nav.Link>
            </Navbar.Brand>
            <Navbar.Toggle className='m-2' />
            <Navbar.Collapse>
                <div className='links d-flex justify-content-center'>
                    <Nav>
                    {props.navLink.map((linkName) => {
                        if(linkName === ' '){
                            return (
                                <Nav.Link><Link to={"/"} key={'Home'} className="nav-link">Home</Link></Nav.Link>
                                );
                            } else {
                                return (
                                    <Nav.Link><Link to={"/"+linkName} key={linkName} className="nav-link">{linkName}</Link></Nav.Link>
                                    );
                                }
                    })}
                    </Nav>
                </div>
            </Navbar.Collapse>
        </Navbar>
  );
}

export default Header;
