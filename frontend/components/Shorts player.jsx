// components/ShortsPlayer.jsx
import React from 'react';

const ShortsPlayer = ({ videos }) => {
  return (
    <div className="h-screen overflow-y-scroll bg-black">
      {videos.map((video, idx) => (
        <video
          key={idx}
          className="w-full h-[90vh] object-cover mb-2"
          controls
          loop
          src={video.url}
        />
      ))}
    </div>
  );
};

export default ShortsPlayer;
