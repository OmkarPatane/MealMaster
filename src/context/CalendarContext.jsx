import { useState, useEffect } from "react";
import axios from "axios";

export const useCalendarData = () => {
  const [calendarData, setCalendarData] = useState([]);

  // ✅ Fetch User's Calendar Data from Backend
  const fetchCalendarData = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://meal-planner-backend-0rkj.onrender.com/calendar/",
        {
          headers: { token }, // Sending token in headers
        }
      );
      setCalendarData(response.data);
    } catch (error) {
      console.error("Error fetching calendar data:", error);
    }
  };

  useEffect(() => {
    fetchCalendarData(); // Fetch data when component mounts
  }, []);

  // ✅ Add Meal to Calendar (API Call)
  const addToCalendar = async (name, img, calories, mealType, date, recipe, ingredients) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "https://meal-planner-backend-0rkj.onrender.com/calendar/add",
        { name, img, calories, mealType, date, recipe, ingredients },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchCalendarData(); // Refresh calendar after adding
      }
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  // ✅ Remove Meal from Calendar (API Call)
  const removeFromCalendar = async (mealId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `https://meal-planner-backend-0rkj.onrender.com/calendar/${mealId}`,
        {
          headers: { token },
        }
      );
      fetchCalendarData(); // Refresh calendar after removing
    } catch (error) {
      console.error("Error removing meal:", error);
    }
  };

  return { calendarData, addToCalendar, removeFromCalendar };
};
