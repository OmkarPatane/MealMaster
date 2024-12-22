import { useState } from "react";
import "../styles/expandable.css";

// eslint-disable-next-line react/prop-types
export const ExpandableToggle = ({ setActiveComponent }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let ExpandIcon = [
    { label: "Calendar", key: "calendar" },
    { label: "Chart", key: "chart" },
    { label: "Daily Plan", key: "dailyPlan" },
  ];
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="expandable-container">
      <button className="toggle-button" onClick={toggleExpand}>
        {isExpanded ? "-" : "+"}
      </button>
      <div className={`buttons-row ${isExpanded ? "expanded" : ""}`}>
        {ExpandIcon.map((ele) => (
          <button
            onClick={() => setActiveComponent(ele.key)}
            key={ele.key}
            className="child-button"
            style={{ display: isExpanded ? "block" : "none" }}
          >
            {ele.label}
          </button>
        ))}
      </div>
    </div>
  );
};
