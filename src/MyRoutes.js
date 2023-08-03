import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
// import Explore from "./Pages/Explore";
import AttractionsDashboard from "./Pages/AttractionsDashboard";
import TravelItinerary from "./Pages/Itinerary";
import { useAuth } from "./AuthContext";
import About from "./Pages/About";

export default function MyRoutes() {
  const auth = useAuth();

  // Helper function to check if the user is logged in
  const isAuthenticated = () => !!auth.user;

  // Custom rendering function for private routes
  const renderPrivateRoute = (element) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
  };

  return (

    // PUBLIC ROUTES

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/about" element={<About />} />

    {/* PRIVATE ROUTES */}

      <Route path="/contact" element={renderPrivateRoute(<Contact />)} />
      {/* Profile route with custom rendering */}
      <Route path="/profile" element={renderPrivateRoute(<Profile />)} />
      {/* Explore route with custom rendering */}
      <Route path="/explore" element={renderPrivateRoute(<TravelItinerary />)} />
      {/* Admin route with custom rendering */}
      <Route path="/admin" element={renderPrivateRoute(<AttractionsDashboard />)} />
    </Routes>
  );
}
