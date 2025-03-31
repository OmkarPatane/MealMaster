/* eslint-disable no-constant-binary-expression */
import { useState, useEffect } from "react";
import { useCalendarData } from "../context/CalendarContext";
import "../styles/DailyPlan.css";

export const DailyPlan = () => {
  const formatDate = (date) => {
    // Create a new date with time set to noon to avoid timezone issues
    const adjustedDate = new Date(date);
    adjustedDate.setHours(12, 0, 0, 0);
    return adjustedDate.toDateString();
  };

  // Format date for input value (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    // Get year, month, and day components and create YYYY-MM-DD format
    const year = date.getFullYear();
    // Months are 0-indexed in JS, so add 1 and pad with leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const { calendarData } = useCalendarData();
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [inputDate, setInputDate] = useState(formatDateForInput(new Date()));
  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Update the input date whenever selected date changes
  useEffect(() => {
    setInputDate(formatDateForInput(new Date(selectedDate)));
  }, [selectedDate]);

  const filteredData = selectedDate
    ? calendarData.filter((item) => item.date === selectedDate)
    : [];

  console.log("filtered data:", filteredData);

  const categorizedData = filteredData.reduce(
    (acc, item) => {
      // Use item.mealType instead of item.mealtype (case sensitive)
      const mealType = item.mealType; // Changed from mealtype to mealType

      if (mealType === "Breakfast") acc.breakfast.push(item);
      else if (mealType === "Lunch") acc.lunch.push(item);
      else if (mealType === "Dinner") acc.dinner.push(item);
      else if (mealType === "Snack") acc.snack.push(item);
      else if (mealType === "Starter") acc.starter.push(item);

      return acc;
    },
    { breakfast: [], lunch: [], dinner: [], snack: [], starter:[]}
  );

  const openModal = (meal) => {
    setModalData(meal);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData(null);
  };

  const handleDateChange = (e) => {
    // Create a date from the input value and set hours to noon to avoid timezone issues
    const selectedDateValue = e.target.value;
    const date = new Date(selectedDateValue + "T12:00:00");

    setInputDate(selectedDateValue);
    setSelectedDate(formatDate(date));
  };

  return (
    <div className="daily-plan">
      {/* Calendar Section */}
      <div className="calendar-section">
        <h2>Select a Day</h2>
        <input
          type="date"
          className="calendar-input"
          value={inputDate}
          onChange={handleDateChange}
        />
      </div>

      <div className="data-div">
        {/* Plan Sections */}
        {["Breakfast", "Lunch", "Dinner", "Snack", "Starter"].map(
          (mealType) => (
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
          )
        )}
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
                <p>{`Ingredients: ${modalData.ingredients.join(", ")}`}</p>
                <p>{modalData.recipe || "No description available"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyPlan;
