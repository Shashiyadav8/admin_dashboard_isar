// src/admin/pages/AddGallery.js
import React, { useState } from 'react';
import './AddGallery.css';

const AddGallery = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [caption, setCaption] = useState('');
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // create live preview
      setMessage('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !caption) {
      alert('Please select an image and add a caption.');
      return;
    }

    // Simulate upload success (no backend yet)
    setMessage(`Image "${caption}" uploaded successfully!`);

    // Reset form
    setImage(null);
    setPreview('');
    setCaption('');
    e.target.reset();
  };

  return (
    <div className="add-gallery">
      <h1>Add Gallery Image</h1>

      {message && <p className="success-message">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <div className="form-group">
          <label>Image Caption</label>
          <input
            type="text"
            placeholder="Enter image caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add to Gallery</button>
      </form>
    </div>
  );
};

export default AddGallery;
