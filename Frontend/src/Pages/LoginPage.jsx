import React, { useState } from "react";
import loginImage from "../assets/loginImage.png";
import "../Styles/LoginPage.css"

const LoginPage = () => {
  // State for email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Dummy API endpoint (replace with your actual backend)
    const API_URL = "https://example.com/api/login";

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        console.log("User Data:", data);
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Section - Login Form */}
        <div className="login-form">
          <h2>Login, your friends missed you ✈️</h2>

          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="email .."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password .."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>

        {/* Divider */}
        <div className="divider">
          <div className="circle"></div>
        </div>

        {/* Right Section - Image Placeholder */}
        <div className="image-section">
          <img src={loginImage} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;