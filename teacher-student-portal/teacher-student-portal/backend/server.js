const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Pool } = require('pg');
const fs = require('fs');
const PDFDocument = require('pdfkit');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432
});

// Setup Gmail details (hardcoded for this example, you can move to environment variables)
const EMAIL = 'ritikasingh.4374@gmail.com';
const PASSWORD = 'ypcs pzxz visb ozvp'

// Teacher Registration Route
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

    await pool.query('INSERT INTO teachers (username, password) VALUES ($1, $2)', [username, password]);
    res.status(200).json({ message: 'Teacher registered successfully' });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Teacher Login Route
app.post('/api/teacher/login', async (req, res) => {
  const { username, password } = req.body;
  const result = await pool.query('SELECT * FROM teachers WHERE username=$1 AND password=$2', [username, password]);
  if (result.rows.length > 0) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Add Student Route
app.post('/api/students', async (req, res) => {
  const { name, roll_number, dob, course, year } = req.body;

  if (!name || !roll_number || !dob || !course || !year) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO students (name, roll_number, dob, course, year) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [name, roll_number, dob, course, year]
    );

    res.status(200).json({
      message: 'Student added successfully!',
      studentId: result.rows[0].id,
    });
  } catch (err) {
    console.error('Error adding student:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Student Login Route
app.post('/api/student/login', async (req, res) => {
  const { roll_number, dob } = req.body;

  if (!roll_number || !dob) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    // Query to match student by roll number and date of birth
    const result = await pool.query(
      'SELECT * FROM students WHERE roll_number = $1 AND dob = $2',
      [roll_number, dob]
    );

    if (result.rows.length > 0) {
      // Return student data if credentials match
      res.json({ student: result.rows[0] });
    } else {
      // Invalid credentials
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Exam Form Submission Route
app.post('/api/exam-form', async (req, res) => {
  const { roll_number, registration_number, exam_name, semester, exam_type, department, subjects, gmail } = req.body;

  if (!roll_number || !registration_number || !exam_name || !semester || !exam_type || !department || !subjects || !gmail || subjects.length === 0) {
    return res.status(400).json({ message: 'All fields are required including subjects' });
  }

  try {
    await pool.query(
      `INSERT INTO exam_forms 
       (roll_number, registration_number, exam_name, semester, exam_type, department, subjects, gmail) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [roll_number, registration_number, exam_name, semester, exam_type, department, subjects, gmail]
    );
    

    res.status(200).json({ message: 'Exam form submitted successfully!' });
  } catch (err) {
    console.error('Error submitting exam form:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get All Submitted Forms Route
app.get('/api/submitted-forms', async (req, res) => {
  try {
    const formsResult = await pool.query('SELECT * FROM exam_forms ORDER BY submitted_at DESC');
    res.json(formsResult.rows);
  } catch (err) {
    console.error('Error fetching submitted forms:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send Approval Email Route

console.log('📩 /api/send-approval-email route is active');

app.post('/api/send-approval-email', async (req, res) => {
  const { email, exam_name, roll_number, registration_number, semester, department, exam_type, subjects } = req.body;

  const pdfPath = `./form_${roll_number}.pdf`;

  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(18).text('Exam Form Approval', { align: 'center' });
  doc.moveDown(2);

  const tableTop = 150;
  const rowHeight = 30;
  const col1X = 50;
  const col1Width = 150;
  const col2X = col1X + col1Width;
  const col2Width = 300;

  const rows = [
    ['Roll Number', roll_number || 'N/A'],
    ['Registration Number', registration_number || 'N/A'],
    ['Exam Name', exam_name || 'N/A'],
    ['Semester', semester || 'N/A'],
    ['Department', department || 'N/A'],
    ['Exam Type', exam_type || 'N/A'],
    ['Subjects', Array.isArray(subjects) ? subjects.join(', ') : 'N/A'],
  ];

  // Draw Header
  doc.fontSize(12)
    .text('Field', col1X + 5, tableTop + 8)
    .text('Value', col2X + 5, tableTop + 8);

  doc.lineWidth(1)
    .moveTo(col1X, tableTop)
    .lineTo(col1X + col1Width + col2Width, tableTop)
    .stroke();

  // Draw Rows
  rows.forEach((row, i) => {
    const y = tableTop + (i + 1) * rowHeight;

    // Draw borders
    doc.rect(col1X, y, col1Width, rowHeight).stroke();
    doc.rect(col2X, y, col2Width, rowHeight).stroke();

    // Insert text with vertical padding
    doc.text(row[0], col1X + 5, y + 8, { width: col1Width - 10 });
    doc.text(row[1], col2X + 5, y + 8, { width: col2Width - 10 });
  });

  doc.end();

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const mailOptions = {
      from: '"Exam Cell" <YOUR_EMAIL@gmail.com>',
      to: email,
      subject: '✅ Exam Form Approved',
      html: `
        <p>Your exam form for <strong>${exam_name}</strong> has been approved ✅.</p>
        <p>We've attached your form details as a PDF.</p>
        <br />
        <p>Regards,<br/>Exam Cell</p>
      `,
      attachments: [
        {
          filename: `ExamForm_${roll_number}.pdf`,
          path: pdfPath,
        },
      ],
    };

    console.log("PDF written at:", pdfPath);

    await transporter.sendMail(mailOptions);
    fs.unlinkSync(pdfPath);

    res.status(200).send('Email with PDF sent successfully');
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).send('Failed to send email');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
