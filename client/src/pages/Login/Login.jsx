import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("erp-username");
    const storedPassword = localStorage.getItem("erp-password");
    const usernameFromEnv = import.meta.env.VITE_USERNAME;
    const passwordFromEnv = import.meta.env.VITE_PASSWORD;

    if (
      storedUsername &&
      storedPassword &&
      storedUsername === usernameFromEnv &&
      storedPassword === passwordFromEnv
    ) {
      navigate("/");
    }
  }, []);

  const handleSubmit = () => {
    const usernameFromEnv = import.meta.env.VITE_USERNAME;
    const passwordFromEnv = import.meta.env.VITE_PASSWORD;
    console.login(usernameFromEnv, passwordFromEnv);
    if (username == usernameFromEnv && password == passwordFromEnv) {
      console.log("Login successful");
      localStorage.setItem("erp-username", username);
      localStorage.setItem("erp-password", password);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="submit-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
