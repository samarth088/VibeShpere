import React, { useState } from "react";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";

export default function Post({ post, currentUser }) {
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [likesArr, setLikesArr] = useState(post.likes);

  const handleLike = (newLikesCount, action) => {
    setLikesCount(newLikesCount);
    if (action === "like") setLikesArr([...likesArr, currentUser]);
    else setLikesArr(likesArr.filter((id) => id !== currentUser));
  };

  return (
    <div>
      <h3>{post.content}</h3>
      <LikeButton post={{ ...post, likes: likesArr }} currentUser={currentUser} onLike={handleLike} />
      <span>{likesCount} {likesCount === 1 ? "like" : "likes"}</span>
      <CommentList postId={post._id} currentUser={currentUser} />
    </div>
  );
}
