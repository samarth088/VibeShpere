import React, { useState } from "react";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";

export default function Post({ post, currentUser }) {
  const [likes, setLikes] = useState(post.likes);

  const handleLike = (newLikesArray, action) => {
    setLikes(newLikesArray);
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "1em", marginBottom: "1em" }}>
      <h3>{post.content}</h3>

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
