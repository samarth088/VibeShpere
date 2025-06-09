import React from 'react';
import ReactDOM from 'react-dom/client';
import Hello from './components/Hello';

function App() {
  return (
    <div>
      <h1>Welcome to VibeSphere!</h1>
      <Hello />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
