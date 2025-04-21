import React, { useState } from 'react';
import axios from 'axios';

export default function TeacherRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/teacher/register', { username, password });
      alert('Teacher registered successfully!');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Teacher Registration</h2>
      <div className="mb-3">
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" />
      </div>
      <button onClick={handleRegister} className="btn btn-info text-white">Register</button>
    </div>
  );
}
