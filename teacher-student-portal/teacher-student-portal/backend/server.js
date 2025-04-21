const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
import { useNavigate } from 'react-router-dom';

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432
});

// Teacher Registration
app.post('/api/teacher/register', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }
  
    try {
      const existing = await pool.query('SELECT * FROM teachers WHERE username = $1', [username]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      await pool.query(
        'INSERT INTO teachers (username, password) VALUES ($1, $2)',
        [username, password]
      );
      res.status(200).json({ message: 'Teacher registered successfully' });
    } catch (err) {
      console.error('Registration error:', err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

// Teacher Login
app.post('/api/teacher/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM teachers WHERE username=$1 AND password=$2', [username, password]);
  if (result.rows.length > 0) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Add student route
app.post('/api/students', async (req, res) => {
    console.log("🔥 Received body:", req.body); // ADD THIS
  
    const { name, roll_number, dob, course, year } = req.body;
  
    if (!name || !roll_number || !dob || !course || !year) {
      console.log("❌ Missing field in student data"); // ADD THIS
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    const parsedYear = parseInt(year);
    if (isNaN(parsedYear)) {
    return res.status(400).json({ message: 'Year must be a number' });
    }

    try {
      const existing = await pool.query('SELECT * FROM students WHERE roll_number = $1', [roll_number]);
      if (existing.rows.length > 0) {
        return res.status(400).json({ message: 'Student already exists' });
      }
  
      await pool.query(
        'INSERT INTO students (name, roll_number, dob, course, year) VALUES ($1, $2, $3, $4, $5)',
        [name, roll_number, dob, course, parsedYear]
      );
      res.status(201).json({ message: 'Student added successfully' });
    } catch (err) {
      console.error('Database insert error:', err); // 🔥 Add this line
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  

// Student Login
app.post('/api/student/login', async (req, res) => {
  const { roll_number, dob } = req.body;
  const result = await pool.query('SELECT * FROM students WHERE roll_number=$1 AND dob=$2', [roll_number, dob]);
  if (result.rows.length > 0) {
    res.json({ message: 'Login success', student: result.rows[0] });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});


// exam form
app.post('/api/exam-form', async (req, res) => {
    const { roll_number, exam_name, semester, subjects } = req.body;
  
    if (!roll_number || !exam_name || !semester || !Array.isArray(subjects) || subjects.length === 0) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      await pool.query(
        'INSERT INTO exam_forms (roll_number, exam_name, semester, subjects) VALUES ($1, $2, $3, $4)',
        [roll_number, exam_name, semester, JSON.stringify(subjects)]
      );
      res.status(201).json({ message: 'Form submitted' });
    } catch (err) {
      console.error('Error inserting exam form:', err.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });