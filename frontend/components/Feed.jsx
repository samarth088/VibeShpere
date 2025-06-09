import React, { useEffect, useState } from "react";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => setError("Failed to load posts"));
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {posts.length === 0 && <div>No posts yet.</div>}
      {posts.map((post) => (
        <div key={post._id} style={{ border: "1px solid #ccc", margin: "1em 0", padding: "1em" }}>
          <div><b>{post.user?.username || "Unknown"}</b></div>
          <div>{post.content}</div>
          <div style={{ fontSize: "0.8em", color: "#888" }}>{new Date(post.createdAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}
