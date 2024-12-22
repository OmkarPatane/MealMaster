import { useState } from "react";
import { useCalendarData } from "../context/CalendarContext";
import "../styles/DailyPlan.css";

export const DailyPlan = () => {
  const formatDate = (date) => {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    ).toDateString();
  };

  const { calendarData } = useCalendarData();
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [modalData, setModalData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const filteredData = selectedDate
    ? calendarData.filter((item) => item.date === selectedDate)
    : [];

  const categorizedData = filteredData.reduce(
    (acc, item) => {
      const { mealtype } = item;
      if (mealtype === "Breakfast") acc.breakfast.push(item);
      if (mealtype === "Lunch") acc.lunch.push(item);
      if (mealtype === "Dinner") acc.dinner.push(item);
      return acc;
    },
    { breakfast: [], lunch: [], dinner: [] }
  );

  const openModal = (meal) => {
    setModalData(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  return (
    <div className="daily-plan">
      {/* Calendar Section */}
      <div className="calendar-section">
        <h2>Select a Day</h2>
        <input
          type="date"
          className="calendar-input"
          value={new Date(selectedDate).toISOString().split("T")[0]} // Convert to YYYY-MM-DD for the input
          onChange={(e) => {
            const selectedDateFormatted = formatDate(new Date(e.target.value));
            setSelectedDate(selectedDateFormatted);
          }}
        />
      </div>

      <div className="data-div">
        {/* Plan Sections */}
        {["Breakfast", "Lunch", "Dinner"].map((mealType) => (
          <div className="plan-section" key={mealType}>
            <h3>{mealType}</h3>
            <div className="meal-items">
              {categorizedData[mealType.toLowerCase()].length > 0 ? (
                categorizedData[mealType.toLowerCase()].map((item, index) => (
                  <div
                    key={index}
                    className="meal-card"
                    onClick={() => openModal(item)} 
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="meal-image"
                    />
                    <div className="meal-info">
                      <h4>{item.name}</h4>
                      <p>{item.calories} Calories</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items added for {mealType}.</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for displaying selected meal data */}
      {isModalOpen && modalData && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <div className="modal-content">
              <img
                src={modalData.img}
                alt={modalData.name}
                className="modal-meal-image"
              />
              <div className="modal-meal-info">
                <h4>{modalData.name}</h4>
                <p>{modalData.calories} Calories</p>
                <p>{modalData.mealType}</p>
                <p>{modalData.description || "No description available"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyPlan;
