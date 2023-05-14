import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/register' component={<RegisterPage/>} />
                <Route path='/login' component={<LoginPage/>} />
            </Routes>
        </Router>
    );
}

export default App;
