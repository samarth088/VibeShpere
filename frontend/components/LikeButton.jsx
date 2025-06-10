import React, { useState } from "react";

export default function LikeButton({ post, currentUser, onLike }) {
  const [isLiking, setIsLiking] = useState(false);

  const liked = post.likes.includes(currentUser);

  const handleLike = async () => {
    setIsLiking(true);
    const token = localStorage.getItem("token");
    const url = `/api/likes/${post._id}/${liked ? "unlike" : "like"}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setIsLiking(false);
    if (onLike) onLike(data.likes, liked ? "unlike" : "like");
  };

  return (
    <button onClick={handleLike} disabled={isLiking}>
      {liked ? "Unlike" : "Like"} ({post.likes.length})
    </button>
  );
}
