import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.js';
import logo from './logo.svg';
import './style.css';

function LoginPage() {
    return (
        <div className="container">
            <form>
                <img src={logo} alt="Logo" />
                <LoginForm />
                <p>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
