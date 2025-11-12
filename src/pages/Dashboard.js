import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {
  const [coursesCount, setCoursesCount] = useState(0);
  const [careersCount, setCareersCount] = useState(0);
  const [courseApplicantsCount, setCourseApplicantsCount] = useState(0);
  const [careerApplicantsCount, setCareerApplicantsCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await axios.get(`${API_BASE_URL}/courses`);
        setCoursesCount(coursesRes.data.length);

        const careersRes = await axios.get(`${API_BASE_URL}/careers`);
        setCareersCount(careersRes.data.length);

        const courseApplicantsRes = await axios.get(`${API_BASE_URL}/course-applicants`);
        setCourseApplicantsCount(courseApplicantsRes.data.length);

        const careerApplicantsRes = await axios.get(`${API_BASE_URL}/career-applicants`);
        setCareerApplicantsCount(careerApplicantsRes.data.length);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats">
        <div className="stat">
          <h2>Courses Available</h2>
          <p>{coursesCount}</p>
        </div>
        <div className="stat">
          <h2>Job Positions</h2>
          <p>{careersCount}</p>
        </div>
        <div className="stat">
          <h2>Course Registrations</h2>
          <p>{courseApplicantsCount}</p>
        </div>
        <div className="stat">
          <h2>Job Applications</h2>
          <p>{careerApplicantsCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
