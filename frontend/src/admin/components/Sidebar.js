import React from 'react';

const navItems = [
  { icon: '📊', label: 'Dashboard', page: 'dashboard' },
  { icon: '👥', label: 'Users', page: 'users' },
  { icon: '🗄️', label: 'Data Browser', page: 'data' },
  { icon: '📋', label: 'API Logs', page: 'logs' },
  { icon: '⚙️', label: 'Settings', page: 'settings' },
];

export default function Sidebar({ currentPage, setPage }) {
  return (
    <div style={{
      width: '240px', minHeight: '100vh', background: '#1a365d',
      padding: '20px 0', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #2d4a7a' }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '1.1rem' }}>🇮🇳 VillageAPI</h2>
        <p style={{ color: '#90cdf4', margin: '4px 0 0', fontSize: '0.8rem' }}>Admin Panel</p>
      </div>
      <nav style={{ padding: '16px 0' }}>
        {navItems.map(item => (
          <div key={item.page} onClick={() => setPage(item.page)}
            style={{
              padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
              background: currentPage === item.page ? '#2d4a7a' : 'transparent',
              color: currentPage === item.page ? 'white' : '#90cdf4',
              borderLeft: currentPage === item.page ? '3px solid #4299e1' : '3px solid transparent',
              transition: 'all 0.2s'
            }}>
            <span>{item.icon}</span>
            <span style={{ fontSize: '0.95rem' }}>{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
}