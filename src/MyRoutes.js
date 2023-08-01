import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import Destinations from "./Pages/Explore";

export default function MyRoutes() {




  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/destinations" element={<Destinations/>}/>
    </Routes>
  );
}
