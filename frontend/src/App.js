import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";  
import Blogs from "./pages/Blogs";   
import Settings from "./pages/Settings";  
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; 
import Testimonial from "./pages/Testimonial";
const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100"> {/* ✅ Full height layout */}
        <Navbar />
        <div className="container flex-grow-1 mt-4"> {/* ✅ Pushes footer down */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />  {/* ✅ Admin Dashboard */}
            <Route path="/blogs" element={<Blogs />} />  {/* ✅ Blogs Section */}
            <Route path="/settings" element={<Settings />} />  {/* ✅ Site Settings */}
            <Route path="/testimonials" element={<Testimonial />} />
          </Routes>
        </div>
        <Footer /> {/* ✅ Footer stays at the bottom */}
      </div>
    </Router>
  );
};

export default App;
