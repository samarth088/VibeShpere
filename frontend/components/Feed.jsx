import React, { useEffect, useState } from "react";
import Post from "./Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      try {
        const postRes = await fetch("/api/posts");
        const postData = await postRes.json();

        if (!postRes.ok) throw new Error(postData.message || "Failed to load posts");
        setPosts(postData);

        const token = localStorage.getItem("token");
        if (token) {
          const userRes = await fetch("/api/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = await userRes.json();
          if (userRes.ok) {
            setCurrentUser(userData._id);
          }
        }
      } catch (err) {
        console.error("Feed fetch error:", err);
        setError(err.message || "Error loading feed");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading feed...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (posts.length === 0) return <div>No posts yet.</div>;

  return (
    <div>
      {posts.map((post) => (
        <Post key={post._id} post={post} currentUser={currentUser} />
      ))}
    </div>
  );
}
