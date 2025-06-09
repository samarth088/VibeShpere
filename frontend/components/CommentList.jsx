import React, { useEffect, useState } from "react";

export default function CommentList({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/comments/${postId}`)
      .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
      });
  }, [postId]);

  const handleComment = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await fetch(`/api/comments/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    const data = await res.json();
    if (res.ok) {
      setComments(c => [...c, data]);
      setContent("");
    }
  };

  const handleDelete = async (commentId) => {
    const token = localStorage.getItem("token");
    await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments(c => c.filter(com => com._id !== commentId));
  };

  if (loading) return <div>Loading comments...</div>;

  return (
    <div>
      <h4>Comments</h4>
      <form onSubmit={handleComment}>
        <input
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Add</button>
      </form>
      {comments.map(com => (
        <div key={com._id} style={{ borderBottom: "1px solid #eee", margin: "8px 0" }}>
          <b>{com.user?.username || "?"}</b>: {com.content}
          {currentUser === com.user?._id && (
            <button onClick={() => handleDelete(com._id)} style={{ marginLeft: 8, color: "red" }}>
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
