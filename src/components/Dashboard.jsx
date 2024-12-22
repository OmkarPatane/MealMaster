// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Innermain } from "./innermain";
import { Navbar } from "./navbar";
import "../styles/dashboard.css";

const Dashboard = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
    // Check for the token in localStorage
    // const token = localStorage.getItem("authToken");

    // If token is not found, redirect to the login page
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);
  // This redirects the user if there's no token

  return (
    <div>
      {/* This will render the dashboard message if the token is available */}
      <Navbar />
      <Innermain />
      {/* <h1>This is the Dashboard</h1>
      <p>{token}</p> */}
    </div>
  );
};

export default Dashboard;
