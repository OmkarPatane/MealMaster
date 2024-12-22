import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chart from './components/Chart';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import DailyPlan from './components/Dailyplan';

const App = () => {
    const [globalData, setGlobalData] = useState([]);

    useEffect(() => {
        // Override console.log to capture data
        const originalConsoleLog = console.log;

        console.log = (message) => {
            try {
                // Parse the JSON-like object and update globalData
                const parsedMessage = typeof message === 'string' ? JSON.parse(message) : message;
                if (parsedMessage.name && parsedMessage.calories && parsedMessage.date) {
                    setGlobalData((prevData) => [...prevData, parsedMessage]);
                }
            } catch (error) {
                // Handle non-JSON log messages
                originalConsoleLog(message);
            }
        };

        // Clean up to restore original console.log
        return () => {
            console.log = originalConsoleLog;
        };
    }, []);

    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Meal Master App</h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path='/dailypan' element={<DailyPlan/>}/>
                        {/* Route to display the chart */}
                        <Route path="/chart" element={<Chart globalData={globalData} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
