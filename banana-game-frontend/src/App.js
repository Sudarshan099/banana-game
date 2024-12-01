import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Game from "./components/Game";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

// PrivateRoute component to protect routes that need authentication
const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");

  // If no token is found, redirect to login page
  return token ? element : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />

        {/* Protected Routes */}
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/game" element={<PrivateRoute element={<Game />} />} />
      </Routes>
    </Router>
  );
}
