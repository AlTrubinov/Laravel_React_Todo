import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/todos').then(response => {
      setTodos(response.data);
    });
  }, []);

  const handleCreate = event => {
    event.preventDefault();
    const newTodo = {
      title: title,
      description: description,
      user_id: 1, // здесь введите ID пользователя
    };
    axios.post('/api/todos', newTodo).then(response => {
      setTodos([...todos, response.data]);
      setTitle('');
      setDescription('');
    });
  };

  const handleDelete = todoId => {
    axios.delete(`/api/todos/${todoId}`).then(() => {
      setTodos(todos.filter(todo => todo.id !== todoId));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleCreate}>
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        <input type="text" value={description} onChange={event => setDescription(event.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
