import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import "./Setting.css";

const Settings = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const navigate = useNavigate();

    const toggleDarkMode = () => setDarkMode(!darkMode);
    const toggleNotifications = () => setNotifications(!notifications);

    return (
        <div className={`settings-container ${darkMode ? "dark-mode" : ""}`}>
            <motion.div
                className="settings-card"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2>Settings</h2>

                {/* Profile Settings */}
                <div className="settings-section">
                    <h3>Profile</h3>
                    <label>Name:</label>
                    <input type="text" placeholder="Loghul M" />

                    <label>Email:</label>
                    <input type="email" placeholder="Loghulm@gmail.com" />

                    <button className="change-password">Change Password</button>
                </div>

                {/* Preferences */}
                <div className="settings-section">
                    <h3>Preferences</h3>
                    <div className="toggle-option">
                        <label>Dark Mode:</label>
                        <button onClick={toggleDarkMode}>
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                    <div className="toggle-option">
                        <label>Enable Notifications:</label>
                        <button onClick={toggleNotifications}>
                            {notifications ? "ON" : "OFF"}
                        </button>
                    </div>
                </div>

                {/* Logout */}
                <button className="logout-btn" onClick={() => navigate("/")}>
                    Logout
                </button>

                {/* Back to Dashboard */}
                <button className="back-dashboard-btn" onClick={() => navigate("/dashboard")}>
                    Back to Dashboard
                </button>
            </motion.div>
        </div>
    );
};

export default Settings;
