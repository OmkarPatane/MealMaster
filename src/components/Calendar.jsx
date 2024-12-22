import { useEffect, useState } from "react";
import "../styles/calendar.css";
import { useCalendarData } from "../context/CalendarContext";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { calendarData, addToCalendar, removeFromCalendar } = useCalendarData();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    for (let i = firstDay.getDate(); i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDrop = (event, date) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    const { name, img, calories, mealType } = JSON.parse(data);

    addToCalendar(name, img, calories, mealType, date);
  };
  useEffect(() => {
    console.log(calendarData);
  }, [calendarData]);

  const handleRemove = (mealToRemove, day) => {
    removeFromCalendar(day, mealToRemove);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => (
          <div
            key={index}
            className="calendar-cell"
            onDrop={(e) => handleDrop(e, day.toDateString())}
            onDragOver={(e) => e.preventDefault()}
          >
            <div>{day.getDate()}</div>
            <div className="data">
              {calendarData
                .filter((item) => item.date === day.toDateString())
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="meal"
                    onClick={() => handleRemove(item, day.toDateString())} // Clicking on the meal will remove it
                  >
                    <img src={item.img} alt={item.name} />
                    <p>{item.name}</p>
                    {/* <p>{item.mealType} himanshu</p> */}
                    <p>{item.calories} cal</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
