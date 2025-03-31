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
  const [isLoading, setIsLoading] = useState(false);

  const toggleContentBox = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setInputValue("");

    const payload = {
      prompt: `${inputValue} ask what can i do for you  as sugegstions predefiend 2 or 3 then give short ans  and    Here are the meals: ${calendarData
        .map(
          (meal) =>
            ` name: ${meal.name}, calories: ${meal.calories}, date: ${meal.date}`
        )
        .join("; ")}.`,
    };

    console.log(payload);
    axios
      .post("https://custom-ai-th78.onrender.com/res", payload)
      .then((res) => {
        const formattedResponse = marked(res.data);
        setResponse(formattedResponse);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
        setResponse("<p>Sorry, I couldn't process your request right now.</p>");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
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
        <div className="bot-header">
          <h2>
            {response ? "Mea Responded" : "Hi I am Mea, your Personal AI:"}
          </h2>
          <button className="close-btn" onClick={toggleContentBox}>
            ×
          </button>
        </div>

        <div className="response-container">
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Thinking...</p>
            </div>
          ) : (
            <div
              className="response-text"
              dangerouslySetInnerHTML={{ __html: response }}
            ></div>
          )}
        </div>

        <div className="input-btn">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "..." : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};
