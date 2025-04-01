import { Link } from "react-router-dom";
import React from "react";

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./AdminDashboard.css"; // Correct path for CSS

const Dashboard = () => {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Blood Bank Admin</h2>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/donors">Donors</Link>
          <Link to="/requests">Requests</Link>
          <Link to="/reports">Reports</Link>
        </nav>
      </aside>

      <main className="content">
        <h1>Admin Dashboard</h1>
      </main>
    </div>
  );
};

export default Dashboard;
