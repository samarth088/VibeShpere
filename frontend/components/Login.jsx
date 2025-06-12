import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE}/api/auth/login`, {
        username,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Login</h3>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
