import React, { useState } from "react";

export default function Logout({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const API_BASE = "https://vibeshpere.onrender.com";

  const handleLogout = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    // Optional backend logout call (if supported)
    try {
      await fetch(`${API_BASE}/api/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn("Backend logout failed (safe to ignore if not implemented)", err);
    }

    localStorage.removeItem("token");

    setTimeout(() => {
      if (onLogout) onLogout();
      setLoading(false);
    }, 500);
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
