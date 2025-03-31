import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/admin.css";
import { Navbar } from "./navbar";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recipesCount, setRecipesCount] = useState({});
  const role = localStorage.getItem("role"); // Assuming role is stored in localStorage

  useEffect(() => {
    axios
      .get("https://meal-planner-backend-0rkj.onrender.com/users") // Fetch users from API
      .then(async (response) => {
        setUsers(response.data);
        setTotalUsers(response.data.length);
        await fetchTotalRecipes(response.data); // Fetch recipes count for all users
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const fetchTotalRecipes = async (usersData) => {
    const counts = {};
    for (let user of usersData) {
      try {
        const response = await axios.get(
          `https://meal-planner-backend-0rkj.onrender.com/calendar/userRecipe/${user._id}`
        );
        counts[user._id] = response.data.length;
      } catch (error) {
        console.log(error)
        counts[user._id] = 0;
      }
    }
    setRecipesCount(counts);
  };

  if (role !== "admin") return null; // Hide the component if not an admin

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h2>Total Users: {totalUsers}</h2>
        </div>
        <div className="users-grid">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.name}</h3>
              <p>Total Recipes Planned: {recipesCount[user._id] || 0}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin;
