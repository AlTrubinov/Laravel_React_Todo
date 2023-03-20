import React from 'react';

const TodoItem = ({ todo, onDelete }) => {
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li>
      <div>{todo.title}</div>
      <div>{todo.description}</div>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default TodoItem;
