// components/ChatList.jsx
import React from 'react';

const ChatList = ({ users, onSelect }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Chats</h2>
      {users.map((user, idx) => (
        <div
          key={idx}
          onClick={() => onSelect(user)}
          className="p-2 border-b cursor-pointer hover:bg-gray-100"
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
