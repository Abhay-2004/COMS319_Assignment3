import React from 'react';
import { Link } from 'react-router-dom';

const StudentInfo = () => {
  return (
    <div className="container">
      <h2>Student Information</h2>
      <div className="mb-3">
        <Link to="/" className="btn btn-primary mr-2">
          Home
        </Link>
        <Link to="/create" className="btn btn-primary mr-2">
          Add Product
        </Link>
        <Link to="/info" className="btn btn-primary">
          Student Information
        </Link>
      </div>
      {/* Display student information, course details, and project introduction */}
    </div>
  );
};

export default StudentInfo;