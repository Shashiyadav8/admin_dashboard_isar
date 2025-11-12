import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CourseApplicants.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/enrollments`);
      setApplicants(res.data);
    } catch (err) {
      console.error('Error fetching applicants:', err);
    }
  };

  const filteredApplicants = applicants.filter(applicant => {
    const fullName = `${applicant.firstName} ${applicant.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      (applicant.email && applicant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (applicant.phone && applicant.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (applicant.courseName && applicant.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleExportCSV = () => {
    const header = ['ID', 'Name', 'Email', 'Phone', 'Course Name', 'Date of Birth', 'Message'];

    const rows = filteredApplicants.map(applicant => [
      applicant._id,
      `${applicant.firstName} ${applicant.lastName}`,
      applicant.email,
      applicant.phone,
      applicant.courseName,
      formatDate(applicant.dob),
      applicant.interestReason || '-'
    ]);

    const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'course_applicants.csv';
    a.click();
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this applicant?")) {
      try {
        await axios.delete(`${API_BASE_URL}/enrollments/${id}`);
        setApplicants(applicants.filter(app => app._id !== id));
      } catch (err) {
        console.error('Error deleting applicant:', err);
      }
    }
  };

  return (
    <div className="applicants-table-page">
      <h1>Course Applicants</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name, email, phone or course name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExportCSV}>Export CSV</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Course Name</th>
            <th>Date of Birth</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No applicants found.</td>
            </tr>
          ) : (
            filteredApplicants.map(applicant => (
              <tr key={applicant._id}>
                <td>{applicant._id}</td>
                <td>{`${applicant.firstName} ${applicant.lastName}`}</td>
                <td>{applicant.email}</td>
                <td>{applicant.phone}</td>
                <td>{applicant.courseName}</td>
                <td>{formatDate(applicant.dob)}</td>
                <td>{applicant.interestReason || '-'}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(applicant._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTable;
