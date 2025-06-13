import React, { useState, useCallback } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar"; // Optional top navbar
import BottomNavbar from "./components/BottomNavbar"; // Instagram-style bottom navbar

import AuthForm from "./components/AuthForm";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import Search from "./pages/Search";
import Notifications from "./pages/Notifications";
import Shorts from "./pages/Shorts";

function AppRoutes({ token, setToken }) {
  const [postRefresh, setPostRefresh] = useState(0);

  const handleLogin = useCallback((newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }, [setToken]);

  const handleLogout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, [setToken]);

  const requireAuth = (Component) => {
    return token ? <Component /> : <AuthForm onLogin={handleLogin} mode="login" />;
  };

  return (
    <>
      {/* Optional Top Navbar */}
      <Navbar token={token} onLogout={handleLogout} />

      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <>
                <CreatePost onPostCreated={() => setPostRefresh((r) => r + 1)} />
                <Feed key={postRefresh} />
              </>
            ) : (
              <AuthForm onLogin={handleLogin} mode="login" />
            )
          }
        />
        <Route path="/login" element={<AuthForm onLogin={handleLogin} mode="login" />} />
        <Route path="/register" element={<AuthForm onLogin={handleLogin} mode="register" />} />
        <Route path="/profile" element={requireAuth(() => <Profile onLogout={handleLogout} />)} />
        <Route path="/search" element={requireAuth(Search)} />
        <Route path="/notifications" element={requireAuth(Notifications)} />
        <Route path="/create" element={requireAuth(Shorts)} />
      </Routes>

      {/* Show Bottom Navbar only when user is logged in */}
      {token && <BottomNavbar />}
    </>
  );
}

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  return (
    <BrowserRouter>
      <AppRoutes token={token} setToken={setToken} />
    </BrowserRouter>
  );
}
