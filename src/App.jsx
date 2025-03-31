import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import Dashboard from "./components/Dashboard";
import { MainPage } from "./components/mainPage";
import AdminDashboard from "./components/AdminPage";

const App = () => {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/adminPage" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
    // <Dashboard />
    // <Login/>
  );
};

export default App;
