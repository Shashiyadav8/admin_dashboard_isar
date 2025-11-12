import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
// import { FaHome, FaUserTie, FaBookOpen, FaImages, FaClipboardList, FaUserGraduate } from 'react-icons/fa'; // Optionally uncomment if using react-icons

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="hamburger" onClick={handleToggle}>
        ☰
      </div>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="profile-section">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg" // Replace with user's image
            alt="Profile"
            className="profile-img"
          />
          <div className="profile-details">
            <div className="profile-name">Vando Da Cruz</div>
            <div className="profile-email">vando.dacruz@example.com</div>
          </div>
        </div>

        <h2>ISAR Admin</h2>

        <div className="sidebar-content">
          <ul className="nav-links">
            <li><Link to="/dashboard" onClick={handleLinkClick}>Dashboard</Link></li>
            <li><Link to="/AddCareer" onClick={handleLinkClick}>AddCareer</Link></li>
            <li><Link to="/AddCourse" onClick={handleLinkClick}>AddCourse</Link></li>
            <li><Link to="/AddGallery" onClick={handleLinkClick}>AddGallery</Link></li>
            <li><Link to="/CareerApplicants" onClick={handleLinkClick}>CareerApplicants</Link></li>
            <li><Link to="/CourseApplicants" onClick={handleLinkClick}>CourseApplicants</Link></li>
            <li><Link to="/ContactRequestsTable" onClick={handleLinkClick}>ContactRequest</Link></li>
          </ul>
          <ul className="bottom-links">
            <li><button onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
