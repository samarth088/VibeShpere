import React, { useState } from "react";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";

export default function Post({ post, currentUser }) {
  const [likes, setLikes] = useState(post.likes || []);

  const handleLike = (newLikesArray) => {
    setLikes(newLikesArray);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "1em",
        marginBottom: "1em",
        borderRadius: 8,
        backgroundColor: "#f9f9f9"
      }}
    >
      {/* Post Content */}
      <h3 style={{ marginBottom: 8 }}>{post.content}</h3>

      {/* Optional Image */}
      {post.imageUrl && (
        <div style={{ marginBottom: 8 }}>
          <img
            src={post.imageUrl}
            alt="Post"
            style={{ maxWidth: "100%", borderRadius: 6 }}
          />
        </div>
      )}

      {/* Like Button */}
      <LikeButton post={{ ...post, likes }} currentUser={currentUser} onLike={handleLike} />
      <span style={{ marginLeft: 8 }}>
        {likes.length} {likes.length === 1 ? "like" : "likes"}
      </span>

      {/* Comments */}
      <CommentList postId={post._id} currentUser={currentUser} />
    </div>
  );
}
