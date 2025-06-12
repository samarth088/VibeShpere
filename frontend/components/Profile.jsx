import React, { useEffect, useState } from "react";

export default function Profile({ onLogout }) {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setForm({ username: data.username, email: data.email });
      });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setProfile(data);
      setEditing(false);
      setStatus({ success: "Profile updated!", error: "" });
    } catch (err) {
      setStatus({ error: err.message, success: "" });
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    else window.location.reload();
  };

  if (!profile) return <div>Loading profile...</div>;

  const isChanged = form.username !== profile.username || form.email !== profile.email;

  return (
    <div style={{ padding: "1em", maxWidth: 400, margin: "auto" }}>
      <h2>Your Profile</h2>

      {status.error && <div style={{ color: "red" }}>{status.error}</div>}
      {status.success && <div style={{ color: "green" }}>{status.success}</div>}

      {editing ? (
        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          <input
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            placeholder="Username"
            required
          />
          <input
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="Email"
            type="email"
            required
          />
          <div>
            <button type="submit" disabled={!isChanged || loading}>
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditing(false);
                setForm({ username: profile.username, email: profile.email });
              }}
              style={{ marginLeft: 8 }}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p><b>Username:</b> {profile.username}</p>
          <p><b>Email:</b> {profile.email}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleLogout} style={{ marginLeft: 8, color: "red" }}>Logout</button>
        </>
      )}
    </div>
  );
          }
