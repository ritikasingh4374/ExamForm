import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function StudentLogin() {
  const [roll_number, setRollNumber] = useState('');
  const [dob, setDob] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic validation to ensure the fields are filled
    if (!roll_number || !dob) {
      alert('Please enter both Roll Number and Date of Birth');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/student/login', { roll_number, dob });
      console.log(res.data);  // Log the response to check the data

      alert(`Welcome, ${res.data.student.name}`);
      navigate('/student-dashboard');
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Login</h2>
      <div className="mb-3">
        <input 
          type="text" 
          placeholder="Roll Number" 
          value={roll_number} 
          onChange={e => setRollNumber(e.target.value)} 
          className="form-control" 
        />
      </div>
      <div className="mb-3">
        <input 
          type="date" 
          value={dob} 
          onChange={e => setDob(e.target.value)} 
          className="form-control" 
        />
      </div>
      <button onClick={handleLogin} className="btn btn-success">Login</button>
    </div>
  );
}
