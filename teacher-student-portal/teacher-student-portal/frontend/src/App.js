import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeacherRegister from './pages/TeacherRegister';
import TeacherLogin from './pages/TeacherLogin';
import AddStudent from './pages/AddStudent';
import StudentLogin from './pages/StudentLogin';
import ExamForm from './pages/ExamForm';  // Import ExamForm
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<TeacherLogin />} />
        <Route path="/register" element={<TeacherRegister />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/exam-form" element={<ExamForm />} />  {/* Added route for ExamForm */}
      </Routes>
    </Router>
  );
}

export default App;
