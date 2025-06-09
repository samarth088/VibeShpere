import React from "react";
import CommentList from "./CommentList";

export default function Post({ post, currentUser }) {
  // ... existing post display code ...
  return (
    <div>
      {/* Your post rendering here */}
      <h3>{post.content}</h3>
      {/* Comments */}
      <CommentList postId={post._id} currentUser={currentUser} />
    </div>
  );
}
