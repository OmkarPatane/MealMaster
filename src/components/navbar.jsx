import "../styles/navbar.css";
import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/UserContext";
export const Navbar = () => {
  // const { name } = useUser();
  const navigate = useNavigate();
  let name = localStorage.getItem("UserName");
  let role = localStorage.getItem("role");
  console.log(role)
  name = name ? name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() : "";
  // setName(localStorage.getItem("UserName"))
  // console.log(localStorage.getItem("Username"))
  // setName(localStorage.getItem("UserName"));

  function handleClick() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("UserName");
    navigate("/");

    // setName("")
    // This redirects the user if click
  }

  function AdminhandleClick() {
    navigate("/adminPage");
  }

  return (
    <div className="navbar">
      <img src="https://ik.imagekit.io/m9qnay09g/Meal-4.png" alt="" />

      <div className="leftv">
        <div className="left-div">
          <h3>{name}</h3>
        </div>

        <div className=" user">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUNJREFUSEu1lYFtwzAMBN+bpJMk2aSdJM0kaSZJO0nbSdJcIBk0TdFygxAwZMAyn/p/UoOeHMOT86sHYCeJZ1vWn9v6Kem3rLw3IwPYSDqVpFkOAPeSWGfRAngtyXsZJPn5tvnd/xABrE1ucx49iAeAlu/esoN9M7o8wCXhvFZHEZzy0CgE0dHkHhYgo+ZN0odLmO0H4O4uC4BArapeApdkdI5aWAAsSVVRRADsuy7RZAEQl6qimLmjFENRUSA2RU0oygCsz5dEnuhrT5A5aK1zMQTG6BaZE9SngrX04nsoMgONU/iILMoeqOKfSIfxn6VGG/2ccOTt2my0WpUdFemkLKfwE3di6Z5hV+f/V+1OQ49vzNmJW+M66+oWW1GvpDda74UD54i66sKxVeIUwOqVyTeSVcr+fWWuba5wf8+l/xDQH/+ESxlufBg7AAAAAElFTkSuQmCC" />
        </div>

        {role === "admin" ? (
          <>
            <hr />

            <div>
              <button
                style={{
                  borderRadius: "10px",
                  padding: "8px",
                  background: "skyblue",
                  border: "none",
                }}
                onClick={() => AdminhandleClick()}
              >
                Admin Panel
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        <hr />
        <button onClick={handleClick} className="logoutbtn">
          Logout
        </button>
      </div>
    </div>
  );
};
