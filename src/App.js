import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddCareer from './pages/AddCareer';
import AddCourse from './pages/AddCourse';
import AddGallery from './pages/AddGallery';
import CareerApplicants from './pages/CareerApplicants';
import CourseApplicants from './pages/CourseApplicants';
import Layout from './components/Layout';
import ContactRequestsTable from './pages/ContactRequestsTable';




function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Private routes with Sidebar */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/AddCareer"
          element={
            <Layout>
              <AddCareer />
            </Layout>
          }
        />
        <Route
          path="/AddCourse"
          element={
            <Layout>
              <AddCourse />
            </Layout>
          }
        />
        <Route
          path="/AddGallery"
          element={
            <Layout>
              <AddGallery />
            </Layout>
          }
        />
        <Route
          path="/CareerApplicants"
          element={
            <Layout>
              <CareerApplicants />
            </Layout>
          }
        /> 
        <Route
          path="/CourseApplicants"
          element={
            <Layout>
              <CourseApplicants />
            </Layout>
          }
        /> 
                <Route
          path="/ContactRequestsTable"
          element={
            <Layout>
              <ContactRequestsTable />
            </Layout>
          }
        /> 
        
      </Routes>
    </Router>
  );
}

export default App;
