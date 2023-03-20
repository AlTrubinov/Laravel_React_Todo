import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import axios from 'axios';

// импортируем компоненты для каждой страницы
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserPage from './components/UserPage';
import TodoListPage from './components/TodoListPage';
import TodoCreatePage from './components/TodoCreatePage';
import ListDownloadPage from './components/ListDownloadPage';
import TodoItemPage from './components/TodoItemPage';

// задаем базовый URL для API
axios.defaults.baseURL = 'http://localhost:8000/api';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route exact path="/todos" element={<TodoListPage />} />
        <Route path="/todos/create" element={<TodoCreatePage />} />
        <Route path="/todos/export" element={<ListDownloadPage />} />
        <Route path="/todos/:id" element={<TodoItemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
