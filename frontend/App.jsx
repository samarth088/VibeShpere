import React, { useState, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import AuthForm from "./components/AuthForm";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";
import Profile from "./components/Profile";
import Logout from "./components/Logout";

function AppRoutes({ token, setToken }) {
  const [postRefresh, setPostRefresh] = useState(0);

  // Login
  const handleLogin = useCallback(
    (newToken) => {
      setToken(newToken);
      localStorage.setItem("token", newToken);
    },
    [setToken]
  );

  // Logout
  const handleLogout = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, [setToken]);

  return (
    <>
      {/* Navigation */}
      <nav style={{ marginBottom: 20 }}>
        <NavLink
          to="/"
          style={({ isActive }) => ({
            fontWeight: isActive ? "bold" : "normal",
            marginRight: 10,
          })}
        >
          Feed
        </NavLink>

        {token && (
          <>
            <NavLink
              to="/profile"
              style={({ isActive }) => ({
                fontWeight: isActive ? "bold" : "normal",
                marginRight: 10,
              })}
            >
              Profile
            </NavLink>
            <Logout onLogout={handleLogout} />
          </>
        )}
      </nav>

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
              <AuthForm onLogin={handleLogin} />
            )
          }
        />

        <Route
          path="/profile"
          element={
            token ? (
              <Profile onLogout={handleLogout} />
            ) : (
              <AuthForm onLogin={handleLogin} />
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
