import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useCalendarData } from "../context/CalendarContext"; // Import CalendarContext hook

// Register required ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const Chart = () => {
  // Access calendarData from context
  const { calendarData } = useCalendarData();

  // Aggregate and sort data by date
  const aggregatedData = calendarData
    .reduce((acc, item) => {
      const existingEntry = acc.find((entry) => entry.date === item.date);
      if (existingEntry) {
        existingEntry.calories += item.calories;
      } else {
        acc.push({ date: item.date, calories: item.calories });
      }
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Prepare chart data
  const chartData = {
    labels: aggregatedData.map((item) => item.date),
    datasets: [
      {
        label: "Total Calories",
        data: aggregatedData.map((item) => item.calories),
        borderColor: "#63A4FF",
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, "rgba(99, 132, 255, 0.2)");
          gradient.addColorStop(1, "rgba(99, 132, 255, 0.8)");
          return gradient;
        },
        fill: true,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: "#FFFFFF",
        pointBorderColor: "#63A4FF",
        tension: 0.4, // Smooth curve
      },
    ],
  };

  // Configure chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom dimensions
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4B5563",
          font: { size: 14, family: "Arial, sans-serif" },
        },
      },
      title: {
        display: true,
        text: "Daily Calorie Intake",
        color: "#1F2937",
        font: { size: 20, weight: "bold", family: "Arial, sans-serif" },
      },
      tooltip: {
        callbacks: {
          title: (context) => `Date: ${context[0].label}`,
          label: (context) => {
            const calories = aggregatedData[context.dataIndex].calories;
            return `Total Calories: ${calories} cal`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: "#6B7280" },
        grid: { color: "rgba(203, 213, 224, 0.2)" },
      },
      y: {
        ticks: { color: "#6B7280" },
        grid: { color: "rgba(203, 213, 224, 0.2)" },
      },
    },
    animation: { duration: 1500, easing: "easeInOutQuad" },
  };

  return (
    <div
      style={{
        width: "800px", // Custom width
        height: "400px", // Custom height
        margin: "0 auto", // Center the chart
        padding: "10px",
        backgroundColor: "#f9f9f9", // Add a light background
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Add box shadow
      }}
    >
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
