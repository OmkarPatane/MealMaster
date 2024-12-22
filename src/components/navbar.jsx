import "../styles/navbar.css";
import { useNavigate} from "react-router-dom";
export const Navbar = () => {
  const navigate = useNavigate();
  function handleClick() {
    localStorage.removeItem('authToken');
    navigate("/login"); 
    // This redirects the user if click
     

  }

  return (
    <div className="navbar">
      <img src="https://ik.imagekit.io/m9qnay09g/Meal-4.png" alt="" />

      <div className="leftv">
        <div className="left-div">
          <h3>Himanshu</h3>
        </div>
        <div className=" user">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUNJREFUSEu1lYFtwzAMBN+bpJMk2aSdJM0kaSZJO0nbSdJcIBk0TdFygxAwZMAyn/p/UoOeHMOT86sHYCeJZ1vWn9v6Kem3rLw3IwPYSDqVpFkOAPeSWGfRAngtyXsZJPn5tvnd/xABrE1ucx49iAeAlu/esoN9M7o8wCXhvFZHEZzy0CgE0dHkHhYgo+ZN0odLmO0H4O4uC4BArapeApdkdI5aWAAsSVVRRADsuy7RZAEQl6qimLmjFENRUSA2RU0oygCsz5dEnuhrT5A5aK1zMQTG6BaZE9SngrX04nsoMgONU/iILMoeqOKfSIfxn6VGG/2ccOTt2my0WpUdFemkLKfwE3di6Z5hV+f/V+1OQ49vzNmJW+M66+oWW1GvpDda74UD54i66sKxVeIUwOqVyTeSVcr+fWWuba5wf8+l/xDQH/+ESxlufBg7AAAAAElFTkSuQmCC" />
        </div>
        <hr />
        <button onClick={handleClick} className="logoutbtn">
          Logout
        </button>
      </div>
    </div>
  );
};
