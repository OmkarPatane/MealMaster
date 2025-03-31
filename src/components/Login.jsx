import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://meal-planner-backend-0rkj.onrender.com/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("UserName", response.data.name);
      localStorage.setItem("role", response.data.role);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 401) {
          setErrorMessage(
            error.response.data.message || "Invalid email or password."
          );
        } else if (error.response.status === 404) {
          setErrorMessage("User not found");
        } else {
          setErrorMessage("An unexpected error occurred.");
        }
      } else {
        setErrorMessage("Failed to connect to the server.");
      }
    } finally {
      setLoading(false); // Stop loading
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
          autoComplete={password}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Dont have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
