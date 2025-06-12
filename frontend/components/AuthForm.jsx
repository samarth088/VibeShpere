import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode, onLogin }) {
  const isLogin = mode === "login";
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const url = `${import.meta.env.VITE_API_BASE}/api/${isLogin ? "login" : "signup"}`;
      const payload = isLogin
        ? { username: form.username, password: form.password }
        : form;

      const res = await axios.post(url, payload);

      if (isLogin) {
        onLogin(res.data.token); // Pass token up to App
        navigate("/"); // Redirect to homepage
      } else {
        alert("Registration successful! You can now login.");
        navigate("/login");
      }
    } catch (err) {
      console.error(`${mode} failed:`, err);
      setError(err.response?.data?.message || `${mode} failed.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isLogin ? "Login" : "Register"}</h3>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      /><br />

      {!isLogin && (
        <>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          /><br />
        </>
      )}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      /><br />

      <button type="submit">{isLogin ? "Login" : "Register"}</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
