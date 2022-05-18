import React from 'react';
import '../App.css';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

function Register() {

    const links = ['About'];

  return (
    <div>
        <Header navLink={links} />
        <div className="container d-flex flex-column align-items-center justify-content-center">
            <div className='home'>
                <h1>Register Page</h1>
                <div className='text-center'>
                    <RegisterForm />
                </div>
            </div>
        </div>
    </div>
  );
}

export default Register;
