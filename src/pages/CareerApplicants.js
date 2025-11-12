import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CareerApplicants.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ApplicantsTable = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/applications`);
      setApplicants(res.data);
    } catch (err) {
      console.error('Error fetching applicants:', err);
    }
  };

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
    const header = ['Job ID', 'Full Name', 'Email', 'Phone', 'Experience', 'Date of Birth', 'Availability', 'Skills', 'Queries', 'Resume URL'];
    const rows = filteredApplicants.map(applicant => [
      applicant.jobId || '-',
      applicant.fullName,
      applicant.email,
      applicant.phone,
      applicant.experience,
      formatDate(applicant.dob),
      formatDate(applicant.availability),
      applicant.skills || '-',
      applicant.queries || '-',
      applicant.resumeUrl || '-'
    ]);
    const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'job_applicants.csv';
    a.click();
  };

  const filteredApplicants = applicants.filter(applicant =>
    (applicant.fullName && applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (applicant.email && applicant.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (applicant.phone && applicant.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (applicant.jobId && applicant.jobId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (applicant.skills && applicant.skills.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Delete logic
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this applicant?")) {
      try {
        await axios.delete(`${API_BASE_URL}/applications/${id}`);
        setApplicants(applicants.filter(app => app._id !== id));
      } catch (err) {
        console.error('Error deleting applicant:', err);
      }
    }
  };

  return (
    <div className="applicants-table-page">
      <h1>Job Applicants</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name, email, phone, job ID or skills"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleExportCSV}>Export CSV</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>EXP</th>
            <th>Date of Birth</th>
            
            <th>Skills</th>
            <th>Queries</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplicants.length === 0 ? (
            <tr>
              <td colSpan="11" style={{ textAlign: 'center' }}>No applicants found.</td>
            </tr>
          ) : (
            filteredApplicants.map(applicant => (
              <tr key={applicant._id}>
                <td data-label="Job ID">{applicant.jobId || '-'}</td>
                <td data-label="Full Name">{applicant.fullName}</td>
                <td data-label="Email">{applicant.email}</td>
                <td data-label="Phone">{applicant.phone}</td>
                <td data-label="Experience">{applicant.experience}</td>
                <td data-label="Date of Birth">{formatDate(applicant.dob)}</td>
                <td data-label="Skills">{applicant.skills || '-'}</td>
                <td data-label="Queries">{applicant.queries || '-'}</td>
                <td data-label="Resume">
  {applicant.resumeUrl ? (
    <a
      href={`http://localhost:5000/${applicant.resumeUrl}`}
      target="_blank"
      rel="noopener noreferrer"
      className="view-resume-btn"
    >
      View Resume
    </a>
  ) : (
    '-'
  )}
</td>
<td>
  <button
    className="delete-btn"
    onClick={() => handleDelete(applicant._id)}
  >
    Delete
  </button>
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
