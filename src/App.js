import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import MainPage from './MainPage'
import RecipesPage from './RecipesPage';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path='/register' element={<RegisterPage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/recipes' element={<RecipesPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
