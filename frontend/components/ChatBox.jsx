// components/ChatBox.jsx
import React, { useState } from 'react';

const ChatBox = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  const sendMessage = () => {
    if (text.trim() === '') return;
    setMessages([...messages, { sender: 'me', text }]);
    setText('');
  };

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex-1 overflow-y-auto mb-4 bg-gray-100 p-2 rounded">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.sender === 'me' ? 'text-right' : 'text-left'}`}>
            <span className="inline-block bg-blue-200 p-2 rounded">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-4 py-2 rounded"
          placeholder={`Message ${username}`}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
