import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    console.log(token);
    if (token) {
      axios.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, []);

  return (
    <div>
      <h1>Добро пожаловать на главную страницу Todo App!</h1>
      {user ? (
        <>
          <p>Вы вошли в систему как {user.name}.</p>
          <Link to="/user">Мой профиль</Link>
          <br />
          <Link to="/todos">Мои задачи</Link>
        </>
      ) : (
        <>
          <p>Чтобы использовать все возможности приложения, пожалуйста, войдите или зарегистрируйтесь.</p>
          <Link to="/login">Войти</Link>
          <br />
          <Link to="/register">Зарегистрироваться</Link>
        </>
      )}
    </div>
  );
};

export default HomePage;
