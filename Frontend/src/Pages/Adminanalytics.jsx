import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);
import "../css/Adminanalytics.css";
export const AdminAnalyticsPage = () => {
  const stats = {
    totalItems: 120,
    recoveredItems: 80,
    pendingItems: 30,
    rejectedItems: 10,
    totalUsers: 50,
  };

  const barData = {
    labels: ["Recovered", "Pending", "Rejected"],
    datasets: [
      {
        label: "Items Count",
        data: [stats.recoveredItems, stats.pendingItems, stats.rejectedItems],
        backgroundColor: ["#16a34a", "#f59e0b", "#dc2626"],
      },
    ],
  };

  const pieData = {
    labels: ["Recovered", "Pending", "Rejected"],
    datasets: [
      {
        data: [stats.recoveredItems, stats.pendingItems, stats.rejectedItems],
        backgroundColor: ["#16a34a", "#f59e0b", "#dc2626"],
      },
    ],
  };

  return (
    <div className="analytics-container">
      <h1 className="page-title"> Admin Analytics Dashboard</h1>

      <div className="stats-row">
        <div className="summary-card total">
          <h3>Total Items</h3>
          <p>{stats.totalItems}</p>
        </div>
        <div className="summary-card recovered">
          <h3>Recovered Items</h3>
          <p>{stats.recoveredItems}</p>
        </div>
        <div className="summary-card pending">
          <h3>Pending Items</h3>
          <p>{stats.pendingItems}</p>
        </div>
        <div className="summary-card rejected">
          <h3>Rejected Items</h3>
          <p>{stats.rejectedItems}</p>
        </div>
        <div className="summary-card users">
          <h3>Total Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <h4>Items Status Bar Chart</h4>
          <Bar data={barData} />
        </div>

        <div className="chart-card">
          <h4>Items Distribution Pie Chart</h4>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};
