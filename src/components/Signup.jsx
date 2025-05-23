import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext"; // Import the custom hook
import "../styles/Signup.css";

const SignUp = () => {
  // const { setName } = useUser(); // Access the setName function from context
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    setIsLoading(true);

    try {
      const response= await axios.post(
        "https://meal-planner-backend-0rkj.onrender.com/register",
        {
          // await axios.post("https://mealplanner-backend-8v3d.onrender.com/api/register", {
          // await axios.post("https://backend1-ly8d.onrender.com/api/register", {
          name,
          email,
          password,
        }
      );
      navigate("/login");
      console.log(response.data)
      setErrorMessage("");
      // setName(name); // Save the name in the context
      navigate("/login");
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete={confirmPassword}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
