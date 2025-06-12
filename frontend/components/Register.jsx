import React, { useState } from "react";
import axios from "axios";

export default function Register({ onRegisterSuccess }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE || "https://vibeshpere.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, form); // ✅ FIXED ENDPOINT

      setSuccess("🎉 Registered successfully! Please login.");
      setForm({ username: "", email: "", password: "" });

      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
      <h3>Register</h3>

      <input
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
        style={{ display: "block", marginBottom: 10, width: "100%" }}
      />

      <button type="submit" style={{ width: "100%" }}>Register</button>

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: 10 }}>{success}</p>}

      <p style={{ marginTop: 15 }}>
        Already have an account?{" "}
        <a href="/" style={{ color: "#007bff" }}>Login</a>
      </p>
    </form>
  );
}
