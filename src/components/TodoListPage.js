import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      axios.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    axios.get('/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setTodos(response.data);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [token, navigate]);

  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <Link to="/todos/create">Create Todo</Link><br />
      <Link to="/todos/export">Download Todo list</Link>
      <ul>
        {todos.length ? todos.map(todo => (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
          </li>
        )) : 'No todos found.'}
      </ul>
    </div>
  );
};

export default TodoListPage;
