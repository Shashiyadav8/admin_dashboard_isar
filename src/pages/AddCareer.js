// src/admin/pages/AddCareer.js
import React, { useState } from 'react';
import './AddCareer.css';

const AddCareer = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.description) {
      alert('Please fill in all fields.');
      return;
    }

    // Simulate local submission
    setMessage(`Job "${formData.jobTitle}" added successfully!`);

    // Reset form
    setFormData({
      jobTitle: '',
      description: '',
    });
  };

  return (
    <div className="add-career">
      <h1>Add Job Position</h1>

      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Enter job title"
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter job description"
            rows="5"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Add Job</button>
      </form>
    </div>
  );
};

export default AddCareer;
