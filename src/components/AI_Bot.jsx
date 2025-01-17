import { useState } from "react";
import axios from "axios";
import { marked } from "marked";
import { useCalendarData } from "../context/CalendarContext";
import "../styles/bot.css";

export const AI_Bot = () => {
  const { calendarData } = useCalendarData();
  const [response, setResponse] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleContentBox = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = () => {
    setInputValue("");

    const payload = {
      prompt: `${inputValue} Here are the meals: ${calendarData
        .map(
          (meal) =>
            `id: ${meal.id}, name: ${meal.name}, calories: ${meal.calories}, date: ${meal.date}`
        )
        .join("; ")}.`,
    };

    console.log(payload);
    axios
      .post("https://ai-3bal.onrender.com/res", payload)
      .then((res) => {
        const formattedResponse = marked(res.data);
        setResponse(formattedResponse);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {/* Floating Button */}
      <button className="floating-button" onClick={toggleContentBox}>
        <img
          src="https://cdn.dribbble.com/users/42048/screenshots/8350927/media/23289b76ac7353ad4f0d0619ce6e9f2d.gif"
          alt="Animated GIF"
        />
      </button>

      {/* Content Box */}
      <div className={`content-box ${isActive ? "active" : ""}`}>
        <h2>{response ? "Mea Responded" : "Hi i am Mea, I  am your Personal AI:"}</h2>
        <p
          className="response-text"
          dangerouslySetInnerHTML={{ __html: response }}
        ></p>
        <div className="input-btn">
          <input
            type="text"
            placeholder="Enter something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </>
  );
};
