import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Profile.css";

const Profile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [user, setUser] = useState({
    name: "Loghul M",
    email: "Loghulm@gmail.com",
    bio: "A passionate developer.",
  });
  const [successMessage, setSuccessMessage] = useState(null); // State to store success message

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // You can perform any logic here (like saving data to a backend)
    setSuccessMessage("Profile updated successfully!"); // Show success message
    
    setTimeout(() => {
      setSuccessMessage(null); // Hide the message after 3 seconds
      navigate("/dashboard"); // Navigate to the dashboard after saving
    }, 3000);
  };

  return (
    <div className="profile-container">
      <motion.button
        className="back-btn"
        onClick={() => navigate("/dashboard")}
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft size={20} /> Back to Dashboard
      </motion.button>

      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Profile</h2>

        {/* Success message popup */}
        {successMessage && (
          <motion.div
            className="success-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.div>
        )}

        {/* Profile Form */}
        <div className="profile-form">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <label>Bio:</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleChange}
          />

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
