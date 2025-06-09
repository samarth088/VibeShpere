import React, { useState } from "react";
import ImageUpload from "./ImageUpload"; // Optional, include if you added image upload

export default function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Only if using image upload
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to post.");
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content, imageUrl }), // imageUrl is optional
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error creating post");
      setContent("");
      setImageUrl("");
      setSuccess("Posted!");
      if (onPostCreated) onPostCreated(); // Refresh feed if parent wants
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2em" }}>
      <h3>Create Post</h3>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="What's on your mind?"
        required
        rows={3}
        style={{ width: "100%" }}
      />
      <br />
      {/* Optional image upload */}
      <ImageUpload onUpload={url => setImageUrl(url)} />
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Preview" style={{ maxWidth: 200, marginTop: 8 }} />
        </div>
      )}
      <button type="submit">Post</button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
    </form>
  );
}
