import React, { useState } from "react";

export default function Logout({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    setLoading(false);
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
