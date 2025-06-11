import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SubmittedForms() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/submitted-forms');
        const formsWithApproval = response.data.map(form => ({
          ...form,
          approved: false  // Initial state
        }));
        setForms(formsWithApproval);
      } catch (err) {
        console.error('Error fetching submitted forms:', err);
      }
    };

    fetchForms();
  }, []);

  const handleApprove = async (formId) => {
    const approvedForm = forms.find(f => f.id === formId);
  
    if (!approvedForm) {
      alert("Form not found");
      return;
    }
  
    try {
      await axios.post('http://localhost:5000/api/send-approval-email', {
        email: approvedForm.gmail,
        name: approvedForm.name || "Student", // Add name if available
        exam_name: approvedForm.exam_name,
        roll_number: approvedForm.roll_number,
        registration_number: approvedForm.registration_number,
        semester: approvedForm.semester,
        department: approvedForm.department,
        exam_type: approvedForm.exam_type,
        subjects: approvedForm.subjects, // should be an array
      });
  
      setForms(prevForms =>
        prevForms.map(form =>
          form.id === formId ? { ...form, approved: true } : form
        )
      );
  
      alert('✅ Email sent and form approved');
    } catch (err) {
      console.error('Email error:', err.response?.data || err.message);
      alert('❌ Failed to send email');
    }
  };
  
  

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-success">📋 Submitted Exam Forms</h2>

      {forms.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Roll Number</th>
                <th>Registration Number</th>
                <th>Exam Name</th>
                <th>Semester</th>
                <th>Exam Type</th>
                <th>Department</th>
                <th>Subjects</th>
                <th>gmail</th>
                <th>Submitted At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form.id}>
                  <td>{form.roll_number}</td>
                  <td>{form.registration_number}</td>
                  <td>{form.exam_name}</td>
                  <td>{form.semester}</td>
                  <td>{form.exam_type}</td>
                  <td>{form.department}</td>
                  <td>
                    <ul className="mb-0">
                      {form.subjects && form.subjects.length > 0 ? (
                        form.subjects.map((subj, index) => (
                          <li key={index}>{subj}</li>
                        ))
                      ) : (
                        <li>No subjects listed</li>
                      )}
                    </ul>
                  </td>
                  <td>{form.gmail}</td>
                  <td>{new Date(form.submitted_at).toLocaleString()}</td>
                  <td>
                    <button
                      className={`btn ${form.approved ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => handleApprove(form.id)}
                      disabled={form.approved}
                    >
                      {form.approved ? 'Approved' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
