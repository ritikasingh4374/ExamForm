import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🎓 Student Dashboard</h2>

      <button style={btnStyle} onClick={() => navigate('/exam-form')}>
        📝 Submit Exam Form
      </button>
    </div>
  );
};

const btnStyle = {
  marginTop: '2rem',
  padding: '1rem 2rem',
  fontSize: '1rem',
  cursor: 'pointer',
};

export default StudentDashboard;
