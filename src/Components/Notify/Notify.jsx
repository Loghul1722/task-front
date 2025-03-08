// Notification.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Notify.css';

const Notification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Close the notification after 3 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [onClose]);

  return (
    <motion.div
      className="notification"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {message}
    </motion.div>
  );
};

export default Notification;
