import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm.js';
import logo from './logo.svg';
import './style.css';

function RegisterPage() {
    return (
        <div className="container">
            <form>
                <img src={logo} alt="Logo" />
                <RegisterForm />
                <p>
                    Already have an account? <Link to="/">Log in</Link>
                </p>
            </form>
        </div>
    );
}
export default RegisterPage;