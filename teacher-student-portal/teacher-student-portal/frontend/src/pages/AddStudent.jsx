import React, { useState } from 'react';
import axios from 'axios';

export default function AddStudent() {
  const [formData, setFormData] = useState({
    name: '',
    roll_number: '',
    dob: '',
    course: '',
    year: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting student:', formData);
      await axios.post('http://localhost:5000/api/students', formData);
      alert('Student added!');
    } catch (err) {
      alert('Failed to add student');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Student</h2>
      {['name', 'roll_number', 'dob', 'course', 'year'].map(field => (
        <div className="mb-3" key={field}>
          <input
            type={field === 'dob' ? 'date' : 'text'}
            name={field}
            placeholder={field.replace('_', ' ').toUpperCase()}
            value={formData[field]}
            onChange={handleChange}
            className="form-control"
          />
        </div>
      ))}
      <button onClick={handleSubmit} className="btn btn-primary">Add Student</button>
    </div>
  );
}
