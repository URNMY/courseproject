import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm.js';

import './style.css';

function LoginPage() {
    return (
        <div className="container">
            <form>
                <LoginForm />
                <p>
                    Еще нет аккаунта? <Link className="link" to="/register">Регистрация</Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
