import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);

                // Дополнительные действия после успешной авторизации
                window.location.href = 'http://localhost:3000/recipes';
            } else {
                const errorData = await response.json();
                console.log('Ошибка авторизации:', errorData.detail);
            }
    };

    const handleRecaptchaChange = (response) => {
        // Обработка изменения reCAPTCHA
        console.log("reCAPTCHA response:", response);
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

      <label htmlFor="password">Пароль</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />

      <ReCAPTCHA
        sitekey="6LfkuSkmAAAAALQVRBN7023GvcZQJTKqhWrP5R0U"
        onChange={handleRecaptchaChange}
      />
      <button type="submit" onClick={handleLogin}>
          Войти
      </button>

    </div>
  );
}

export default LoginForm;
