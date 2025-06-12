import React, { useState } from "react";

export default function Logout({ onLogout }) {
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    localStorage.removeItem("token");

    // optional: small delay to show 'Logging out...'
    setTimeout(() => {
      if (onLogout) onLogout();
      setLoading(false);
    }, 500); // 0.5 sec delay
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
