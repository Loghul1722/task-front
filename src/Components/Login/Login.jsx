import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Dummy user credentials
    const validEmail = "loghulm@gmail.com";
    const validPassword = "123";

    if (email === validEmail && password === validPassword) {
      localStorage.setItem("auth", "true"); // Save login state
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-form"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;