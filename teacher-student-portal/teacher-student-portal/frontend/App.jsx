import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeacherRegister from './src/pages/TeacherRegister';
import TeacherLogin from './src/pages/TeacherLogin';
import AddStudent from './src/pages/AddStudent';
import StudentLogin from './src/pages/StudentLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeacherLogin />} />
        <Route path="/teacher-register" element={<TeacherRegister />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/student-login" element={<StudentLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
