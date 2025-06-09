import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import AuthForm from "./components/AuthForm";
import Feed from "./components/Feed";
import CreatePost from "./components/CreatePost";

function App() {
  const [postRefresh, setPostRefresh] = useState(0);

  const token = localStorage.getItem("token");

  return (
    <div>
      <h1>Welcome to VibeSphere!</h1>
      {!token && <AuthForm />}
      {token && (
        <>
          <CreatePost onPostCreated={() => setPostRefresh(r => r + 1)} />
          <Feed key={postRefresh} />
        </>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
