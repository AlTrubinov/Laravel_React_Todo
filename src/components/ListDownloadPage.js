import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FileDownload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

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

  const handleDownload = async () => {
    setIsLoading(true);
    if (!token) {
        navigate('/login');
        return;
    }

    try {
      const response = await axios.get('/todos/export', 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'todos.txt');
      document.body.appendChild(link);
      link.click();
      setIsLoading(false);
      navigate('/todos');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button disabled={isLoading} onClick={handleDownload}>
        {isLoading ? 'Loading...' : 'Download file'}
      </button>
    </div>
  );
};

export default FileDownload;
