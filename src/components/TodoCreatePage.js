import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTodoPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
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

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      const user_id = user.id;

      const response = await axios.post('/todos', { user_id, ...formData }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFormData({ title: '', description: '' });
      setSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h1>Create Todo</h1>
      {success && (
        <div style={{ color: 'green' }}>
          Todo created successfully.
        </div>
      )}
      {error && (
        <div style={{ color: 'red' }}>
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateTodoPage;
