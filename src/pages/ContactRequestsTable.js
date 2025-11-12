import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactRequests.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ContactRequestsTable = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/contact`);
      setRequests(res.data);
    } catch (err) {
      console.error('Error fetching contact requests:', err);
    }
  };

  const filteredRequests = requests.filter(request => {
    return (
      (request.name && request.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.email && request.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.phone && request.phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.enquiryFor && request.enquiryFor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (request.message && request.message.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleExportCSV = () => {
    const header = ['ID', 'Name', 'Email', 'Phone', 'Enquiry For', 'Message', 'Date'];

    const rows = filteredRequests.map(req => [
      req._id,
      req.name,
      req.email,
      req.phone || '-',
      req.enquiryFor,
      req.message || '-',
      formatDate(req.createdAt)
    ]);

    const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'contact_requests.csv';
    a.click();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact request?")) {
      try {
        await axios.delete(`${API_BASE_URL}/contact/${id}`);
        setRequests(requests.filter(req => req._id !== id));
      } catch (err) {
        console.error('Error deleting contact request:', err);
      }
    }
  };

  return (
    <div className="contact-requests-table-page">
      <h1>Contact Requests</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name, email, phone, enquiry or message"
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
            <th>Enquiry For</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>No requests found.</td>
            </tr>
          ) : (
            filteredRequests.map(req => (
              <tr key={req._id}>
                <td>{req._id}</td>
                <td>{req.name}</td>
                <td>{req.email}</td>
                <td>{req.phone || '-'}</td>
                <td>{req.enquiryFor}</td>
                <td>{req.message || '-'}</td>
                <td>{formatDate(req.createdAt)}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(req._id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ContactRequestsTable;
