// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import Contact from "./Pages/Contact";
// import Profile from "./Pages/Profile";
// // import Explore from "./Pages/Explore";
// import AttractionsDashboard from "./Pages/AttractionsDashboard";
// import TravelItinerary from "./Pages/Itinerary";
// import { useAuth } from "./AuthContext";
// import About from "./Pages/About";
// import AttractionDetails from "./components/Home/AttractionDetails";

// export default function MyRoutes() {
//   const auth = useAuth();

//   // Helper function to check if the user is logged in
//   const isAuthenticated = () => !!auth.user;

//   // Custom rendering function for private routes
//   const renderPrivateRoute = (element) => {
//     return isAuthenticated() ? element : <Navigate to="/login" replace />;
//   };

//   return (

//     // PUBLIC ROUTES

//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<Register />} />
//       <Route path="/about" element={<About />} />
//       {/* <Route path="/admin" element={<AttractionsDashboard />} /> */}

//     {/* PRIVATE ROUTES */}

//     <Route path="/attraction/:id" element={renderPrivateRoute(<AttractionDetails />)} />
//       <Route path="/contact" element={renderPrivateRoute(<Contact />)} />
//       <Route path="/profile" element={renderPrivateRoute(<Profile />)} />
//       <Route path="/explore" element={renderPrivateRoute(<TravelItinerary />)} />
//       <Route path="/admin" element={renderPrivateRoute(<AttractionsDashboard />)} />
//     </Routes>
//   );
// }


// ADMIN FEATURE

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import AttractionsDashboard from "./Pages/AttractionsDashboard";
import TravelItinerary from "./Pages/Itinerary";
import { useAuth } from "./AuthContext";
import About from "./Pages/About";
import AttractionDetails from "./components/Home/AttractionDetails";
import PastItineraries from "./components/Itinerary/PastItineraries";

export default function MyRoutes() {
  const auth = useAuth();

  // Helper function to check if the user is logged in
  const isAuthenticated = () => !!auth.user;

  // Helper function to check if the user is an admin
  const isAdmin = () => isAuthenticated() && auth.user.admin;

  // Custom rendering function for private routes
  const renderPrivateRoute = (element) => {
    return isAuthenticated() ? element : <Navigate to="/login" replace />;
  };

  // Custom rendering function for admin routes
  const renderAdminRoute = (element) => {
    return isAdmin() ? element : <Navigate to="/" replace />;
  };

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/about" element={<About />} />

      {/* PRIVATE ROUTES */}
      <Route path="/attraction/:id" element={renderPrivateRoute(<AttractionDetails />)} />
      <Route path="/contact" element={renderPrivateRoute(<Contact />)} />
      <Route path="/profile" element={renderPrivateRoute(<Profile />)} />
      <Route path="/explore" element={renderPrivateRoute(<TravelItinerary />)} />
      <Route path="/my_itineraries" element={renderPrivateRoute(<PastItineraries />)} />

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={renderAdminRoute(<AttractionsDashboard />)} />
    </Routes>
  );
}
