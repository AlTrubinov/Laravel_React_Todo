import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TodoItemPage = () => {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem('access_token');

  const destroy = () => {
    try {
      axios.delete(`/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/todos');
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchTodoInfo = async () => {
      if (id) {
        try {
          const response = await axios.get(`/todos/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTodo(response.data);
        } catch (error) {
          navigate('/todos');
        }
      }
      setIsLoading(false);
    };
    if (!token) {
      navigate('/login');
      return;
    }

    fetchTodoInfo();
  }, [id, navigate]);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!todo) {
    return <div>Todo not found</div>;
  }

  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <button onClick={destroy}>Delete Todo</button>
    </div>
  );
};

export default TodoItemPage;
