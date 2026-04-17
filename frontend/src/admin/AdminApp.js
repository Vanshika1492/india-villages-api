import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';

export default function AdminApp() {
  const [page, setPage] = useState('dashboard');

  const renderPage = () => {
    switch(page) {
      case 'dashboard': return <Dashboard />;
      case 'users': return <Users />;
      case 'data': return <div style={{ padding: '24px' }}><h1>🗄️ Data Browser — Coming Soon</h1></div>;
      case 'logs': return <div style={{ padding: '24px' }}><h1>📋 API Logs — Coming Soon</h1></div>;
      case 'settings': return <div style={{ padding: '24px' }}><h1>⚙️ Settings — Coming Soon</h1></div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f8' }}>
      <Sidebar currentPage={page} setPage={setPage} />
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderPage()}
      </div>
    </div>
  );
}