import React, { useState } from "react";
import ImageUpload from "./ImageUpload"; // Optional, include only if image upload is enabled

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const API_BASE = "https://vibeshpere.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setError("Post content cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to post.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: trimmedContent, imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create post.");
      }

      setContent("");
      setImageUrl("");
      setSuccess("Post created!");
      if (onPostCreated) onPostCreated();
    } catch (err) {
      console.error("Create post failed:", err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2em" }}>
      <h3>Create Post</h3>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
        rows={3}
        style={{ width: "100%", padding: "8px" }}
      />
      <br />

      {/* Optional image upload */}
      <ImageUpload onUpload={(url) => setImageUrl(url)} />
      {imageUrl && (
        <div style={{ marginTop: 8 }}>
          <img
            src={imageUrl}
            alt="Preview"
            style={{ maxWidth: 250, borderRadius: 6 }}
          />
        </div>
      )}

      <button type="submit" style={{ marginTop: 10 }}>Post</button>

      {error && <div style={{ color: "red", marginTop: 6 }}>{error}</div>}
      {success && <div style={{ color: "green", marginTop: 6 }}>{success}</div>}
    </form>
  );
}
