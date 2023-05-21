import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm.js';
import './style.css';

function RegisterPage() {
    return (
        <div className="container">
            <form>
                <RegisterForm />
                <p>
                    Уже есть аккаунт? <Link className="link" to="/login">Войти</Link>
                </p>
            </form>
        </div>
    );
}
export default RegisterPage;