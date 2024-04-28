import React from 'react';
import { Link } from 'react-router-dom';
import abhayImage from '../components/Profile_Pics/abhay.jpg';
import prerakImage from '../components/Profile_Pics/prerak.jpeg';

const StudentInfo = () => {
  const profileStyle = {
    profile: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: '20px',
      background: '#f8f9fa',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
    },
    profileInfo: {
      textAlign: 'center',
    },
    aboutSection: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
  };

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

      {/* Profile Section */}
      <div className="row">
        <div className="col-md-6 profile" style={profileStyle.profile}>
          <img className="profile-image" src={abhayImage} alt="Abhay" style={profileStyle.profileImage} />
          <div style={profileStyle.profileInfo}>
            <h3>Abhay</h3>
            <p>Email: abhay14@iastate.edu</p>
          </div>
        </div>
        <div className="col-md-6 profile" style={profileStyle.profile}>
          <img className="profile-image" src={prerakImage} alt="Prerak" style={profileStyle.profileImage} />
          <div style={profileStyle.profileInfo}>
            <h3>Prerak</h3>
            <p>Email: prerak@iastate.edu</p>
          </div>
        </div>
      </div>

      {/* Project Section */}
      <div className="row">
        <div className="col-12">
          <div className="about-section" style={profileStyle.aboutSection}>
            <h2>MERN Assignment 3</h2>
            <p>This is our basic website for Assignment 3 showing our skills to link frontend with backend using mongodb,express,react,javascript,nodejs etc., hence displaying our Full Stack Web Development </p>
            <p>Hope you liked our website! Reach out to us if you have any questoins.</p>
            <p><strong>Course:</strong> COMS 319 - CONSTRUCTION OF USER INTERFACES<br />
            <strong>Professor:</strong> Professor Abraham Aldaco<br />
            <strong>Date:</strong> April 27, 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;
