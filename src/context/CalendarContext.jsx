import { useState, useEffect } from "react";

export const useCalendarData = () => {
  // Load initial data from localStorage or initialize an empty array
  const [calendarData, setCalendarData] = useState(() => {
    const storedData = localStorage.getItem("calendarData");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Save calendarData to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("calendarData", JSON.stringify(calendarData));
  }, [calendarData]);

  const addToCalendar = (name, img, calories, mealtype, date) => {
    setCalendarData((prevData) => [
      ...prevData,
      { name, img, calories, mealtype, date },
    ]);
  };

  const removeFromCalendar = (date, mealToRemove) => {
    setCalendarData((prevData) => {
      return prevData.filter(
        (item) =>
          !(
            item.date === date &&
            item.name === mealToRemove.name &&
            item.img === mealToRemove.img &&
            item.calories === mealToRemove.calories &&
            item.mealtype === mealToRemove.mealtype
          )
      );
    });
  };

  return { calendarData, addToCalendar, removeFromCalendar };
};
