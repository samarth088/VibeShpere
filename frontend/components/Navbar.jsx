// components/BottomNavbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react"; // npm i lucide-react

export default function BottomNavbar() {
  return (
    <nav style={styles.navbar}>
      <NavLink to="/" style={styles.link}>
        <Home size={24} />
      </NavLink>
      <NavLink to="/search" style={styles.link}>
        <Search size={24} />
      </NavLink>
      <NavLink to="/create" style={styles.link}>
        <PlusSquare size={24} />
      </NavLink>
      <NavLink to="/notifications" style={styles.link}>
        <Heart size={24} />
      </NavLink>
      <NavLink to="/profile" style={styles.link}>
        <User size={24} />
      </NavLink>
    </nav>
  );
}

const styles = {
  navbar: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTop: "1px solid #ddd",
    display: "flex",
    justifyContent: "space-around",
    padding: "10px 0",
    zIndex: 1000,
  },
  link: {
    textDecoration: "none",
    color: "#333",
  },
};
