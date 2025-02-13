import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";  

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize navigation hook

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("🔄 Attempting login with:", credentials);
      const response = await loginUser(credentials);

      if (!response || !response.data || !response.data.token) {
        console.error("❌ No token received. Full response:", response);
        alert("Login failed! No token received.");
        return;
      }

      console.log("✅ Login successful! Token:", response.data.token);
      localStorage.setItem("token", response.data.token);
      console.log("🔐 Saved token:", localStorage.getItem("token")); 
      alert("Login successful!");

      navigate("/"); 
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <section className="login-page d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4 login-card animate-fade-in">
              <h2 className="text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <p className="text-center mt-3">
                Don't have an account? <a href="/register">Register here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
