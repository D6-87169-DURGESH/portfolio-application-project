import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; //  

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
          </Routes>
        </div>
        <Footer /> {/* ✅ Footer stays at the bottom */}
      </div>
    </Router>
  );
};

export default App;
