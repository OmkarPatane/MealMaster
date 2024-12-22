import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check for the token in localStorage
    const token = localStorage.getItem('authToken');
    
    // If token is not found, redirect to the login page
    if (!token) {
      navigate('/login'); // This redirects the user if there's no token
    }
  }, [navigate]);

  return (
    <div>
      {/* This will render the dashboard message if the token is available */}
      <h1>This is the Dashboard</h1>
      <p>{token}</p>
    </div>
  );
};

export default Dashboard;
