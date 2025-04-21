import React, { useState } from 'react';
import axios from 'axios';

export default function StudentLogin() {
  const [roll_number, setRollNumber] = useState('');
  const [dob, setDob] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/student/login', { roll_number, dob });
      alert(`Welcome, ${res.data.student.name}`);
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student Login</h2>
      <div className="mb-3">
        <input type="text" placeholder="Roll Number" value={roll_number} onChange={e => setRollNumber(e.target.value)} className="form-control" />
      </div>
      <div className="mb-3">
        <input type="date" value={dob} onChange={e => setDob(e.target.value)} className="form-control" />
      </div>
      <button onClick={handleLogin} className="btn btn-success">Login</button>
    </div>
  );
}
