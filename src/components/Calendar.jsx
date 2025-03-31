import { useEffect, useState } from "react";
import "../styles/calendar.css";
import { useCalendarData } from "../context/CalendarContext";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date().setHours(0, 0, 0, 0);
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
    const { name, img, calories, mealType, recipe, ingredients } =
      JSON.parse(data);

    addToCalendar(name, img, calories, mealType, date, recipe, ingredients);
  };

  useEffect(() => {
    console.log(calendarData);
  }, [calendarData]);

  const handleRemove = (id) => {
    removeFromCalendar(id);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>
          {currentDate.toLocaleString("default", { month: "long" })}
          {currentDate.getFullYear()}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          const isPastDate = day.setHours(0, 0, 0, 0) < today;
          return (
            <div
              key={index}
              className={`calendar-cell ${
                day < new Date().setHours(0, 0, 0, 0) ? "past-date" : ""
              }`}
              onDrop={(e) => {
                if (day >= new Date().setHours(0, 0, 0, 0))
                  handleDrop(e, day.toDateString());
              }}
              onDragOver={(e) => {
                if (day >= new Date().setHours(0, 0, 0, 0)) e.preventDefault();
              }}
            >
              <div>{day.getDate()}</div>
              <div className="data">
                {calendarData
                  .filter((item) => item.date === day.toDateString())
                  .map((item, idx) => (
                    <div
                      key={idx}
                      className="meal"
                      onClick={
                        !isPastDate ? () => handleRemove(item._id) : undefined
                      }
                    >
                      <img src={item.img} alt={item.name} />
                      <p>{item.name}</p>
                      {/* <p>{item.calories} cal</p> */}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
