import React, { useState } from "react";

export default function AuthForm({ onLogin, mode = "login" }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const API_BASE =
    import.meta.env.VITE_API_BASE || "https://vibeshpere.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        if (onLogin) onLogin(data.token);
      } else {
        setError(data.message || `${mode} failed`);
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{mode === "register" ? "Register" : "Login"}</h2>

      <input
        value={form.username}
        onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
        placeholder="Username"
        required
      />

      <input
        value={form.password}
        onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
        placeholder="Password"
        type="password"
        required
      />

      <button type="submit">
        {mode === "register" ? "Register" : "Login"}
      </button>

      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}
