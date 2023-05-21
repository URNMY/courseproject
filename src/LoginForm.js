import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle login logic
      navigate('/recipes');
  };

    const handleLogin = async () => {
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                navigate('/recipes');
                // Дополнительные действия после успешной авторизации
            } else {
                console.log('Произошла ошибка');
            }
        } catch (error) {
            console.log('Произошла ошибка', error);
        }
    };


  return (
    <div>
      <label htmlFor="username">Имя пользователя</label>
      <input
        type="username"
        id="username"
        name="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />

      <label htmlFor="password">Пароль</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <button type="submit" onClick={handleLogin}>
          Войти
      </button>
    </div>
  );
}

export default LoginForm;
