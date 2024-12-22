import { useState } from "react";
import { Sidebar } from "./sidebar";
import { ExpandableToggle } from "./expandableToggle";
import "../styles/innermain.css";
import { Calendar } from "./Calendar"; 
import { Chart } from "./Chart";
import { DailyPlan } from "./Dailyplan";

export const Innermain = () => {
  const [activeComponent, setActiveComponent] = useState("calendar");

  const renderComponent = () => {
    switch (activeComponent) {
      case "calendar":
        return <Calendar />;
      case "chart":
        return <Chart />;
      case "dailyPlan":
        return  <DailyPlan/>;
      default:
        return <p>Select a component to view!</p>;
    }
  };

  return (
    <div className="maindiv">
      <Sidebar />
      <div className="innerdiv">
        <ExpandableToggle setActiveComponent={setActiveComponent} />
        <div className="content-area">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};
