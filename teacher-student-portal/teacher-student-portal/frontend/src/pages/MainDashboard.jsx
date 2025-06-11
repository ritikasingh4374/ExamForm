import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={backgroundStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>🎓 Welcome to Exam Portal</h1>

        <div style={buttonContainer}>
          <button style={btnStyle} onClick={() => navigate('/student-login')}>
            👨‍🎓 I am a Student
          </button>
          <button style={btnStyle} onClick={() => navigate('/register')}>
            👩‍🏫 I am a Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

const backgroundStyle = {
  height: '100vh',
  backgroundColor: 'rgb(251, 253, 254)', // Lighter navy blue (RGB)
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Arial, sans-serif',
};

const cardStyle = {
  backgroundColor: 'rgb(216, 222, 228)', // White background for the card
  padding: '3rem',
  borderRadius: '15px',
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '90%',
  maxWidth: '500px',
};

const headingStyle = {
  marginBottom: '2rem',
  color: 'rgb(38, 50, 56)', // Same lighter navy blue for the heading
  fontSize: '2.5rem',
  fontWeight: 'bold',
};

const buttonContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  flexWrap: 'wrap',
};

const btnStyle = {
  padding: '1rem 2rem',
  fontSize: '1.2rem',
  cursor: 'pointer',
  borderRadius: '8px',
  border: 'none',
  backgroundColor: 'rgb(160, 186, 207)', // Light blue button color (RGB)
  color: '#fff',
  transition: '0.3s',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

// Hover effect with a slight color change (darker light blue)
btnStyle[':hover'] = {
  backgroundColor: 'rgb(66, 165, 245)', // Darker blue on hover (RGB)
  transform: 'scale(1.05)',  // Subtle zoom effect on hover
};

export default MainDashboard;
