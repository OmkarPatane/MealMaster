import React, { useState } from "react";
import { useCalendarData } from "../context/CalendarContext";
import "../styles/Dailyplan.css"

const DailyPlan = () => {
  const { calendarData } = useCalendarData();
  const [selectedDate, setSelectedDate] = useState(null);

  // Filter data based on selected date
  const filteredData = selectedDate
    ? calendarData.filter((item) => item.date === selectedDate)
    : [];

  // Categorize data into Breakfast, Lunch, and Dinner
  const categorizedData = filteredData.reduce(
    (acc, item) => {
      const { mealType } = item; // Assuming data includes `mealType` (Breakfast, Lunch, Dinner)
      if (mealType === "Breakfast") acc.breakfast.push(item);
      if (mealType === "Lunch") acc.lunch.push(item);
      if (mealType === "Dinner") acc.dinner.push(item);
      return acc;
    },
    { breakfast: [], lunch: [], dinner: [] }
  );

  return (
    <div className="daily-plan">
      {/* Calendar Section */}
      <div className="calendar-section">
        <h2>Select a Day</h2>
        <input
          type="date"
          className="calendar-input"
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Plan Sections */}
      <div className="plan-section">
        <h3>Breakfast</h3>
        <div className="meal-items">
          {categorizedData.breakfast.length > 0 ? (
            categorizedData.breakfast.map((item, index) => (
              <div key={index} className="meal-card">
                <img src={item.img} alt={item.name} className="meal-image" />
                <div className="meal-info">
                  <h4>{item.name}</h4>
                  <p>{item.calories} Calories</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items added for Breakfast.</p>
          )}
        </div>
      </div>

      <div className="plan-section">
        <h3>Lunch</h3>
        <div className="meal-items">
          {categorizedData.lunch.length > 0 ? (
            categorizedData.lunch.map((item, index) => (
              <div key={index} className="meal-card">
                <img src={item.img} alt={item.name} className="meal-image" />
                <div className="meal-info">
                  <h4>{item.name}</h4>
                  <p>{item.calories} Calories</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items added for Lunch.</p>
          )}
        </div>
      </div>

      <div className="plan-section">
        <h3>Dinner</h3>
        <div className="meal-items">
          {categorizedData.dinner.length > 0 ? (
            categorizedData.dinner.map((item, index) => (
              <div key={index} className="meal-card">
                <img src={item.img} alt={item.name} className="meal-image" />
                <div className="meal-info">
                  <h4>{item.name}</h4>
                  <p>{item.calories} Calories</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items added for Dinner.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyPlan;
