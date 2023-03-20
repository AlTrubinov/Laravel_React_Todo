import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  const logout = () => {
    console.log(localStorage.getItem('access_token'));
    axios.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        localStorage.removeItem('access_token');
        navigate('/');
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

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
  }, [token, navigate]);

  return (
    <div>
      {user && (
        <>
          <h2>User profile:</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );  
};

export default UserInfo;

