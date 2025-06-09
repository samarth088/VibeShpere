import React, { useState } from "react";

export default function Logout({ onLogout }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setError("");
    if (!window.confirm("Are you sure you want to log out?")) return;
    setLoading(true);
    try {
      localStorage.removeItem("token");
      if (onLogout && typeof onLogout === "function") {
        onLogout();
      } else {
        // fallback: reload the page to reset UI state
        window.location.reload();
      }
    } catch (err) {
      setError("Logout failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "Logout"}
      </button>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </div>
  );
}
