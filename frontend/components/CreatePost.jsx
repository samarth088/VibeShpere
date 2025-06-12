import React, { useState } from "react";
import ImageUpload from "./ImageUpload"; // Optional - Only if image upload feature exists

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState({ error: "", success: "" });
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || "https://vibeshpere.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ error: "", success: "" });

    const trimmed = content.trim();
    if (!trimmed) return setStatus({ error: "Post content cannot be empty." });

    const token = localStorage.getItem("token");
    if (!token) return setStatus({ error: "Login required to post." });

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: trimmed, imageUrl }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create post");

      setContent("");
      setImageUrl("");
      setStatus({ success: "Post created successfully!" });
      if (onPostCreated) onPostCreated();
    } catch (err) {
      setStatus({ error: err.message || "Something went wrong." });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2em" }}>
      <h3>Create Post</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        rows={4}
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <br />

      {/* Optional image upload */}
      <ImageUpload onUpload={(url) => setImageUrl(url)} />
      {imageUrl && (
        <div style={{ marginTop: 10 }}>
          <img
            src={imageUrl}
            alt="Preview"
            style={{ maxWidth: 250, borderRadius: 8, border: "1px solid #ddd" }}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: 10,
          padding: "8px 16px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Posting..." : "Post"}
      </button>

      {status.error && <p style={{ color: "red", marginTop: 6 }}>{status.error}</p>}
      {status.success && <p style={{ color: "green", marginTop: 6 }}>{status.success}</p>}
    </form>
  );
      }
