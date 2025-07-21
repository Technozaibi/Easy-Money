import React, { useState, useEffect } from 'react';
import './App.css'; // For basic styling
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AdViewer from './components/AdViewer';

function App() {
  const [user, setUser] = useState(null); // Simple user state, ideally from JWT

  // In a real app, you'd check for a token in localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend and set user
      // For this example, we'll just simulate a logged-in user
      setUser({ username: 'DemoUser', earnings: 0 });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token); // Store token
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const updateEarnings = (amount) => {
    setUser(prevUser => ({
      ...prevUser,
      earnings: prevUser.earnings + amount
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>EarnHub</h1>
        {user && <button onClick={handleLogout} className="logout-button">Logout</button>}
      </header>
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <>
          <Dashboard user={user} />
          <AdViewer updateEarnings={updateEarnings} />
        </>
      )}
    </div>
  );
}

export default App;
    
