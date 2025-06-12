import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar({ token, onLogout }) {
  return (
    <nav style={styles.nav}>
      <NavLink to="/" style={styles.link} activeStyle={styles.active}>
        Feed
      </NavLink>

      {!token && (
        <NavLink to="/register" style={styles.link} activeStyle={styles.active}>
          Register
        </NavLink>
      )}

      {token && (
        <>
          <NavLink to="/profile" style={styles.link} activeStyle={styles.active}>
            Profile
          </NavLink>
          <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
        </>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    padding: "10px 20px",
    background: "#f0f0f0",
    borderBottom: "1px solid #ccc",
    marginBottom: 20,
  },
  link: {
    marginRight: 15,
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },
  active: {
    fontWeight: "bold",
    color: "#007bff",
  },
  logoutButton: {
    marginLeft: 10,
    background: "none",
    border: "none",
    color: "#d00",
    cursor: "pointer",
    fontWeight: "bold",
  }
};
