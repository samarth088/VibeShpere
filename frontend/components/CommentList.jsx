import React, { useEffect, useState } from "react";

export default function CommentList({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE || "https://vibeshpere.onrender.com";

  // Fetch comments
  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/comments/${postId}`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to load comments");
        return res.json();
      })
      .then(data => setComments(data))
      .catch(err => {
        console.error(err);
        setError("Could not load comments.");
      })
      .finally(() => setLoading(false));
  }, [postId]);

  // Add new comment
  const handleComment = async (e) => {
    e.preventDefault();
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Login required.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: trimmedContent }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to post comment.");
      } else {
        setComments((c) => [...c, data]);
        setContent("");
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  // Delete comment
  const handleDelete = async (commentId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/comments/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setComments((c) => c.filter((com) => com._id !== commentId));
      } else {
        console.warn("Failed to delete comment.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (loading) return <div>Loading comments...</div>;

  return (
    <div>
      <h4>Comments</h4>

      <form onSubmit={handleComment}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Add</button>
      </form>

      {error && <div style={{ color: "red", marginTop: 4 }}>{error}</div>}

      {comments.map((com) => (
        <div
          key={com._id}
          style={{ borderBottom: "1px solid #eee", margin: "8px 0" }}
        >
          <b>{com.user?.username || "?"}</b>: {com.content}
          {currentUser === com.user?._id && (
            <button
              onClick={() => handleDelete(com._id)}
              style={{ marginLeft: 8, color: "red" }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
  }
