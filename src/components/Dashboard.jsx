import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Innermain } from "./innermain";
import { Navbar } from "./navbar";
import "../styles/dashboard.css";
import { AI_Bot } from "./AI_Bot";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Innermain />
      <AI_Bot/>
      
      {/* <p>{token}</p> */}
    </div>
  );
};

export default Dashboard;
