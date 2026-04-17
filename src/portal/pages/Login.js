import React, { useState } from 'react';

export default function Login({ onLogin, onSwitch }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (!email || !password) return alert('Please enter email and password');
    onLogin({ email, name: 'Acme Corp', plan: 'Pro' });
  };

  return (
    <div style={{ maxWidth: '420px', margin: '80px auto', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a365d', marginBottom: '8px' }}>🔐 Login</h2>
        <p style={{ color: '#718096', marginBottom: '24px' }}>Access your API dashboard</p>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '6px' }}>Business Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="api@company.com"
            style={{ width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }} />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: '600', color: '#2d3748', marginBottom: '6px' }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)}
            placeholder="Your password"
            style={{ width: '100%', padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '8px', fontSize: '0.95rem', boxSizing: 'border-box' }} />
        </div>
        <button onClick={submit}
          style={{ width: '100%', padding: '14px', background: '#1a365d', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer' }}>
          Login
        </button>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#718096', fontSize: '0.9rem' }}>
          No account? <span onClick={() => onSwitch('register')} style={{ color: '#4299e1', cursor: 'pointer', fontWeight: '600' }}>Register here</span>
        </p>
      </div>
    </div>
  );
}