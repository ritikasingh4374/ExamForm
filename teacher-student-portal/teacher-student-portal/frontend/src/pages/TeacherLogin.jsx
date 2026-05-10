import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';

export default function TeacherLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/teacher/login`, { username, password });
      alert(res.data.message);
      navigate('/teacher-dashboard'); 
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teacher Login</h2>
      <div className="mb-3">
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
      </div>
      <button onClick={handleLogin} className="btn btn-warning">Login</button>
    </div>
  );
}
