import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/Login.css";  

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await loginUser(credentials);
      if (!response || !response.data || !response.data.token) {
        setMessage({ type: "danger", text: "Login failed! No token received." });
        setLoading(false);
        return;
      }

      sessionStorage.setItem("token", response.data.token);
      setMessage({ type: "success", text: "Login successful! Redirecting..." });

      setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
    } catch (error) {
      setMessage({ type: "danger", text: "Invalid credentials! Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page d-flex align-items-center justify-content-center pt-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow p-4 login-card animate-fade-in">
              <h2 className="text-center mb-4">Login</h2>

              {/* ✅ Notification Message */}
              {message && <div className={`alert alert-${message.type}`} role="alert">{message.text}</div>}

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

                {/* ✅ Show loading spinner while logging in */}
                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
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
