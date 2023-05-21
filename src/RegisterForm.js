import React, { useState } from 'react';

function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRePassword] = useState('')
    const [username, setUsername] = useState('')
    const [message, setMessage] = useState('')
    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        if (name === "password") {
            setPassword(value);
        } else if (name === "repassword") {
            setRePassword(value);
        }
        setMessage("");
    };

    const handleRegistration = async (event) => {
        if (password !== repassword) {
            setMessage("Пароли не совпадают");
        }
        else {
            event.preventDefault();
                const response = await fetch('http://localhost:8000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({username, email, password}),
                });

                if (response.ok) {
                    const data = await response.json();
                    setMessage(data.message);
                    window.location.href = 'http://localhost:8000/recipes';
                    // Дополнительные действия после успешной регистрации
                } else {
                    setMessage('Произошла ошибка');
                }
        }
    };

    return (
        <div>

            <label htmlFor="username">Имя пользователя</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
            />

            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            <label htmlFor="password">Пароль</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
            />

            <label htmlFor="repassword">Повторите пароль</label>
            <input
                type="password"
                id="repassword"
                name="repassword"
                value={repassword}
                onChange={handlePasswordChange}
                required
            />

            {message && <p className="Message">{message}</p>}
            <button type="submit" onClick={handleRegistration}>
                Зарегистрироваться
            </button>

        </div>
    );
}

export default RegisterForm;
