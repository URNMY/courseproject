import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Подключение стилей

const MainPage = () => {
    return (
        <div className="main-page">
            <div className="button-container">
                <form>
                    <p className="intro-text">ИСС по кулинарии</p>
                    <p className="next-text">Для доступа ко всем функциям, пожалуйста, <span className="highlight"><Link className="link" to="/login">войдите</Link></span> или <span className="highlight"><Link className="link" to="/login">зарегистрируйтесь</Link></span></p>
                </form>
            </div>
        </div>
    );
}

export default MainPage;
