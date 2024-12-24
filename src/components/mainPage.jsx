// import { useEffect } from "react";
import "../styles/mainPage.css";
import { useNavigate } from "react-router-dom";

export const MainPage = () => {
  const navigate = useNavigate();

  

  const handleAboutClick = () => {
    document
      .getElementById("about-section")
      
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="main-navbar">
        <div className="navbar-logo">Meal Planner</div>
        <div className="navbar-buuttons">
          <button className="navbar-buutton" onClick={handleLoginClick}>
            Login
          </button>
          <button className="navbar-buutton" onClick={handleAboutClick}>
            About
          </button>
        </div>
      </nav>

      <div
        className="main-section"
        id="intro-section"
        style={{
          backgroundImage:
            "url(https://ik.imagekit.io/d5ik6mphn/pexels-hasan-kurt-154798938-10749578.jpg?updatedAt=1734899142501)",
        }}
      >
        <div className="section-content left-aligned">
          <div className="section-title">Meal Planner</div>
          <div className="section-description">
            Transform Every Meal into a Masterpiece Plan Smart,
            <br /> Eat Healthy, Live Happy with Meal Master
          </div>
        </div>
      </div>

      <div
        className="main-section"
        id="about-section"
        style={{
          backgroundImage:
            "url(https://ik.imagekit.io/d5ik6mphn/pexels-content-prod-co-5701880.jpg?updatedAt=1734899911285)",
        }}
      >
        <div className="section-content">
          <div className="section-title">About Us</div>
          <div className="section-description short-text">
            Welcome to MealMaster App, your ultimate companion for healthy and
            hassle-free meal planning. In today’s fast-paced world, maintaining
            a balanced diet can feel like an uphill battle.
            <br />
            Whether you are striving for weight loss, muscle gain, or simply a
            healthier lifestyle, MealMaster is here to make your journey easier.
            Our app combines technology and personalized nutrition to help you
            create tailored meal plans, track your daily intake, and achieve
            your fitness goals effortlessly.
          </div>
        </div>
      </div>

      <div className="main-section video-section" id="video-section">
        <video autoPlay loop muted>
          <source
            src="https://ik.imagekit.io/d5ik6mphn/darkvideo.mp4?updatedAt=1734899444041"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="section-content">
          <div className="section-title">
            🍴 Transform Every Meal into a Masterpiece – Plan Smart, Eat
            Healthy, Live Happy with Meal Master! 🌟
          </div>
        </div>
      </div>
    </>
  );
};
