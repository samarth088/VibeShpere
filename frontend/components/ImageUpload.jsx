import React, { useRef, useState } from "react";

export default function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false);
  const fileInput = useRef();

  const handleFileChange = async (e) => {
    if (!e.target.files.length) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json();
    onUpload(data.imageUrl);
    setUploading(false);
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
    </div>
  );
}
