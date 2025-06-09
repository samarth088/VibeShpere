import React, { useState } from 'react';

export default function AuthForm() {
  const [mode, setMode] = useState('login');

  return (
    <div>
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form>
        <input type="email" placeholder="Email" required /><br />
        <input type="password" placeholder="Password" required /><br />
        {mode === 'register' && (
          <input type="text" placeholder="Username" required /><br />
        )}
        <button type="submit">{mode === 'login' ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {mode === 'login'
          ? "Don't have an account? "
          : "Already have an account? "}
        <button type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}
