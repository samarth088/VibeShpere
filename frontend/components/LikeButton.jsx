import React, { useState, useEffect } from "react";

export default function LikeButton({ post, currentUser, onLike }) {
  const [likes, setLikes] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);

  const API_BASE = "https://vibeshpere.onrender.com";

  useEffect(() => {
    setLikes(post.likes); // update if parent passes new post
  }, [post.likes]);

  const liked = likes.includes(currentUser);

  const handleLike = async () => {
    if (!currentUser) return;

    setIsLiking(true);
    const token = localStorage.getItem("token");
    const action = liked ? "unlike" : "like";
    const url = `${API_BASE}/api/likes/${post._id}/${action}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Error updating like");

      setLikes(data.likes); // Update likes from backend response

      if (onLike) onLike(data.likes.length, action); // likes.length send back to parent
    } catch (err) {
      console.error("Like error:", err.message);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <button onClick={handleLike} disabled={isLiking}>
      {liked ? "Unlike" : "Like"} ({likes.length})
    </button>
  );
}
