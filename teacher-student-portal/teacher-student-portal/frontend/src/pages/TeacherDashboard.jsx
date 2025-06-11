import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeacherDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>👨‍🏫 Teacher Dashboard</h2>

      <button style={btnStyle} onClick={() => navigate('/students-info')}>
        👥 Students Info
      </button>

      <button style={btnStyle} onClick={() => navigate('/add-student')}>
        ➕ Add Student
      </button>

      <button style={btnStyle} onClick={() => navigate('/submitted-forms')}>
        📝 Submitted Forms
      </button>
    </div>
  );
};

const btnStyle = {
  margin: '1rem',
  padding: '1rem 2rem',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default TeacherDashboard;
