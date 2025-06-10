import React, { useEffect, useState } from "react";
import Post from "./Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch posts
    fetch("/api/posts")
      .then(res => res.json())
      .then(data => setPosts(data));

    // Fetch current user info
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(user => setCurrentUser(user._id));
    }
  }, []);

  return (
    <div>
      {posts.map(post => (
        <Post key={post._id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
}
