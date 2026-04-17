import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';

export default function PortalApp() {
  const [screen, setScreen] = useState('login');
  const [user, setUser] = useState(null);

  if (user) return <UserDashboard user={user} onLogout={() => setUser(null)} />;

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ background: '#1a365d', padding: '16px 24px', textAlign: 'center' }}>
        <h2 style={{ color: 'white', margin: 0 }}>🇮🇳 VillageAPI — B2B Portal</h2>
      </div>
      {screen === 'login'
        ? <Login onLogin={setUser} onSwitch={setScreen} />
        : <Register onSwitch={setScreen} />}
    </div>
  );
}