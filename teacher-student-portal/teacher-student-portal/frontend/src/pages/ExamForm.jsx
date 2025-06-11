import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ExamForm() {
  const [formData, setFormData] = useState({
    name: '',  // Add the name field
    roll_number: '',
    registration_number: '',
    exam_name: '',
    semester: '',
    exam_type: '',
    department: '',
    gmail: '',
    subjects: [''],
  });

  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubjectChange = (index, value) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = value;
    setFormData(prev => ({ ...prev, subjects: newSubjects }));
  };

  const addSubjectField = () => {
    setFormData(prev => ({ ...prev, subjects: [...prev.subjects, ''] }));
  };

  const removeSubjectField = (index) => {
    const newSubjects = formData.subjects.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, subjects: newSubjects }));
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/exam-form', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      alert('✅ Exam form submitted successfully!');
      setIsSubmitted(true); // Set to true after successful submission
    } catch (err) {
      alert('❌ Submission failed');
      console.error(err);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="text-success">Thank You!</h1>
        <p>Your exam form has been successfully submitted. We wish you the best of luck!</p>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center mb-4 text-primary">📝 Exam Registration Form</h2>

          {/* Name Field */}
          <div className="mb-4">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your name"
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label>Roll Number</label>
              <input
                type="text"
                name="roll_number"
                value={formData.roll_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label>Registration Number</label>
              <input
                type="text"
                name="registration_number"
                value={formData.registration_number}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <label>Exam Name</label>
              <input
                type="text"
                name="exam_name"
                value={formData.exam_name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label>Semester</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-4">
              <label>Exam Type</label>
              <select
                name="exam_type"
                value={formData.exam_type}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select</option>
                <option value="Regular">Regular</option>
                <option value="Backlog">Backlog</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label>Gmail</label>
            <input
              type="email"
              name="gmail"
              value={formData.gmail}
              onChange={handleChange}
              className="form-control"
              placeholder="example@gmail.com"
            />
          </div>

          <h5 className="mb-3">Subjects</h5>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Subject Name</th>
                <th style={{ width: '100px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {formData.subjects.map((subject, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => handleSubjectChange(index, e.target.value)}
                      className="form-control"
                      placeholder={`Subject ${index + 1}`}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => removeSubjectField(index)}
                    >
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mb-3">
            <button className="btn btn-outline-primary" onClick={addSubjectField}>
              ➕ Add Subject
            </button>
          </div>

          <div className="text-center">
            <button className="btn btn-success px-5 py-2 fw-bold" onClick={handleSubmit}>
              Submit Exam Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
