import React, { useRef, useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef();

  const API_BASE = import.meta.env.VITE_API_BASE || "https://vibeshpere.onrender.com";

  const handleFileChange = async (e) => {
    if (!e.target.files.length) return;
    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_BASE}/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.imageUrl) throw new Error(data.message || "Upload failed");
      onUpload(data.imageUrl);
    } catch (err) {
      console.error(err);
      setError("Image upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        onChange={handleFileChange}
        accept="image/*"
        disabled={uploading}
      />
      {uploading && <span>Uploading...</span>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
