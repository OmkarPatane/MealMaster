import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://mealplanner-backend-8v3d.onrender.com/api/login",
        // "https://backend1-ly8d.onrender.com/api/login",
        { email, password }
      );
      localStorage.setItem("authToken", response.data.token);
      // const myName= localStorage.setItem("UserName", response.data.name);
      // console.log("This is testing name: ",myName)
      
      navigate("/dashboard");
    } catch {
      // navigate("/dashboard"); 
      // chaneg this any how -----------------------------------------------CHANGE
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Dont have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
