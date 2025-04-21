import React, { useState } from 'react';
import axios from 'axios';

export default function ExamForm() {
  const [formData, setFormData] = useState({
    roll_number: '',
    exam_name: '',
    semester: '',
    subjects: [''],
  });

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
      alert('Exam form submitted successfully!');
    } catch (err) {
      alert('Submission failed');
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4 font-bold">Exam Form</h2>
      <input
        name="roll_number"
        placeholder="Roll Number"
        value={formData.roll_number}
        onChange={handleChange}
        className="border p-2 mb-2 block w-full"
      />
      <input
        name="exam_name"
        placeholder="Exam Name"
        value={formData.exam_name}
        onChange={handleChange}
        className="border p-2 mb-2 block w-full"
      />
      <input
        name="semester"
        placeholder="Semester"
        value={formData.semester}
        onChange={handleChange}
        className="border p-2 mb-4 block w-full"
      />

      <h3 className="text-lg mb-2 font-semibold">Subjects</h3>
      {formData.subjects.map((subject, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            placeholder={`Subject ${index + 1}`}
            value={subject}
            onChange={(e) => handleSubjectChange(index, e.target.value)}
            className="border p-2 w-full mr-2"
          />
          <button
            onClick={() => removeSubjectField(index)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            ❌
          </button>
        </div>
      ))}

      <button onClick={addSubjectField} className="bg-blue-500 text-white px-4 py-2 mb-4 rounded">
        ➕ Add Subject
      </button>

      <br />
      <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded">
        Submit Exam Form
      </button>
    </div>
  );
}
