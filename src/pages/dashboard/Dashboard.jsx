import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import "./Dashboard.css";

const Dashboard = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const location = useLocation();

  useEffect(() => {
    // Check if user scrolls down
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update active link based on the current path
    setActiveLink(location.pathname);
  }, [location]);

  const navLinks = [
    { path: "/", name: "Home", icon: "fa-home" },
    { path: "/donate", name: "Donate", icon: "fa-tint" },
    { path: "/requestblood", name: "Request Blood", icon: "fa-hand-holding-medical" },
    { path: "/profile", name: "My Profile", icon: "fa-user" }
  ];

  return (
    <motion.div
      className={`dashboard ${isScrolled ? "scrolled" : ""}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="dashboard-container">
        {/* Brand */}
        <div className="dashboard-brand">
          <i className="fas fa-heartbeat"></i>
          <span>BloodConnect</span>
        </div>

        {/* Navigation Links */}
        <div className="dashboard-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`dashboard-link ${activeLink === link.path ? "active" : ""}`}
            >
              <i className={`fas ${link.icon}`}></i>
              <span>{link.name}</span>
              {activeLink === link.path && (
                <motion.div
                  className="nav-indicator"
                  layoutId="navIndicator"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="dashboard-actions">
          {/* Notifications */}
          <button className="notification-btn">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </button>

          {/* User Avatar */}
          <div className="user-avatar">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
          </div>

          {/* Logout Button */}
          <button className="logout-btn" onClick={() => localStorage.clear()}>
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
