import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeacherRegister from './pages/TeacherRegister';
import TeacherLogin from './pages/TeacherLogin';
import AddStudent from './pages/AddStudent';
import StudentLogin from './pages/StudentLogin';
import ExamForm from './pages/ExamForm';  // Import ExamForm
import SubmittedForms from './pages/SubmittedForms';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import MainDashboard from './pages/MainDashboard';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainDashboard />} />
        <Route path="/login" element={<TeacherLogin />} />
        <Route path="/register" element={<TeacherRegister />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/exam-form" element={<ExamForm />} />  {/* Added route for ExamForm */}
        <Route path="/submitted-forms" element={<SubmittedForms />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard rollNumber="AIT123" />} />
      </Routes>
    </Router>
  );
}

export default App;
