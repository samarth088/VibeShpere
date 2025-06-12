import React, { useState, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import AuthForm from "./components/AuthForm";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";

function AppRoutes({ token, setToken }) {
  const [postRefresh, setPostRefresh] = useState(0);

  const handleLogin = useCallback(
    (newToken) => {
      setToken(newToken);
      localStorage.setItem("token", newToken);
    },
    [setToken]
  );

  const handleLogout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, [setToken]);

  return (
    <>
      {/* Navbar */}
      <Navbar token={token} onLogout={handleLogout} />

      {/* Routes */}
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
        <Route
          path="/login"
          element={<AuthForm onLogin={handleLogin} mode="login" />}
        />
        <Route
          path="/register"
          element={<AuthForm onLogin={handleLogin} mode="register" />}
        />
        <Route
          path="/profile"
          element={
            token ? (
              <Profile onLogout={handleLogout} />
            ) : (
              <AuthForm onLogin={handleLogin} mode="login" />
            )
          }
        />
      </Routes>
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
