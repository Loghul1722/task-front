import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard"; // Create this component
import Products from "./Components/Product/Product";
import Profile from "./Components/Profile/Profile";
import Settings from "./Components/Sett/Setting";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("auth") ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Products/></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings/></PrivateRoute>} />
      
      </Routes>
    </Router>
  );
};

export default App;
