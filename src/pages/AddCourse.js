// src/admin/pages/AddCourse.js
import React, { useState } from 'react';
import './AddCourse.css';

const AddCourse = () => {
  const [formData, setFormData] = useState({
    courseName: '',
    description: '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // creates a live preview
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.courseName || !formData.description || !image) {
      alert('Please fill all fields and upload an image.');
      return;
    }

    // Simulate local submission
    setMessage(`Course "${formData.courseName}" added successfully!`);

    // Reset form
    setFormData({ courseName: '', description: '' });
    setImage(null);
    setPreview('');
  };

  return (
    <div className="add-course">
      <h1>Add New Course</h1>

      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Name</label>
          <input
            type="text"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Enter course name"
            required
          />
        </div>

        <div className="form-group">
          <label>Course Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter course description"
            rows="5"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Course Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Course Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
